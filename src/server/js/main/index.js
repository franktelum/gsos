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
var flash = require('connect-flash');
var passportConfig = require('./infrastructure/passport-config');
var db = require('./data/db-init');
var dateFilter = require('nunjucks-date-filter');
db.init();
var app = express();
var env = nunjucks.configure(__dirname + '/views', {
    autoescape: true,
    express: app
});
env.addFilter('date', dateFilter);
app.use(express.static('client/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressSession({ secret: 'my_key' }));
app.use(flash());
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
app.use(function (req, res, next) {
    res.redirect('/login');
    return;
});
passportConfig(passport);
app.listen(8080);
console.log('Gsos started...');
console.log('ACTIVITI_HOST: ' + process.env.ACTIVITI_PORT_8080_TCP_ADDR);
console.log('ACTIVITI_PORT: ' + process.env.ACTIVITI_PORT_8080_TCP_PORT);
console.log('DB_HOST: ' + process.env.DB_PORT_28015_TCP_ADDR);
console.log('DB_PORT: ' + process.env.DB_PORT_28015_TCP_PORT);
