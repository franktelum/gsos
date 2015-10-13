/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import UserRepository = require('./../data/user-repository');
import FormRepository = require('./../data/form-repository');

var multer = require('multer');
var router = require('express').Router();

router.get('/', function (req, res) {
   var repository = new UserRepository();
   repository.getChecklists(req.user.id).then(
      (checklists) => {
         res.render('checklists/index.html', {checklists: checklists});
      },
      (err) => {
         res.render('checklists/index.html');
      }
   );
});

router.get('/new', function (req, res) {
   res.render('checklists/new.html');
});

router.get('/:checklistId/forms/:formId', function (req, res) {
   var repository = new FormRepository();
   repository.get(req.params.formId).then(
      (form) => {
         res.render('checklists/form.html', {form: form});
      },
      (err) => {
         res.render('checklists/form.html');
      }
   );
});

export = router;
