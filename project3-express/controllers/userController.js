// require express, router and models
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const List = require('../models/list.js')
const explainError = require('explain-error')

//new route
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

//create route
router.post('/', (req, res) => {
	console.log(req.body);
	User.create(req.body, (err, createdUser) => {
		if(err){
			res.send(err);
		} else {
			console.log('Where is the user?');
			res.redirect('/users');
		}
	})
});

//show route
router.get('/:id', (req,res) => {
	User
		.findById(req.params.id)
		.populate('lists')
		.exec((err, foundUser) => {
			if(err) {
				console.log(err);
			} else {
				console.log(foundUser);
				res.render('users/show.ejs', {user: foundUser})
			}
		})
})

//delete route
router.delete('/:id', (req, res) => {
	if(req.session.userDbId == null) {
		res.redirect('/auth/login')
	} else {
		User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
			if(err){
				res.send(err);
			} else {
				console.log(deletedUser, "<--was deleted");
				Post.deleteMany({
					_id: {
						$in: deletedUser.lists
					}
				}, (err, data) => {
					console.log(data)
					res.redirect('/users');
				})
			}
		})
	}
})

//edit route
router.get('/:id/edit', (req, res) => {
	if(req.session.userDbId == null) {
		res.redirect('/auth/login')
	} else {
		User.findById(req.params.id, (err, foundUser) => {
			res.render('suers/edit.ejs', {user: foundUser})
		})
	}
})

//update route
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		if(err){
			res.send(err);
		} else {
			res.redirect('/users');
		}
	})
})

//export module
module.exports = router


