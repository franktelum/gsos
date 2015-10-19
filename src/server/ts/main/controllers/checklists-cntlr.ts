/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import UserRepository   = require('./../data/user-repository');
import FormRepository   = require('./../data/form-repository');
import Process          = require('./../infrastructure/activiti/process');

var router = require('express').Router();

router.get('/', function (req, res) {
   var repository = new UserRepository();
   repository.getChecklists(req.user.id).then(
      (checklists) => {
         res.render('checklists/index.html', {
            checklists: checklists
         });
      },
      (err) => {
         res.render('checklists/index.html');
      }
   );
});

router.get('/new', function (req, res) {
   res.render('checklists/new.html');
});

router.post('/new', function (req, res) {
   if (validateNewChecklistForm(req.body)) {
      var variables = [
         {
            name: 'checklistName',
            type: 'string',
            value: req.body.checklistName
         },
         {
            name: 'checklistNotes',
            type: 'string',
            value: req.body.checklistNotes
         },
         {
            name: 'checklistFiles',
            type: 'string',
            value: '[]'
         }
      ];
      Process.start('gsos_checklist_register', variables, req.user.email, req.user.password).then(
         (response) => {
            res.redirect('/admin/checklists/new-congrats');
         },
         (err) => {
            res.render('checklists/new.html');
         }
      );
   }
});

router.get('/new-congrats', function (req, res) {
   res.render('checklists/new-congrats.html');
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

function validateNewChecklistForm(formData) {
   return true;
}

export = router;
