/// <reference path="../../../../../lib/definitely_typed/passport/passport.d.ts"/>

import passport = require('passport');
import UserRepository   = require('./../data/user-repository');

var LocalStrategy = require('passport-local');

exports = module.exports = function(passport: passport.Passport) {
   console.log('Configurando passport');

   passport.serializeUser(function(user, done) {
      done(null, user.id);
   });

   passport.deserializeUser(function(id, done) {
      var repository = new UserRepository();
      repository.get(id)
      .then((response) => {
         done(null, response);
      }, (err) => {
         done(err, null);
      });
   });

   passport.use('login', new LocalStrategy(
      {
         usernameField: 'email',
         passwordField: 'password'
      },
      function(email, password, done) {
         var repository = new UserRepository();
         repository.getByEmail(email, password).then(
            (user) => {
               return done(null, user);
            },
            (err) => {
               return done(null, false, {message: 'Incorrect username or password'});
            }
         );
      }
   ));
}
