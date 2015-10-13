'use strict';
var multer = require('multer');
var router = require('express').Router();
router.get('/', function (req, res) {
    res.render('reports/index.html');
});
module.exports = router;
