var UserRepository = require('./../data/user-repository');
var LocalStrategy = require('passport-local');
exports = module.exports = function (passport) {
    console.log('Configurando passport');
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        var repository = new UserRepository();
        repository.get(id)
            .then(function (response) {
            done(null, response);
        }, function (err) {
            done(err, null);
        });
    });
    passport.use('login', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    }, function (req, email, password, done) {
        var repository = new UserRepository();
        repository.getByEmail(email, password).then(function (user) {
            return done(null, user);
        }, function (err) {
            return done(null, false, req.flash('errorCode', err.getCode()));
        });
    }));
};
