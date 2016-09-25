var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Applications = require('../models/applications');
var Verify = require('./verify');

var applicationRouter = express.Router();
applicationRouter.use(bodyParser.json());

applicationRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Applications.find({}, function (err, application) {
            if (err) throw err;
            res.json(application);
        });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Applications.create(req.body, function (err, application) {
            if (err) throw err;
            console.log('Application created!');
            var id = application._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the application with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Applications.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

applicationRouter.route('/:applicationId')
    .get(function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            res.json(application);
        });
    })

    .put(function (req, res, next) {
        Applications.findByIdAndUpdate(req.params.applicationId, {
            $set: req.body
        }, {
            new: true
        }, function (err, application) {
            if (err) throw err;
            res.json(application);
        });
    })

    .delete(function (req, res, next) {
        Applications.findByIdAndRemove(req.params.application, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

applicationRouter.route('/:applicationId/scripts')
    .get(function (req, res, next) {
        Applications.findById(req.params.applicaitonId, function (err, application) {
            if (err) throw err;
            res.json(application.scripts);
        });
    })

    .post(function (req, res, next) {
        Applications.findById(req.params.application, function (err, application) {
            if (err) throw err;
            application.scripts.push(req.body);
            application.save(function (err, application) {
                if (err) throw err;
                console.log('Updated Scripts!');
                res.json(application);
            });
        });
    })

    .delete(function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            for (var i = (application.scripts.length - 1); i >= 0; i--) {
                application.scripts.id(application.scripts[i]._id).remove();
            }
            application.save(function (err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all applications!');
            });
        });
    });

applicationRouter.route('/:applicationId/scripts/:scriptId')
    .get(function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            res.json(application.scripts.id(req.params.scriptId));
        });
    })

    .put(function (req, res, next) {
        // We delete the existing commment and insert the updated
        // comment as a new comment
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            application.scripts.id(req.params.scriptId).remove();
            application.scripts.push(req.body);
            application.save(function (err, application) {
                if (err) throw err;
                console.log('Updated Scripts!');
                res.json(application);
            });
        });
    })

    .delete(function (req, res, next) {
        Applications.findById(req.params.applicaitonId, function (err, application) {
            application.scripts.id(req.params.scriptId).remove();
            application.save(function (err, resp) {
                if (err) throw err;
                console.log('Deleted Script')
                res.json(resp);
            });
        });
    });

module.exports = applicationRouter;