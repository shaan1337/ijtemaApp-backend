/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/programme              ->  show
 */

'use strict';

var programme =  [];

export function show(req, res) {
  res.status(200).json(programme);
}

export function getProgramme(){
  return programme;
}