/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/news              ->  index
 * POST    /api/news              ->  create
 * GET     /api/news/:id          ->  show
 * PUT     /api/news/:id          ->  upsert
 * PATCH   /api/news/:id          ->  patch
 * DELETE  /api/news/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import moment from 'moment';
import {News, FirebaseRegistration} from '../../sqldb';
import firebaseAdmin from '../../firebase';

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

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
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

// Gets a list of Newss
export function index(req, res) {
  var from = req.params.from;
  var where = {};
  if(from){
    where = {
      _id: {
        $gt: from
      }
    }
  }

  return News.findAll({raw: true, where:where})
    .then(function(items){
      for(var key in items){
        var item = items[key];
        item.dateUTC = item.date;
        item.date = moment(item.date).format('lll');
      }
      return items;
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single News from the DB
export function show(req, res) {
  return News.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new News in the DB
export function create(req, res) {
  req.body.author = 'John Smith';
  req.body.date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  return News.create(req.body)
    .then(respondWithResult(res, 201))
    .then(sendNotifications(req.body))
    .catch(handleError(res));
}

// Upserts the given News in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return News.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing News in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return News.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a News from the DB
export function destroy(req, res) {
  return News.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function sendNotifications(body){
  console.log('Sending news notifications!');

  FirebaseRegistration.aggregate('token', 'DISTINCT', { plain: false })
  .then((tokens)=>{
    var registrationTokens = [];
    for(var key in tokens){
      var token = tokens[key]['DISTINCT'];
      if(token && token.length>0)
        registrationTokens.push(token);
    }
    
    var payload = {      
      notification: {
        title: body.subject,
        body: body.author+(body.message.length>0?(':\n'+body.message):'')
      }
    };

    firebaseAdmin.messaging().sendToDevice(registrationTokens, payload)
      .then(function(response) {
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });
        
  });
}