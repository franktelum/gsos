'use strict';
var UserRepository = require('./../data/user-repository');
var Process = require('./../infrastructure/activiti/process');
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
router.post('/new', function (req, res) {
    if (validateNewSupplierForm(req.body)) {
        var variables = [
            {
                name: 'invitationUserEmail',
                type: 'string',
                value: req.body.invitationUserEmail
            },
            {
                name: 'invitationNotes',
                type: 'string',
                value: req.body.invitationNotes
            },
            {
                name: 'invitationTermFile',
                type: 'string',
                value: '[]'
            },
            {
                name: 'invitationFiles',
                type: 'string',
                value: '[]'
            }
        ];
        Process.start('gsos_invite_supplier', variables, req.user.email, req.user.password).then(function (response) {
            res.redirect('/admin/suppliers/new-congrats');
        }, function (err) {
            res.render('suppliers/new.html');
        });
    }
});
router.get('/new-congrats', function (req, res) {
    res.render('suppliers/new-congrats.html');
});
function validateNewSupplierForm(formData) {
    return true;
}
module.exports = router;
