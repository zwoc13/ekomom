const router = require('express').Router()
const { authMiddleware } = require('../middleware')
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks')

router.get('/tasks', authMiddleware, getTasks)
router.post('/tasks', authMiddleware, createTask)
router.put('/tasks/:task_id', authMiddleware, updateTask)
router.delete('/tasks/:task_id', authMiddleware, deleteTask)

module.exports = router