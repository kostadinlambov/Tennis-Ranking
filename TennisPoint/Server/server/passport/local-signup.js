const PassportLocalStrategy = require('passport-local').Strategy
const User = require('mongoose').model('User')
const userService = require('../services/userService')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  console.log(email)
  const user = {
    email: email.trim(),
    password: password.trim(),
    // name: req.body.name.trim()
  }

  // const existingUser = userService.getByEmail(email)
  userService.getByEmail(email)
    .then(existingUser => {
      return done('E-mail already exists!')
    }).catch(err => {
      // console.log('err: ' err)
      usersData.save(user)
      return done(null)
    })
}

)

