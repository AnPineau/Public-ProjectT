const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

function initialize(passport, getUserByEmail, getUserById) {

    const authenticateUser = async (email, password, done) => {
        try {       
            const user = await getUserByEmail(email);
            if(!user) {
                return done(null, false, {message: 'No user with that email'});
            }
            if (!await bcrypt.compare(password, user.password)) {
                return done(null, false, {message: 'Password incorrect'});   
            }
            return done(null, user);
            
        } catch(err) {
            console.log(err);
            return done(err);
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authenticateUser));

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}


initialize(
	passport,
	async (email) => {
		const user = await User.findOne({ email: email });
		return user;
	},
	async (id) => {
		const user = await User.findById(id);
		return user;
	}
);