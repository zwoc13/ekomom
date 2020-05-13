const { Schema } = require('mongoose')
const ArticleSchema = Schema({
  visible: Boolean,
  header: String,
  content: String,
}, {
  versionKey: false,
  timestamps: true
})

module.exports = db.model('Article', ArticleSchema)