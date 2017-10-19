'use strict';

import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./leaderboard.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
