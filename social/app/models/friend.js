var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var friendSchema = mongoose.Schema({
    friend: {
        userId: String,
        followers: [{userId: String}],
        following: [{userId: String}]
    }
});

module.exports = mongoose.model('Friend', friendSchema);
