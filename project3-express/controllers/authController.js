const express = require('express');
const router = express.Router();
const User = require('../models/user');
//const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
	console.log(req.body, 'this is session')

	try {

		const user = await User.create(req.body);

		req.session.logged = true;
		req.session.username = req.body.username;

		res.json({
			status: 200,
			data: 'login successful'
		});
	} catch(err){
		console.log(err);
		res.send(err);
	}
});



// router.get('/login', (req, res) => {
// 	res.render('login.ejs', {
// 		message: req.session.message
// 	})
// });

// //const hashedString = bcrypct.hashSync('Your password', bcrypt.genSaltSync(10));
// router.post('/', async (req, res) => {
// 	console.log("you hit register");
// 	const password = req.body.password;
// 	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// 	const userDBEntry = {};
// 	userDBEntry.username = req.body.username;
// 	userDBEntry.password = passwordHash;

// 	try {
// 		console.log("<---hit try in post login route");
// 		const createdUser = await User.create(userDBEntry);
// 		console.log("\nquery finished");
// 		console.log(createdUser);
// 		req.session.logged = true;
// 		req.session.userDBId = createdUser._id;
// 		req.session.username = createdUser.username

// 		res.redirect('/users');
// 	} catch(err){
// 		res.send(err)
// 	}
// });

// router.post('/login', async (req, res, next) => {
// 	try {
// 		const foundUser = await User.findOne({'username': req.body.username});
// 		if(foundUser){
// 			if(bcrypt.compareSync(req.body.password, foundUser.password) === true) {
// 				req.session.message = '';
// 				req.session.logged = true;
// 				req.session.userDBId = foundUser._id;
// 				req.session.username = founderUser.username

// 				console.log(req.session, ' successfully logged in');
// 				res.redirect('/users');
// 			} else {
// 				req.session.message = "Username or password is incorrect";
// 				res.redirect('/auth/login');
// 			}
// 		} else {
// 			req.session.message = "Username or password is incorrect";
// 			res.redirect('/auth/login');
// 		}
// 	} catch(err)
// 		next(err);
// });

// router.get('/logout', (req, res) => {
// 	req.session.destroy((err) => {
// 		if(err) {
// 			res.send(err);
// 		} else {
// 			res.redirect('/auth/login');
// 		}
// 	})
// })

module.exports= router;









