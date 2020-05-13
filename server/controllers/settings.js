const Settings = require('../models/settings')

const getSettings = (req, res, next) => {
  Settings.find()
    .then(fillings => {
      return res.json({
        ok: true,
        fillings
      })
    })
    .catch(next)
}

const createSettings = (req, res, next) => {
  const props = req.body.props

  Settings.create(props)
    .then(filling => {
      return res.json({
        ok: true,
        filling
      })
    })
    .catch(next)
}

const updateSettings = (req, res, next) => {
  const id = req.params.settings_id
  const props = req.body.props

  Settings.updateOne(id, props)
    .then(filling => {
      return res.json({
        ok: true,
        filling
      })
    })
    .catch(next)
}

const deleteSettings = (req, res, next) => {
  const id = req.params.settings_id

  Settings.deleteOne(id)
    .then(count => {
      return res.json({
        ok: true,
        count
      })
    })
    .catch(next)
}

module.exports = {
  getSettings,
  createSettings,
  updateSettings,
  deleteSettings
}