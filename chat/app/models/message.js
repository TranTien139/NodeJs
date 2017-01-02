/**
 * Created by Tran Tien on 26/12/2016.
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var messageSchema = mongoose.Schema({
        id_send        : String,
        id_recive     : String,
        id_general: String,
        message: {
            id: {type:String},
            name: {type:String},
            message:{type:String},
            time: {type:Date, default:Date.now()}
        },
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Message', messageSchema);