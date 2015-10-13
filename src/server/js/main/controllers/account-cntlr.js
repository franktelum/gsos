'use strict';
var multer = require('multer');
var router = require('express').Router();
module.exports = module.exports = function (passport) {
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
};
