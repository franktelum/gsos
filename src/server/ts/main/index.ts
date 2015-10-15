/// <reference path="../../../../lib/definitely_typed/node/node.d.ts"/>
/// <reference path="../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

import checklistsCntlr  = require('./controllers/checklists-cntlr');
import complaintsCntlr  = require('./controllers/complaints-cntlr');
import suppliersCntlr   = require('./controllers/suppliers-cntlr');
import auditsCntlr      = require('./controllers/audits-cntlr');
import clientsCntlr     = require('./controllers/clients-cntlr');
import settingsCntlr    = require('./controllers/settings-cntlr');
import accountCntlr     = require('./controllers/account-cntlr');
import reportsCntlr     = require('./controllers/reports-cntlr');

var express          = require('express');
var expressSession   = require('express-session');
var bodyParser       = require('body-parser');
var cookieParser     = require('cookie-parser');
var passport         = require('passport');
var passportLocal    = require('passport-local');
var exphbs           = require('express-handlebars');
var nunjucks         = require('nunjucks');
var passportConfig   = require('./infrastructure/passport-config');
var db               = require('./data/db-init');

// inicializa la base de datos
db.init();

// configura express
var app = express();

nunjucks.configure(__dirname + '/views', {
   autoescape: true,
   express: app
});

// app.engine('hbs', exphbs({defaultLayout: '/src/server/js/main/views/layouts/main', extname: '.hbs'}));
// app.set('view engine', 'hbs');
// app.set('views', __dirname + '/views');

// middlewares
app.use(express.static('client/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressSession({secret: 'my_key'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
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

// configurar passport
passportConfig(passport);

app.listen(8080);

console.log('Gsos started...')
console.log('ACTIVITI_HOST: ' + process.env.ACTIVITI_PORT_8080_TCP_ADDR);
console.log('ACTIVITI_PORT: ' + process.env.ACTIVITI_PORT_8080_TCP_PORT);
console.log('DB_HOST: ' + process.env.DB_PORT_28015_TCP_ADDR);
console.log('DB_PORT: ' + process.env.DB_PORT_28015_TCP_PORT);
