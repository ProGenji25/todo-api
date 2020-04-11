const express = require(`express`);
const router = express.Router();
const passport = require('passport');
const { authenticate } = require(`./util`);

//GET /auth
router.get(`/`, authenticate, (req, res) => {
  res.send(req.user)
})

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
  passport.authenticate('google', { scope: [`https://www.googleapis.com/auth/userinfo.email`] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback', 
  //passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    req.session.save(err => {
      if (err) {
        req.logout();
        res.sendStatus(500);
      }
      else res.redirect(process.env.CLIENT_ORIGIN);
    })
  });

// GET /auth/logout
router.get(`/logout`, async (req,res) => {
  req.session.destroy()
  req.logout()
  res.redirect(process.env.CLIENT_ORIGIN)
  });

module.exports = router;