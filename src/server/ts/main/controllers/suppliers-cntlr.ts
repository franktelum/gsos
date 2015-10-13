/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import UserRepository = require('./../data/user-repository');

var multer = require('multer');
var router = require('express').Router();

router.get('/', function (req, res) {
   var repository = new UserRepository();
   repository.getSuppliers(req.user.id).then(
      (suppliers) => {
         res.render('suppliers/index.html', {suppliers: suppliers});
      },
      (err) => {
         res.render('suppliers/index.html');
      }
   );
});

router.get('/new', function (req, res) {
   res.render('suppliers/new.html');
});

export = router;
