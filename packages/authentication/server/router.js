const authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

// creating passport middleware
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function (app) {
  app.post('/signup', authentication.signup)
  // here we're telling for this route to use requireAuth middleware
  app.get('/', requireAuth, function (req, res, next) {
    res.send({ hi: 'there' })
  })
  // here we're telling for this route to use requireSignin middleware
  app.post('/signin', requireSignin, authentication.signin)
}
