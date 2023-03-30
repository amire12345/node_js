const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
	mongoose;

	mongoose
		.connect(
			'mongodb+srv://Openclassroom:11MI321&&vie@openclassroomcluster0.nh0lyye.mongodb.net/?retryWrites=true&w=majority',
		)
		.then(() => {
			console.log('Successfully connected to MongoDB Atlas!');
		})
		.catch(error => {
			console.log('Unable to connect to MongoDB Atlas!');
			console.log(error);
		});
}

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	);
	next();
});

module.exports = dbConnect;
