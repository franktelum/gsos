/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import UserRepository   = require('./../data/user-repository');
import Process          = require('./../infrastructure/activiti/process');

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

router.post('/new', function (req, res) {
   if (validateNewSupplierForm(req.body)) {
      var variables = [
         {
            name: 'invitationUserEmail',
            type: 'string',
            value: req.body.invitationUserEmail
         },
         {
            name: 'invitationNotes',
            type: 'string',
            value: req.body.invitationNotes
         },
         {
            name: 'invitationTermFile',
            type: 'string',
            value: '[]'
         },
         {
            name: 'invitationFiles',
            type: 'string',
            value: '[]'
         }
      ];
      Process.start('gsos_invite_supplier', variables, req.user.email, req.user.password).then(
         (response) => {
            res.redirect('/admin/suppliers/new-congrats');
         },
         (err) => {
            res.render('suppliers/new.html');
         }
      );
   }
});

router.get('/new-congrats', function (req, res) {
   res.render('suppliers/new-congrats.html');
});

function validateNewSupplierForm(formData) {
   return true;
}

export = router;
