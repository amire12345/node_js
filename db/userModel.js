const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {},

	password: {},
});

module.exports = mongoose.model.Users || mongoose.model('Users', UserSchema);
