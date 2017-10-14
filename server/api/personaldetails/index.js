'use strict';

var express = require('express');
var controller = require('./personaldetails.controller');

var router = express.Router();

router.post('/', controller.create);
router.patch('/:id/:token', controller.patch);

module.exports = router;
