const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const passport = require('passport');
const validator = require('validator');
const Filter = require('bad-words');

/* const initializePassport = require("../../passport-configs/local.js"); */
require('../../passport-configs/local');
require('../../passport-configs/google-oauth20');


// We pass the passport and the function to find a user by email


// Middleware that checks if the user is logged in
function checkAuthentication(req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		return next();
	} else {
		return res.status(401).send('User needs to be authenticated');
	}
}

// Middleware checks if user's role is ADMIN
async function checkAdmin(req, res, next) {
	try {
        const user = await req.user;
		if (!req.user) return res.status(404).send("User not authenticated");
		if (user.role !== "ADMIN")
			return res.status(404).send("User not allowed");
		return next();
	} catch (err) {
		console.log(err);
		return res.send(err);
	}
};


router.post('/local/login', passport.authenticate('local'), (req, res) => {
	console.log('@--- login :');
	const user = req.user;
	console.log(user);
	req.login(user, (err) => {
		if (err) return next(err);
		console.log(req.session.passport.user);
		return res.send(user);	
	});
});

router.get('/google/login', passport.authenticate('google'), (req, res) => {
	/* const user = req.user;
	console.log(user);
	req.logIn(user, (err) => {
		if (err) return next(err);
		console.log(req.session.passport.user);
		return res.send(user);	
	}); */
});




// Google callback
router.get('/google/login/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:8080/login' }),
	function(req, res) {
		// successful authentication
		const user = req.user;
		req.logIn(user, (err) => {
			if (err) return err;
			console.log(req.session.passport.user);
			return res.redirect(process.env.LOGIN_SUCCESS_REDIRECT);
		})
	}
);	

// Post register
router.post("/register", async (req, res) => {
	if (!req.body.email) return res.status(404).send('no email provided');
	if (!req.body.username) return res.status(404).send('no username provided');
	if (!req.body.password) return res.status(404).send('no password provided');
	if (!validator.isEmail(req.body.email.trim())) return res.status(404).send('invalid email');

	const emailExists = await User.exists({ email: req.body.email });
	if (emailExists) return res.status(409).send('Email already exists');
	const usernameExists = await User.exists({ username: req.body.username });
	if (usernameExists) return res.status(409).send('Username already exists');

	const filter = new Filter();
	const email = filter.clean(req.body.email.trim());
	const username = filter.clean(req.body.username.trim());
	const password = filter.clean(req.body.password.trim());

	try {
		const hashed = await bcrypt.hash(password, 12);
		const savedUser = await new User({
			email,
			password: hashed,
			username
		}).save();
		req.login(savedUser, function(err) {
			if (err) return next(err);
			return res.send(savedUser);
		});
	} catch (err) {
		// Can place redirect below instead
		return console.log(err);
	}
});

// Logout user
router.delete('/logout', (req, res) => {
	req.logOut();
	return res.send('logged out');
});

// Logged user
// Tell if user is currently logged in or not (for front)
router.get('/logged', async (req, res) => {
	console.log('authenticated : '+req.isAuthenticated());
	// Return false instead of an error because it's going to be
	// false often (everytime the user is not logged in)
	// and I don't want an error in console for this
	if (!req.isAuthenticated()) return res.send(false);
	try {
		const user = await req.user;
		console.log('useeeer: ');
		console.log(await req.session.passport.user);
		console.log(user);
		console.log(user.username);
		return res.send(user.username);
	} catch(err) {
		console.log(err);
		return res.send(err);
	}	
});




module.exports = {
	auth: router,
	checkAuthentication,
	checkAdmin
};