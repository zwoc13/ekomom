const { Schema } = require('mongoose')

const OrderSchema = new Schema({
  products: Array,
  name: String,
  phone: String,
  city: String,
  paymentType: String,
  warehouse: String,
  comment: String,
  status: String,
}, {
  versionKey: false,
  timestamps: true
})

module.exports = db.model('Order', OrderSchema)