'use strict';
var UserRepository = require('./../data/user-repository');
var multer = require('multer');
var router = require('express').Router();
router.get('/', function (req, res) {
    var repository = new UserRepository();
    repository.getSuppliers(req.user.id).then(function (suppliers) {
        res.render('suppliers/index.html', { suppliers: suppliers });
    }, function (err) {
        res.render('suppliers/index.html');
    });
});
router.get('/new', function (req, res) {
    res.render('suppliers/new.html');
});
module.exports = router;
