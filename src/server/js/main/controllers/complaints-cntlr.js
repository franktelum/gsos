'use strict';
var ComplaintRepository = require('./../data/complaint-repository');
var UserRepository = require('./../data/user-repository');
var multer = require('multer');
var router = require('express').Router();
router.get('/', function (req, res) {
    var repository = new UserRepository();
    repository.getSuppliers(req.user.id).then(function (suppliers) {
        return repository.getComplaints(req.user.id);
    }).then(function (complaints) {
        res.render('complaints/index.html', {
            complaints: complaints
        });
    });
});
router.get('/new', function (req, res) {
    var repository = new UserRepository();
    repository.getSuppliers(req.user.id).then(function (suppliers) {
        res.render('complaints/new.html', { suppliers: suppliers });
    }, function (err) {
        res.render('complaints/new.html');
    });
});
router.post('/new', function (req, res) {
    var repository = new ComplaintRepository();
    req.body.userId = req.user.id;
    repository.create(req.body).then(function (complaint) {
        res.redirect('/admin/complaints');
    }, function (err) {
        res.redirect('/admin/complaints');
    });
});
module.exports = router;
