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

    User.create({
      email: reqUser.email,
      salt: salt,
      hashedPass: hashedPassword
    }).then(user => {
      const loggedInUser = user;
      console.log(loggedInUser)
      req.logIn(user, (err, user1) => {
        if (err) {
          return res.status(400).json({
            success: false,
            error: err
          })
        }

        console.log('user: ', loggedInUser)
        console.log('success')

        return res.status(200).json({
          id: loggedInUser._id,
          email: loggedInUser.email,
          // reqUser,
          // ...loggedInUser,
          success: true
        })

      })
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: err
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
          return res.status(401).json({
            success: false,
            error: 'Invalid user data'
          })
        }

        if (!user.authenticate(reqUser.password)) {
          return res.status(401).json({
            success: false,
            error: 'Invalid user data'
          })
        }

        console.log(user)
        const loggedInUser = user;
        console.log(loggedInUser)

        req.logIn(user, (err, user) => {
          if (err) {
            return res.status(401).json({
              success: false,
              error: err
            })
          }

          console.log('user: ', loggedInUser)
          console.log('success')
  
          return res.status(200).json({
            id: loggedInUser._id,
            email: loggedInUser.email,
            // reqUser,
            // ...loggedInUser,
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
