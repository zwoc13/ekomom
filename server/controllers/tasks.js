const Task = require('../models/task')

const getTasks = async (req, res, next) => {
  const tasks = await Task.find({}).sort({ 'craetedAt': -1 })

  return res.json({
    tasks,
  })
}

const createTask = async (req, res, next) => {
  const props = req.body

  const created = await Task.create({ ...props })
  return res.json({
    created
  })
}

const updateTask = async (req, res, next) => {
  const _id = req.params.task_id
  const props = req.body

  const updated =  await Task.updateOne({ _id }, { ...props })
  return res.json({
    updated
  })
}

const deleteTask = async (req, res, next) => {
  const _id = req.params.task_id

  const deleted = await Task.deleteOne({ _id })
  return res.json({
    deleted
  })
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}