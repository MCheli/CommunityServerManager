// var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');
var _ = require('underscore');
// var mongoose = require('mongoose');

var Applications = require('../models/applications');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next) {
    if (req.decoded._doc.admin) {
        console.log("Admin!")
        next();
    } else {
        var err = new Error('You are not an Admin!');
        err.status = 401;
        return next(err);
    }
}

exports.verifyAuthorized = function (req, res, next) {
    Applications.findById(req.params.applicationId, function (err, application) {
        var arr = application.authorizedUsers
        if(_.contains(arr, req.decoded._doc.username)){
            next();
        } else {
            var err = new Error('You are not authorized!');
            err.status = 401;
            return next(err);
        }
    })
}