const { Schema } = require('mongoose')

const FillingsSchema = new Schema({
  name: String,
  url: String,
}, {
  versionKey: false,
  timestamps: true
})

module.exports = db.model('Filling', FillingsSchema)