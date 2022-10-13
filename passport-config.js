const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mysql = require('mysql');
var con = require('./db_connect.js');

function initialize(passport) {
    const authenticateUser = function (email, password, done) {
        var sql = mysql.format('SELECT id, first_name, last_name, email, password, type FROM users WHERE email = ?',
            [email]);
        con.query(sql, function (err, row) {
            if (err) {
                console.log(err);
                return done(null, false, { message: 'Internal error' });
            }
            if (row.length > 0) {
                var user = row[0];

                bcrypt.compare(password, user.password, function (err, compare_result) {
                    if (err) { return done(null, false, { message: 'Internal error' }); }
                    if (compare_result) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Password incorrect' })
                    }
                });
            } else {
                done(null, false, { message: 'No user with this email' })
            }
        });
    }

    passport.use(new LocalStrategy({ usernameField: 'signinEmail', passwordField: 'signinPassword' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        var sql = mysql.format('SELECT id, first_name, last_name, email, password, type FROM users WHERE id = ?',
            [id]);
        con.query(sql, function (err, row) {
            if (err) { return done(null, null); }
            if (row.length > 0) {
                return done(null, row[0]);
            }
            return done(null, null);
        });
    })
}

module.exports = initialize