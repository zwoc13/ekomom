const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false, { message: 'Nu user found '})
        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err)
          if (!isMatch) return done(null, false, { message: 'Incorrect password' })
          done(null, user)
        })
      })
    }
  ))
}
