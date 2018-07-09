const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    // Add validations!

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    // User.create({
    //   username: reqUser.username,
    //   firstName: reqUser.firstName,
    //   lastName: reqUser.lastName,
    //   salt: salt,
    //   hashedPass: hashedPassword
    // }).then(user => {
    //   req.logIn(user, (err, user) => {
    //     if (err) {
    //       res.locals.globalError = err
    //       res.render('users/register', user)
    //     }

    //     res.redirect('/')
    //   })
    // })
    User.create({
      email: reqUser.email,
      salt: salt,
      hashedPass: hashedPassword
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err
          res.render('users/register', user)
        }

        res.redirect('/')
      })
    })
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let reqUser = req.body
    User
      .findOne({ email: reqUser.email }).then(user => {
        if (!user) {
          //res.locals.globalError --> Used in handelbars templates
          // res.locals.globalError = 'Invalid user data'
          // res.render('users/login')

          return res.status(401).json({
            success: false,
            error: 'Invalid user data'
          })
        }

        if (!user.authenticate(reqUser.password)) {

          //res.locals.globalError --> Used in handelbars templates
          // res.locals.globalError = 'Invalid user data'
          // res.render('users/login')
          // return

          return res.status(401).json({
            success: false,
            error: 'Invalid user data'
          })
        }

        console.log(user)

        req.logIn(user, (err, user1) => {
          if (err) {
            // res.locals.globalError = err
            // res.render('users/login')

            return res.status(401).json({
              success: false,
              // error: 'Invalid user data'
              error: err
            })
          }

          // res.redirect('/')
          return res.status(200).json({
            id: user.id,
            email: user.email,
            reqUser,
            user,
            success: true
          })
        })
      })
  },
  logout: (req, res) => {
    req.logout()
    // res.redirect('/')
    return res.status(204).json({
      // id: user.id,
      // email: user.email,
      success: true
    })
  }
}
