const { Schema } = require('mongoose')
const ProductItem = require('./product-item')
const ProductContent = require('./product-content')

const ProductOptionSchema = new Schema({
  title: String,
  items: [ProductItem],
  fillings: [ProductContent],
  fabrics: [ProductContent],
  qnt: Number, 
  price: Number,
  discount: Number,
}, {
  _id: false
})

module.exports = ProductOptionSchema