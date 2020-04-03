const express = require(`express`);
const cookieParser = require(`cookie-parser`);
const logger = require(`morgan`);
const { authenticate } = require(`./util`);
var session = require('express-session');
var hour = 3600000;

// Here, you should require() your mssqldb, mongoose, and passport setup files that you create
const mssqldb = require(`./mssqldb`);
const mongoose = require(`./mongoose`);
const passport = require(`./passport`);
// Here, you should require() your routers so you can use() them below
const userRouter = require(`./routes/user`);
const itemRouter = require(`./routes/items`);
const authRouter = require(`./routes/auth`);

const app = express();

// These lines are provided for you.
app.use(logger(`dev`)); // This line is for having pretty logs for each request that your API receives.
app.use(express.json()); // This line says that if a request has a body, that your api should assume it's going to be json, and to store it in req.body
app.use(express.urlencoded({ extended: false })); // this line says that if there's any URL data, that it should not use extended mode.
app.use(cookieParser()); // This line says that if there are any cookies, that your app should store them in req.cookies

// Here is where you should use the `express-session` middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: hour }
}));

// Here is where you should assign your routers to specific routes. Make sure to authenticate() the routes that need authentication.
app.use(`/api/v1/user`, authenticate, userRouter);
app.use(`/api/v1/items`, authenticate, itemRouter);
// Finally, you should add a .get() route to your app for `/signin-google` that uses passport to authenitcate using the google strategy
app.use(`/api/v1/auth`, authRouter);

module.exports = app;
