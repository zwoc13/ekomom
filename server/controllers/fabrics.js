const Fabric = require('../models/fabric')

const getFabrics = async (req, res, next) => {
  const fabrics = await Fabric.find()
  
  return res.json({
    fabrics
  })
}

const createFabrics = async (req, res, next) => {
  const { name, description } = req.body

  const created = await Fabric.create({ name, description })
  const fabrics = await Fabric.find()

  return res.json({
    fabrics
  })
}

const updateFabrics = async (req, res, next) => {
  const _id = req.params.fabrics_id
  const { name, description } = req.body

  const updated = await Fabric.updateOne({ _id }, { name, description })
  const fabrics = await Fabric.find()

  return res.json({
    fabrics
  })
}

const deleteFabrics = async (req, res, next) => {
  const _id = req.params.fabrics_id

  const deleted = await Fabric.deleteOne({ _id })
  const fabrics = await Fabric.find()

  return res.json({
    fabrics,
  })
}

module.exports = {
  getFabrics,
  createFabrics,
  updateFabrics,
  deleteFabrics,
}