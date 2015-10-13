'use strict';
var UserRepository = require('./../data/user-repository');
var FormRepository = require('./../data/form-repository');
var multer = require('multer');
var router = require('express').Router();
router.get('/', function (req, res) {
    var repository = new UserRepository();
    repository.getChecklists(req.user.id).then(function (checklists) {
        res.render('checklists/index.html', { checklists: checklists });
    }, function (err) {
        res.render('checklists/index.html');
    });
});
router.get('/new', function (req, res) {
    res.render('checklists/new.html');
});
router.get('/:checklistId/forms/:formId', function (req, res) {
    var repository = new FormRepository();
    repository.get(req.params.formId).then(function (form) {
        res.render('checklists/form.html', { form: form });
    }, function (err) {
        res.render('checklists/form.html');
    });
});
module.exports = router;
