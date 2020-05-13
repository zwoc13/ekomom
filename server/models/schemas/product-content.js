const { Schema } = require('mongoose')

const ProductContentSchema = new Schema({
  forItem: String,
  what: String,
}, {
  _id: false,
})

module.exports = ProductContentSchema