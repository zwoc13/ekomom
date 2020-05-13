const { Schema } = require('mongoose')

const TaskSchema = new Schema({
  text: String,
  complete: Boolean,
}, {
  versionKey: false,
  timestamps: true
})

module.exports = db.model('Task', TaskSchema)