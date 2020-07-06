const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

// create token for user with user ID encoded with secret
function tokenForUser (user) {
  const timestamp = new Date().getTime()

  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret)
}

exports.signin = function (req, res, next) {
  // at this point user has already had their email and password authenticated
  // we just need to give them a token
  // we have access to the user because passport returned back the user
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' })
  }

  // see if a user with a given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err)
    }

    // If a user with an email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    }

    // If a user does not exist, create and save a user record
    const user = new User({
      email: email,
      password: password
    })

    user.save(function (err) {
      if (err) {
        return next(err)
      }

      // Respond to the request indicating the user was created
      // here we're sending back an identifying piece of information - token
      res.json({ token: tokenForUser(user) })
    })
  })
}
