const Order = require('../models/order')
const Product = require('../models/order')

const createOrder = async (req, res, next) => {
  const props = req.body
  const productsList = props.products
  const ids = productsList.map(product => product.id)
  const productPromises = ids.map(async (id) => {
    return await Product.update({ _id: id }, { $inc: { qnt: -1 }})
  })

  const productsUpdated = await Promise.all(productPromises)
  if (productsUpdated) {
    const { order } = await Order.create({ ...props, status: 'new' })
    return res.json({
      order
    })
  }
}

const getOrders = async (req, res, next) => {
  const orders = await Order.find()
  return res.json({
    orders
  })
}

const getOrder = async (req, res, next) => {
  const id = req.params.order_id

  const order = await Order.findById(id)
  return res.json({
    order
  })
}

const updateOrder = async (req, res, next) => {
  const id = req.params.order_id
  const props = req.body

  const order = await Order.updateOne(id, { ...props })
  return res.json({
    order
  })
}

const deleteOrder = async (req, res, next) => {
  const id = req.params.order_id

  const order = await Order.deleteOne(id)
  return res.json({
    order
  })
}

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder
}