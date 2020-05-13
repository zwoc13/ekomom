const User = require('../models/User')

const userPatch = (req, res) => {
  if (!req.user || !req.user.id) return res.sendStatus(401)
  User.findById(req.user.id, (err, user) => {
    if (err) return res.sendStatus(404)
    user.comparePassword(req.body.currentPassword, (err, isMatch) => {
      if (err || !isMatch) return res.sendStatus(400)
      user.password = req.body.newPassword
      user.save(err => res.sendStatus(err ? 500 : 200))
    })
  })
}

const login = async (req, res, next) => {
  req.user.password = undefined
  return await res.json(req.user)
}

const logout = (req, res, next) => {
  req.logout()
  res.json({ ok: true })
}

const register = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  const user = new User({ email, password })
  user.save(err => {
    if (err) return res.status(409).json({ message: 'Already exists' })
  })
  req.login(user, (err) => {
    if (err) return res.sendStatus(500)
    user.password = undefined
    res.json(user)
  })
}

module.exports = {
  login,
  logout,
  register,
  userPatch,
}