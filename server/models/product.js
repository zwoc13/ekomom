const { Schema } = require('mongoose')
const ProductItem = require('./schemas/product-item')
const ProductContent = require('./schemas/product-content')
const Photos = require('./schemas/photos')

const ProductSchema = new Schema({
  name: String,
  description: String,
  category: String,
  url: String,
  items: [ProductItem],
  fillings: [ProductContent],
  fabrics: [ProductContent],
  qnt: Number, 
  price: Number,
  discount: Number,
  photos: [Photos],
}, {
  versionKey: false,
  timestamps: true
})

module.exports = db.model('Product', ProductSchema)