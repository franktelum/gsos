var checklistsCntlr = require('./controllers/checklists-cntlr');
var complaintsCntlr = require('./controllers/complaints-cntlr');
var suppliersCntlr = require('./controllers/suppliers-cntlr');
var auditsCntlr = require('./controllers/audits-cntlr');
var clientsCntlr = require('./controllers/clients-cntlr');
var settingsCntlr = require('./controllers/settings-cntlr');
var accountCntlr = require('./controllers/account-cntlr');
var reportsCntlr = require('./controllers/reports-cntlr');
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var exphbs = require('express-handlebars');
var nunjucks = require('nunjucks');
var passportConfig = require('./infrastructure/passport-config');
var db = require('./data/db-init');
db.init();
var app = express();
nunjucks.configure(__dirname + '/views', {
    autoescape: true,
    express: app
});
app.use(express.static('client/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressSession({ secret: 'my_key' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    if (req.path.indexOf('/admin') === 0 && !req.isAuthenticated()) {
        res.redirect('/login');
        return;
    }
    next();
});
app.use('/admin/checklists', checklistsCntlr);
app.use('/admin/complaints', complaintsCntlr);
app.use('/admin/suppliers', suppliersCntlr);
app.use('/admin/audits', auditsCntlr);
app.use('/admin/clients', clientsCntlr);
app.use('/admin/settings', settingsCntlr);
app.use('/admin/reports', reportsCntlr);
app.use('/', accountCntlr(passport));
passportConfig(passport);
app.listen(8080);
console.log('Servidor corriendo...');
console.log('ACTIVITI_TCP_ADDR: ' + process.env.ACTIVITI_PORT_8080_TCP_ADDR);
console.log('ACTIVITI_TCP_PORT: ' + process.env.ACTIVITI_PORT_8080_TCP_PORT);
console.log('GPSI_DB_ADDR: ' + process.env.GPSI_DB_PORT_8080_TCP_ADDR);
console.log('GPSI_DB_PORT: ' + process.env.GPSI_DB_PORT_8080_TCP_PORT);
