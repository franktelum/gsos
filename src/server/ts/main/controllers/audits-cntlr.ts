/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import UserRepository = require('./../data/user-repository');
import AuditRepository = require('./../data/audit-repository');

var multer = require('multer');
var router = require('express').Router();

router.get('/', function (req, res) {
   var repository = new UserRepository();
   repository.getAudits(req.user.id).then(
      (audits) => {
         res.render('audits/index.html', {audits: audits});
      },
      (err) => {
         res.render('audits/index.html');
      }
   );
});

router.get('/new', function (req, res) {
   var checklists = [];
   var repository = new UserRepository();
   repository.getChecklists(req.user.id).then(
      (objects) => {
         checklists = objects;
         return repository.getSuppliers(req.user.id);
      }
   ).then(
      (suppliers) => {
         res.render('audits/new.html', {checklists: checklists, suppliers: suppliers});
      }, (err) => {
         res.render('audits/new.html');
      }
   );
});

router.get('/:id', function (req, res) {
   var repository = new AuditRepository();
   repository.get(req.params.id).then(
      (audit) => {
         res.render('audits/details.html', {audit: audit});
      },
      (err) => {
         res.render('audits/details.html');
      }
   );
});

export = router;
