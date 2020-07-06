const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Create local strategy
// we need to excplicitly say where to search for the username
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // verify this email and password, call done if they are correct
  // otherwise call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err)
    }

    if (!user) {
      return done(null, false)
    }

    // compare passwords - if sent passwords is equal to the stored password
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err)
      }

      if (!isMatch) { return done(null, false) }

      return done(null, user)
    })
  })
})

// set upt options for JWT strategy
const jwtOptions = {
  // with this line we're telling strategy where it can find token
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // with this line we're telling what to use to decode token
  secretOrKey: config.secret
}

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID and the payload in our database
  // if it does call done with that user
  // otherwise call done without a user object

  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false)
    }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

// Tell passport to user this strategy
passport.use(jwtLogin)
passport.use(localLogin)
