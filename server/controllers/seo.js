const Product = require('../models/product')
const Category = require('../models/category')

const collectRoutes = async (req, res, next) => {
  const staticRoutes = [
    '/',
    '/shop',
    '/payment',
  ]
  const parentCategories = await Category.find({ parent: null })
  const childrenCategories = await Category.find({ parent: { $ne: null }})
  const parentUrls = parentCategories.map(category => {
    return `/shop/${category.url}`
  })
  const childrenUrls = childrenCategories.map(category => {
    const parent = parentCategories.find(parent => parent._id === category.parent)
    const parentUrl = parent.url 
    return `/shop/${parentUrl}/${category.url}`
  })

  const products = await Product.find()
  const productUrls = products.map(product => {
    return `/shop/product/${product._id}`
  })

  const urlsList = [ ...staticRoutes, ...parentUrls, ...childrenUrls, ...productUrls ]
  return urlsList
}

module.exports = {
  collectRoutes
}