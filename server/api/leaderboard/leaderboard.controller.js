/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/leaderboard              ->  index
 * POST    /api/leaderboard              ->  create
 * GET     /api/leaderboard/:id          ->  show
 * PUT     /api/leaderboard/:id          ->  upsert
 * PATCH   /api/leaderboard/:id          ->  patch
 * DELETE  /api/leaderboard/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Leaderboard} from '../../sqldb';

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

// Gets a list of Leaderboards
export function index(req, res) {
  return Leaderboard.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Leaderboard from the DB
export function show(req, res) {
  return Leaderboard.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Leaderboard in the DB
export function create(req, res) {
  //initialize with 0 points
  req.body.score = 0;

  return Leaderboard.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Leaderboard in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Leaderboard.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Leaderboard in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

 
  return Leaderboard.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Leaderboard from the DB
export function destroy(req, res) {
  return Leaderboard.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
