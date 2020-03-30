/*

This file is for initializing passport

*/

const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { getUserFromAzure } = require(`./util`);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
 },
 async (req, accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const user = await getUserFromAzure(email);
        if(!user) {
            return done(null, false);
        }
        console.log('Request: ', req.query);
        return done(null, user);
    } catch (error) {
        console.error(error);
        return done(error.message);
    }
 }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });

passport.deserializeUser(async (user, done) => {
    try {
      done(null, user);
    } catch (error) {
        console.error(error);
        done(error.message)
    }
  });

module.exports = passport;