const { Schema } = require('mongoose')

const ProductItemSchema = new Schema({
  item: String,
  qnt: Number,
  size: String,
}, {
  _id: false,
})

module.exports = ProductItemSchema