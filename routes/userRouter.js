var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

//Returns all data about all users
//Admin only
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    User.find({}, function (err, user) {
        if (err) throw err;
        res.json(user);
    });});

//Adds user to server, authenticates session
router.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}),
        req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
});

//Logs user in to server, authenticates session
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            var token = Verify.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});

//Logs user out of session
router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.route('/:userId')
    //Promotes user to admin
    //Admin only
    .post(function (req, res) {
        User.findById(req.params.userId, function (err, user) {
            user.admin = true
            user.save(function (err, user) {
                if (err) throw err;
                res.json(user);
            });
        })
    })

    //Deletes user from system
    //Admin only
    .delete(function (req, res) {
        User.findByIdAndRemove(req.params.userId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = router;