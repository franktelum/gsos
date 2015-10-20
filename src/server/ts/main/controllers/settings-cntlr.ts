/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import UserRepository = require('./../data/user-repository');

var multer = require('multer');
var router = require('express').Router();

router.get('/profile', function (req, res) {
   var userRepository = new UserRepository();
   userRepository.get(req.user.id).then(
      (user) => {
         res.render('settings/profile.html', {user: user});
      },
      (err) => {
         res.render('settings/profile.html');
      }
   );
});

router.post('/profile', function (req, res) {
   var userRepository = new UserRepository();

   // validar datos
   req.user.profile = req.body;

   userRepository.update(req.user).then(
      (user) => {
         res.render('settings/profile.html', {user: user});
      },
      (err) => {
         res.render('settings/profile.html', {user: req.user, errors:{}});
      }
   );
});

export = router;
