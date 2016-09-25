// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = require('./models/user');

var scriptSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create a schema
var applicationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    authorizedUsers: [userSchema],
    scripts: [scriptSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Applications = mongoose.model('Applications', applicationSchema);

// make this available to our Node applications
module.exports = Applications;