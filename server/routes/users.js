const router = require('express').Router()
const { authMiddleware } = require('../middleware')
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteUserByName
} = require('../controllers/users')

router.post('/users', createUser)
router.get('/users', authMiddleware, getUsers)

router.get('/users/:user_id', authMiddleware, getUser)
router.put('/users/:user_id', authMiddleware, updateUser)
router.delete('/users/:user_id', authMiddleware, deleteUser)
router.delete('/users/name/:name', authMiddleware, deleteUserByName)

module.exports = router