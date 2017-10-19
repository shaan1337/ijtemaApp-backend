'use strict';

import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./registration.controller');

var router = express.Router();

router.get('/sport', auth.isAuthenticated(), controller.sport);
router.get('/literary', auth.isAuthenticated(), controller.literary);
router.post('/:token', controller.create);
router.delete('/:id/:token', controller.destroy);

module.exports = router;
