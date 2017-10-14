'use strict';

var express = require('express');
var controller = require('./registration.controller');

var router = express.Router();

router.get('/sport', controller.sport);
router.get('/literary', controller.literary);
router.post('/:token', controller.create);
router.delete('/:id/:token', controller.destroy);

module.exports = router;
