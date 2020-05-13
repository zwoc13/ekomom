const { Schema } = require('mongoose')

const FabricSchema = new Schema({
  name: String,
  url: String,
  description: String,
}, {
  versionKey: false,
  timestamps: true
})

module.exports = db.model('Fabric', FabricSchema)