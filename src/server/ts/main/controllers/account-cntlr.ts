/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>
/// <reference path="../../../../../lib/definitely_typed/passport/passport.d.ts"/>

'use strict'

import passport = require('passport');
import Repository = require('./../data/checklist-repository');

var multer = require('multer');
var router = require('express').Router();

export = module.exports = function(passport: passport.Passport) {
   router.get('/login', function (req, res) {
      res.render('account/login.html');
   });

   router.post('/login', passport.authenticate('login', {
      successRedirect: '/admin/settings/profile',
      failureRedirect: '/login',
      failureFlash: false
   }));

   router.get('/register', function (req, res) {
      res.render('account/register.html');
   });

   router.post('/register', function (req, res) {
      res.render('account/register.html');
   });

   router.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/login');
   });

   return router;
}
