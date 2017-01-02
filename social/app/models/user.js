var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    user             : {
	username     :String,
    email        : String,
    password     : String,
	address      : String,
	avatar :String
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

userSchema.methods.updateUser = function(request, response){
	this.user.avatar = request.body.txtimage_profile;
	 this.user.save();
	response.redirect('/home');
};

module.exports = mongoose.model('User', userSchema);
