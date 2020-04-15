const router = require(`express`).Router();
const passport = require('passport');
const { authenticate } = require(`../util`);



//Login
router.get('/google',
  passport.authenticate('google', { scope: [`https://www.googleapis.com/auth/userinfo.email`] }));

//Login Callback
router.get('/google/callback', 
  passport.authenticate('google'),
  async (req, res) => {
    req.session.save(err => {
      if (err) {
        req.logout();
        res.sendStatus(500);
      }
      else res.redirect(process.env.CLIENT_ORIGIN);
    })
  });

//Check user
router.get(`/`, authenticate, (req, res) => {
  res.json(req.user)
  });

// Logout
router.get(`/logout`, async (req,res) => {
  req.session.destroy()
  req.logout()
  res.redirect(process.env.CLIENT_ORIGIN)
  });

module.exports = router;