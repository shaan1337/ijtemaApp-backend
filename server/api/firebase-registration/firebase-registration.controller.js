/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/firebase-registrations              ->  index
 * POST    /api/firebase-registrations              ->  create
 * GET     /api/firebase-registrations/:id          ->  show
 * PUT     /api/firebase-registrations/:id          ->  upsert
 * PATCH   /api/firebase-registrations/:id          ->  patch
 * DELETE  /api/firebase-registrations/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {FirebaseRegistration} from '../../sqldb';
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

// Gets a list of FirebaseRegistrations
export function index(req, res) {
  return FirebaseRegistration.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single FirebaseRegistration from the DB
export function show(req, res) {
  return FirebaseRegistration.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new FirebaseRegistration in the DB
export function create(req, res) {
  req.body.date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  
  return FirebaseRegistration.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given FirebaseRegistration in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return FirebaseRegistration.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing FirebaseRegistration in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return FirebaseRegistration.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a FirebaseRegistration from the DB
export function destroy(req, res) {
  return FirebaseRegistration.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
