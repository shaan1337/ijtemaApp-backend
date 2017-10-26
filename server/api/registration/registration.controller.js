/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/registrations              ->  index
 * POST    /api/registrations              ->  create
 * GET     /api/registrations/:id          ->  show
 * PUT     /api/registrations/:id          ->  upsert
 * PATCH   /api/registrations/:id          ->  patch
 * DELETE  /api/registrations/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Registration, Personaldetails, Competition} from '../../sqldb';
import json2csv from 'json2csv';
import moment from 'moment';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Creates a new Registration in the DB
export function create(req, res) {
  var token = '';
  if(req.params.token)
    token = req.params.token;

  req.body.deleted = false;
  req.body.date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  
  return Personaldetails.find({
    raw: true,
    where: {
      token: token
    }
  })
  .then(function(personaldetails){
    req.body.PersonaldetailId = personaldetails._id;
    return;
  })
  .then(function(){
    return Competition.find({
      raw: true,
      where: {
        tag: req.body.tag
      }
    })
  })
  .then(function(competition){
    req.body.CompetitionId = competition._id;
    return req.body;
  })  
  .then(function(body){
    return Registration.create(body);
  })  
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}


// Deletes a Registration from the DB
export function destroy(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  var token = '';
  if(req.params.token)
    token = req.params.token;

  var patches = [
    { "op": "replace", "path":"/deleted", value: true}
  ];
  
  return Personaldetails.find({
    raw: true,
    where: {
      token: token
    }
  }).then(function(personaldetails){
    req.body.PersonaldetailId = personaldetails._id;
    return Registration.find({
      where: {
        _id: req.params.id,
        PersonaldetailId : personaldetails._id
      }
    });
  })
  .then(handleEntityNotFound(res))
  .then(patchUpdates(patches))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

//Download sport registrations
export function sport(req, res) {
  return downloadRegistrations(req,res,'sport','all','all','registrations_sport.csv');
}

//Download literary registrations
export function literary(req, res) {
  return downloadRegistrations(req,res,'literary','all','all','registrations_literary.csv');
}

export function permajlis(req, res) {
  var majlis = 'none';
  if(req.params.majlis)
    majlis = req.params.majlis;
  
  if(majlis=='all') majlis='none';

  var halqa = 'all';
  if(req.params.halqa)
    halqa = req.params.halqa;

  var type = 'all';
  return downloadRegistrations(req,res,type,majlis,halqa,'registrations.csv');
}


var downloadRegistrations = function(req,res,type,majlis,halqa,filename){
  var queryCompetition = {model: Competition};  
  if(type!='all'){
    if(!queryCompetition.where) queryCompetition.where = {};    
    queryCompetition.where.type = type;
  }

  var queryPersonalDetails = {model: Personaldetails};
  if(majlis!='all'){
    if(!queryPersonalDetails.where) queryPersonalDetails.where = {};
    queryPersonalDetails.where.majlis = majlis;
  }
  if(halqa!='all'){
    if(!queryPersonalDetails.where) queryPersonalDetails.where = {};
    queryPersonalDetails.where.halqa = halqa;
  }

  return Registration.findAll({
    raw: true,
    where: {
      deleted: false
    },
    include: [
      queryCompetition,
      queryPersonalDetails
    ]
  })
  .then(function(registrations){
    var data = [];
    for(var item in registrations){
      var reg = registrations[item];
      data.push({
        id: reg._id,
        date: moment(reg.date).format("YYYY-MM-DD HH:mm:ss"),
        name: reg['Personaldetail.name'],
        mobile: reg['Personaldetail.mobile'],
        majlis: reg['Personaldetail.majlis'],
        halqa: reg['Personaldetail.halqa'],
        competition: reg.tag,
        comment: reg.comment,
        type: reg['Competition.type']
      });
    };
    var result = json2csv({ data: data, fields: ['id','date','name','mobile','majlis','halqa','competition','comment','type'] });
    
    res.setHeader('Content-disposition', 'attachment; filename='+filename);
    res.setHeader('Content-type', 'text/csv');

    return res.status(200).send(result);
  })
  .catch(handleError(res));  
}