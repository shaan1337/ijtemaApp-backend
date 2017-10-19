'use strict';

import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./news.controller');

var router = express.Router();

router.get('/:from', controller.index);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
