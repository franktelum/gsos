'use strict';
var UserRepository = require('./../data/user-repository');
var AuditRepository = require('./../data/audit-repository');
var multer = require('multer');
var router = require('express').Router();
router.get('/', function (req, res) {
    var repository = new UserRepository();
    repository.getAudits(req.user.id).then(function (audits) {
        res.render('audits/index.html', { audits: audits });
    }, function (err) {
        res.render('audits/index.html');
    });
});
router.get('/new', function (req, res) {
    var checklists = [];
    var repository = new UserRepository();
    repository.getChecklists(req.user.id).then(function (objects) {
        checklists = objects;
        return repository.getSuppliers(req.user.id);
    }).then(function (suppliers) {
        res.render('audits/new.html', { checklists: checklists, suppliers: suppliers });
    }, function (err) {
        res.render('audits/new.html');
    });
});
router.get('/:id', function (req, res) {
    var repository = new AuditRepository();
    repository.get(req.params.id).then(function (audit) {
        res.render('audits/details.html', { audit: audit });
    }, function (err) {
        res.render('audits/details.html');
    });
});
module.exports = router;
