//require mongoose
const mongoose = require('mongoose');

//make connection string
const connectionString = 'mongodb://localhost/3000'
console.log(process.env);

//connect mongoose
mongoose.connect('mongodb://localhost/project3', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
	console.log(err, 'Mongoose failed to connect')
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is disconnected')
});