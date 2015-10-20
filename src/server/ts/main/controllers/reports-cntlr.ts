/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import UserRepository = require('./../data/user-repository');

var multer = require('multer');
var router = require('express').Router();

router.get('/', function (req, res) {
   res.render('reports/index.html');
});

export = router;
