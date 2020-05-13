const { Schema } = require('mongoose')
const SubcategorySchema = require('./schemas/subcategory')

const CategorySchema = new Schema({
  name: String,
  url: {
    type: String,
    index: true
  },
  description: String,
  parent: {
    type: Schema.Types.ObjectId,
    index: true,
    defaultValue: null,
  },
  webp: String,
  jpeg: String,
}, {
  versionKey: false,
  timestamps: true
})

module.exports = db.model('Category', CategorySchema)