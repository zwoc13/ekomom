const User = require('../models/User')

const createUser = (req, res, next) => {
  const props = req.body 

  User.create({ ...props })
    .then(user => {
      return res.json({
        ok: true,
        message: 'User created',
        user
      })
    })
    .catch(next)
}

const getUsers = (req, res, next) => {
  User.find()
    .then(user => {
      return res.json({
        ok: true,
        message: 'Users found',
        user
      })
    })
    .catch(next)
}

const getUser = (req, res, next) => {
  const id = req.params.user_id

  User.findById(id)
    .then(user => {
      return res.json({
        ok: true,
        message: 'User found',
        user
      })
    })
    .catch(next)
}

const updateUser = (req, res, next) => {
  const id = req.params.user_id
  const props = req.body.user

  User.updateOne(id, props)
    .then(user => {
      return res.json({
        ok: true,
        message: 'User updated',
        user
      })
    })
    .catch(next)
}

const deleteUser = (req, res, next) => {
  const id = req.params.user_id

  User.destroy(id)
    .then(deleteCount => {
      return res.json({
        ok: true,
        message: 'User destroyed',
        deleteCount
      })
    })
    .catch(next)
}

const deleteUserByName = (req, res, next) => {
  const name = req.params.name

  User.destroyByName(name)
    .then(deleteCount => {
      return res.json({
        ok: true,
        message: 'User destroyed',
        count: deleteCount
      })
    })
    .catch(next)
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteUserByName
}