//require express, router and models
const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const List = require('../models/list.js');
// explainError = require('explain-error')



//INDEX ROUTE
router.get('/', async (req, res, next) => {
	console.log(req.body, '<---hit list index route');
	 try {

	 	const allLists = await List.find();

	 	res.json({
	 		status: 200,
	 		data: allLists
	 	});
	 } catch (err) {

	 	res.send(err)
	 }
})

//CREATE ROUTE
router.post('/', async (req, res) => {

	try {
		console.log(req.body, ' this is req.body');
		const createdList = await List.create(req.body);
		console.log('Is there a response?')
		res.json({
			status: 200,
			data: createdList
		});
	} catch(err) {
		console.log(err);
		res.send(err);
	}
});

//NEW ROUTE
router.get('/new', (req, res, next) => {
	User.find({}, (err, allUsers) => {
		if(err) {
			next(err);
		} else {
			res.render('posts/new.ejs')
			users: allUsers
		}
	}
})



//SHOW ROUTE
router.get('/:id', async (req, res, next) => {

	try {

		const foundList = await List.findById(req.params.id);
		res.json({
			status: 200,
			data: foundList
		});
	} catch (err) {
		res.send(err);
	}
});

//UPDATE ROUTE
router.put('/:id', async (req, res) => {

	try {
		const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json({
			status: 200,
			data: updatedList
		});
	} catch(err){
		res.send(err)
	}
});

//DESTROY ROUTE
router.delete('/:id', async (req,res) => {

	try {
		const deletedList = await List.findByIdAndRemove(req.params.id);
		res.json({
			status: 200,
			data: deletedList
		});
	} catch(err){
		res.send(err);
	}
});

//EDIT ROUTE
router.get('/:id/edit', async (req, res, next) => {
	if(req.session.userDbId ==null) {
		res.redirect('/auth/login')
	} else {

	User.find({}, (err, allUsers) => {
		User
			.findById(req.session.userDbId)
			.populate({
				path: 'lists',
				match: {
					_id: req.params.id //get list that matches the list ID user is editing
				}

			})
			.exec((err, foundListUser) => {
				console.log("<----\n here is foundListUser in show route");
				console.log(foundListUser);

				if(err) {
					//res.redirect('/auth/login')
					next(err)
				} else {
					res.render('lists/edit.ejs', {
						list: foundListUser.lists[0],
						users: allUsers
						listUser: foundListUser
					})
				}		
			})
	})	
	}
})




//export module
module.exports = router;