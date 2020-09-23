const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GoogleUser = require('../models/GoogleUser');

if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config();
}


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
        scope: ['profile', 'email']
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            if (await GoogleUser.exists({ googleId: profile.id })) {
                done(null, await GoogleUser.find({ googleId: profile.id }));
            } 
            else {
                console.log(profile);
                // Fill with username
                const newUser = new GoogleUser({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    username: profile.displayName
                });
                const savedUser = await newUser.save();
                return done(null, savedUser);
            }
        } catch(err) {
            console.log(err);
            done(err);
        }
    }
));

passport.serializeUser(function(user, done) {
    console.log(user[0]._id);
    return done(null, user[0]._id);
});

passport.deserializeUser(async(id, done) => {
    console.log('DESERIALIZEEE id: ');
    console.log(id);
    try {
        const user = await GoogleUser.findById(id);
        console.log(user);
        return done(/* null, */ user);
    } catch(err) {
        console.log(err);
        done(err);
    }
    
});


