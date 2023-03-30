const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const User = require('./db/userModel');
const express = require('express');
const app = express();

const dbConnect = require('./db/dbConnect');
dbConnect();

app.post('/register', (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then(hashedPassword => {
			// create a new user instance and collect the data
			const user = new User({
				email: req.body.email,
				password: hashedPassword,
			});
			// save the new user
			user
				.save()
				// return success if the new user is added to the database successfully
				.then(result => {
					res.status(201).send({
						message: 'User Created Successfully',
						result,
					});
				})
				.catch(error => {
					res.status(500).send({
						message: 'Error creating user',
						error,
					});
				});
		})
		.catch(e => {
			res.status(500).send({
				message: 'Password was not hashed successfully',
				e,
			});
		});
});

// login endpoint
app.post('/login', (request, response) => {
	// check if email exists
	User.findOne({ email: request.body.email })

		// if email exists
		.then(user => {
			// compare the password entered and the hashed password found
			bcrypt
				.compare(request.body.password, user.password)

				// if the passwords match
				.then(passwordCheck => {
					// check if password matches
					if (!passwordCheck) {
						return response.status(400).send({
							message: 'Passwords does not match',
							error,
						});
					}

					//   create JWT token
					const token = jwt.sign(
						{
							userId: user._id,
							userEmail: user.email,
						},
						'RANDOM-TOKEN',
						{ expiresIn: '24h' },
					);

					//   return success response
					response.status(200).send({
						message: 'Login Successful',
						email: user.email,
						token,
					});
				})
				// catch error if password does not match
				.catch(error => {
					response.status(400).send({
						message: 'Passwords does not match',
						error,
					});
				});
		})
		// catch error if email does not exist
		.catch(e => {
			response.status(404).send({
				message: 'Email not found',
				e,
			});
		});
});

// authentication endpoint
app.get('/auth-endpoint', auth, (req, res) => {
	res.json({ message: 'You are authorized to access me' });
});

app.listen(process.env.PORT || 3000);
