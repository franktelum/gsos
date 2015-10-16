/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>
/// <reference path="../../../../../lib/definitely_typed/passport/passport.d.ts"/>

'use strict'

import passport      = require('passport');
import Repository    = require('./../data/checklist-repository');
import AppException  = require('./../app-exception');
import Process       = require('./../infrastructure/activiti/process');

var multer = require('multer');
var router = require('express').Router();

export = module.exports = function(passport: passport.Passport) {
   router.get('/login', function (req, res) {
      res.render('account/login.html', {errorCode: req.flash('errorCode')});
   });

   router.post('/login', passport.authenticate('login', {
      successRedirect: '/admin/settings/profile',
      failureRedirect: '/login',
      failureFlash: true
   }));

   router.get('/register', function (req, res) {
      res.render('account/register.html');
   });

   router.post('/register', function (req, res) {
      var variables = [
         {
            name: 'userName',
            type: 'string',
            value: req.body.name
         },
         {
            name: 'userEmail',
            type: 'string',
            value: req.body.email
         },
         {
            name: 'userPhone',
            type: 'string',
            value: req.body.phone
         }
      ];
      Process.start('gsos_user_register', variables).then(
         (response) => {
            res.render('account/register.html',  {showCongrats: true});
         },
         (err) => {
            res.render('account/register.html');
         }
      );
   });

   router.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/login');
   });

   return router;
}
