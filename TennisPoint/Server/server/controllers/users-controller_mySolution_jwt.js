const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {
  registerGet: (req, res) => {
    return res.status(200).json({
      message: 'request to /users/register',
      success: true
    })
    // res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    // Add validations!
    console.log(req.body)
  

    const validationResult = validateSignupForm(req.body)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
  
    return passport.authenticate('local-signup', (err) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: err
        })
      }
  
      return res.status(200).json({
        success: true,
        message: 'You have successfully signed up! Now you should be able to log in.'
      })
    })(req, res, next)
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

        req.logIn(user, (err, user) => {
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
