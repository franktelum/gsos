'use strict';
var Process = require('./../infrastructure/activiti/process');
var multer = require('multer');
var router = require('express').Router();
module.exports = module.exports = function (passport) {
    router.get('/login', function (req, res) {
        res.render('account/login.html', { errorCode: req.flash('errorCode') });
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
        Process.start('gsos_user_register', variables).then(function (response) {
            res.render('account/register.html', { showCongrats: true });
        }, function (err) {
            console.log('ERROR:' + err);
            res.render('account/register.html');
        });
    });
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });
    return router;
};
