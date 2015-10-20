'use strict';
var UserRepository = require('./../data/user-repository');
var multer = require('multer');
var router = require('express').Router();
router.get('/', function (req, res) {
    var repository = new UserRepository();
    repository.getClients(req.user.id).then(function (clients) {
        res.render('clients/index.html', { clients: clients, invitations: [] });
    }, function (err) {
        res.render('clients/index.html');
    });
});
module.exports = router;
