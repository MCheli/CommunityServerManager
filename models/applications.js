// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scriptSchema = new Schema({
    scriptName: {
        type: String,
        required: true,
        unique: true
    },
    scriptDescription: {
        type: String,
        required: true
    },
    scriptCommand: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create a schema
var applicationSchema = new Schema({
    applicationName: {
        type: String,
        required: true,
        unique: true
    },
    applicationDescription: {
        type: String,
        required: true
    },
    authorizedUsers: {
        type: [String]
    },
    scripts: [scriptSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Applications = mongoose.model('Applications', applicationSchema);

// make this available to our Node applications
module.exports = Applications;