var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore');

var Applications = require('../models/applications');
var Verify = require('./verify');
var Exec = require('../shellJs/exec')

var applicationRouter = express.Router();
applicationRouter.use(bodyParser.json());

applicationRouter.route('/')
    //    TODO: Filter results of application return by ones the user has access too
//Returns data about all applications
//Filters results based on access to application
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Applications.find({}, function (err, application) {
            if (err) throw err;
            res.json(application);
        });
    })

    //    TODO:  Prevent user from adding duplicate applications
    //Adds a new application
    //Admin only
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Applications.create(req.body, function (err, application) {
            if (err) throw err;
            var id = application._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the application with id: ' + id);
        });
    })

    //Deletes all applications
    //Admin only
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Applications.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

applicationRouter.route('/:applicationId')
//Returns data about specified application
//Only if user has access to application
    .get(Verify.verifyOrdinaryUser, Verify.verifyAuthorized, function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            res.json(application);
        });
    })

    //Updates information about specified application
    //Admin only
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Applications.findByIdAndUpdate(req.params.applicationId, {
            $set: req.body
        }, {
            new: true
        }, function (err, application) {
            if (err) throw err;
            res.json(application);
        });
    })

    //Adds user to specified application
    //Admin only
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            if (req.body.add) {
                application.authorizedUsers.push(req.body.username);
                application.save(function (err, application) {
                    if (err) throw err;
                    res.json(application);
                });
            } else {
                var arr = application.authorizedUsers;
                var updatedAuthorizedUsers = _.filter(arr, function (item) {
                    return item !== req.body.username
                });
                application.authorizedUsers = updatedAuthorizedUsers
                application.save(function (err, application) {
                    if (err) throw err;
                    res.json(application);
                });
            }
        });
    })

    //Deletes specified application
    //Admin only
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Applications.findByIdAndRemove(req.params.applicationId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

applicationRouter.route('/:applicationId/scripts')
//Returns all script information about specified application
//Filters based on access to application
    .get(Verify.verifyOrdinaryUser, Verify.verifyAuthorized, function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            res.json(application.scripts);
        });
    })

    //    TODO:  Prevent user from adding duplicate scripts
    //Adds new script to specified application
    //Admin only
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            application.scripts.push(req.body);
            application.save(function (err, application) {
                if (err) throw err;
                res.json(application);
            });
        });
    })

    //Deletes script from specified application
    //Admin only
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
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
                res.end('Deleted all scripts!');
            });
        });
    });

applicationRouter.route('/:applicationId/scripts/:scriptId')

//Returns all data about specified script
//Filters based on access to application
    .get(Verify.verifyOrdinaryUser, Verify.verifyAuthorized, function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            res.json(application.scripts.id(req.params.scriptId));
        });
    })

    //Updates information about script with corresponding id
    //Admin only
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            if (err) throw err;
            application.scripts.id(req.params.scriptId).remove();
            application.scripts.push(req.body);
            application.save(function (err, application) {
                if (err) throw err;
                res.json(application);
            });
        });
    })

    //Executes script on the server
    //Filtered based on access to application
    .post(Verify.verifyOrdinaryUser, Verify.verifyAuthorized, function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
                Exec.execScript(application.scripts.id(req.params.scriptId).scriptCommand)
                res.send('Script has been activated');
            }
        )
    })

    //Deletes information about script with corresponding Id
    //Admin only
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Applications.findById(req.params.applicationId, function (err, application) {
            application.scripts.id(req.params.scriptId).remove();
            application.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });

module.exports = applicationRouter;