//require mongoose
const mongoose = require('mongoose')

//define userSchema
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	lists: [{type: mongoose.Schema.Types.ObjectId, ref: "List"}]
})

//export lists array
module.exports = mongoose.model('User', UserSchema);
