/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/personaldetails              ->  index
 * POST    /api/personaldetails              ->  create
 * GET     /api/personaldetails/:id          ->  show
 * PUT     /api/personaldetails/:id          ->  upsert
 * PATCH   /api/personaldetails/:id          ->  patch
 * DELETE  /api/personaldetails/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import moment from 'moment';
import {Personaldetails} from '../../sqldb';

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

// Creates a new Personaldetails in the DB
export function create(req, res) {  
  req.body.token = generateRandomToken();
  req.body.date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  
  return Personaldetails.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Personaldetails in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  var token = '';
  if(req.params.token)
    token = req.params.token;

  return Personaldetails.find({
    where: {
      _id: req.params.id,
      token: token
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function generateRandomToken(){
  var charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var token = '';
  for(var i=0;i<32;i++){
    var pos = parseInt(Math.floor(Math.random() * (charset.length - 1)));
    token += charset[pos];
  }

  return token;
}