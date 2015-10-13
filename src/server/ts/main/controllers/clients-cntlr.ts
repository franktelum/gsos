/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import UserRepository = require('./../data/user-repository');

var multer = require('multer');
var router = require('express').Router();

router.get('/', function (req, res) {
   var repository = new UserRepository();
   repository.getClients(req.user.id).then(
      (clients) => {
         res.render('clients/index.html', {clients: clients, invitations: []});
      },
      (err) => {
         res.render('clients/index.html');
      }
   );
});

export = router;
