/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import ComplaintRepository    = require('./../data/complaint-repository');
import UserRepository         = require('./../data/user-repository');

var multer = require('multer');
var router = require('express').Router();

router.get('/', function (req, res) {
   var repository = new UserRepository();
   repository.getSuppliers(req.user.id).then(
      (suppliers) => {
         return repository.getComplaints(req.user.id);
      }
   ).then(
      (complaints) => {
         res.render('complaints/index.html', {
            complaints: complaints
         });
      }
   );
});

router.get('/new', function (req, res) {
   var repository = new UserRepository();
   repository.getSuppliers(req.user.id).then(
      (suppliers) => {
         res.render('complaints/new.html', {suppliers: suppliers});
      },
      (err) => {
         res.render('complaints/new.html');
      }
   );
});

router.post('/new', function (req, res) {
   var repository = new ComplaintRepository();

   req.body.userId = req.user.id;
   repository.create(req.body).then(
      (complaint) => {
         res.redirect('/admin/complaints');
      },
      (err) => {
         res.redirect('/admin/complaints');
      }
   );
});

export = router;
