/*

This file is for initializing passport

*/

const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { getUserFromAzure } = require(`./util`);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_ORIGIN}${process.env.GOOGLE_CALLBACK_PATH}`
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

// Session Init
const initStore = session => {
  const MongoDbStore = require(`connect-mongodb-session`)(session);
  const store = new MongoDbStore({
    uri: process.env.ATLAS_CONNECTION_STRING,
    collection: `Sessions`,
  }, err => {
    if (err) console.error(err);
    else console.log(`Session Store Initialized`);
  })
  store.on(`error`, console.error);
  return store;
}

module.exports = initStore;