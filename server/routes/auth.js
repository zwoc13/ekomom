const router = require('express').Router()
const passport = require('passport')
const {
  me,
  login,
  logout,
  register,
  userPatch,
} = require('../controllers/auth')

router.patch('/', userPatch)
// router.post('/me', me)
router.post('/login', passport.authenticate('local'), login)
router.post('/logout', logout)
router.post('/register', register)

module.exports = router