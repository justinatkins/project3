//require mongoose
const mongoose = require('mongoose')

//define listSchema
const listSchema = new mongoose.Schema({
	artist: String,
	album: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});



//export module
module.exports = mongoose.model('List', listSchema);