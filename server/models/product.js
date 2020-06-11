const { Schema } = require('mongoose')
const Photos = require('./schemas/photos')
const ProductOption = require('./schemas/product-option')

const ProductSchema = new Schema({
  name: String,
  description: String,
  category: String,
  url: String,
  qnt: Number,
  options: [ProductOption],
  photos: [Photos],
}, {
  versionKey: false,
  timestamps: true
})

module.exports = db.model('Product', ProductSchema)