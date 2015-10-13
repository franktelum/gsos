'use strict';
var UserRepository = require('./../data/user-repository');
var multer = require('multer');
var router = require('express').Router();
router.get('/profile', function (req, res) {
    var userRepository = new UserRepository();
    userRepository.get(req.user.id).then(function (user) {
        res.render('settings/profile.html', { user: user });
    }, function (err) {
        res.render('settings/profile.html');
    });
});
router.post('/profile', function (req, res) {
    var userRepository = new UserRepository();
    req.user.profile = req.body;
    userRepository.update(req.user).then(function (user) {
        res.render('settings/profile.html', { user: user });
    }, function (err) {
        res.render('settings/profile.html', { user: req.user, errors: {} });
    });
});
module.exports = router;
