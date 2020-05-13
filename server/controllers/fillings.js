const Filling = require('../models/fillings')

const getFillings = async (req, res, next) => {
  const fillings = await Filling.find()

  return res.json({
    fillings,
  })
}

const createFilling = async (req, res, next) => {
  const { name, description } = req.body

  const created = await Filling.create({ name, description })
  const fillings = await Filling.find()
  
  return res.json({
    fillings
  })
}

const updateFilling = async (req, res, next) => {
  const _id = req.params.filling_id
  const { name, description } = req.body

  const updated = await Filling.updateOne({ _id }, { name, description })
  const fillings = await Fillings.find()

  return res.json({
    fillings
  })
}

const deleteFilling = async (req, res, next) => {
  const _id = req.params.filling_id

  const deleted = await Filling.deleteOne({ _id })
  const fillings = await Filling.find()

  return res.json({
    fillings
  })
}

module.exports = {
  getFillings,
  createFilling,
  updateFilling,
  deleteFilling
}