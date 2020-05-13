const Product = require('../models/product')
const Category = require('../models/category')
const { convertImageAndUpload, deleteImages } = require('../utils')

const collectPhotosAndUpload = async (photos) => {
  const promises = photos.map(async photo => {
    const { webp, jpeg } = await convertImageAndUpload('product', photo, 500)
    return { webp, jpeg }
  })

  const uploadedPhotos = Promise.all(promises)
  return uploadedPhotos
}

const searchProducts = async (req, res, next) => {
  const { s: searchString } = req.query
  
  const products = await Product.find({
    $or: [{
      name: { $regex: searchString, $options: 'ig' }
    }, {
      description: { $regex: searchString, $options: 'ig' }
    }]
  }).limit(7)

  return res.json({
    products
  })
}

const createProduct = async (req, res, next) => {
  const props = req.body

  const createProductWithPhotos = async () => {
    const uploadedPhotos = await collectPhotosAndUpload(props.photos)
    await Product.create({ ...props, photos: uploadedPhotos })
  }

  await createProductWithPhotos()

  const products = await Product.find()
  return res.json({
    products
  })
}

const getProduct = async (req, res, next) => {
  const _id = req.params.product_id
  const product = await Product.findOne({ _id })
  
  return res.json({
    product
  })
}

const getNewProducts = async (req, res, next) => {
  const newProducts = await Product
    .find({ qnt: { $gt: 0 }})
    .sort({ createdAt: -1 })
    .limit(4)
    .select('_id name category description price discount photos qnt')

  return res.json({
    products: newProducts
  })
}

const getProducts = async (req, res, next) => {
  const query = req.query
  const hasParams = Object.keys(query).length > 0

  if (hasParams) {
    const { category, subcategory, sort } = query

    let dbQuery = {}, sortingOptions = {}
    if (subcategory) {
      const { _id } = await Category.findOne({ url: subcategory })
      dbQuery['category'] = _id
    } else if (category) {
      const { _id } = await Category.findOne({ url: category })
      const subcategories = await Category.find({ parent: _id })
      const ids = subcategories.map(subcategory => subcategory._id)
      
      dbQuery['category'] = { $in: ids }
    }

    if (sort) {
      sortingOptions = {
        'new:asc': { createdAt: -1 },
        'price:asc': { price: -1 },
        'price:desc': { price: 1 },
      }
    }

    const products = await Product.find(dbQuery).sort(sortingOptions[sort])
    return res.json({
      products
    })
    
  } else {
    const products = await Product.find()
    return res.json({
      products,
    })
  }
}

const getRelativeProducts = async (req, res, next) => {
  const _id = req.params.product_id
  
  const product = await Product.findOne({ _id })
  const { category, price, discount } = product 
  const priceLimits = {
    min: price - 200,
    max: price + 200,
  }
  const discountLimits = {
    min: discount - 200,
    max: discount + 200,
  }
  
  const productsByCategory = await Product.find({ _id: { $ne: _id }, category }).limit(2)
  const productsByPrice = await Product.find({ _id: { $ne: _id }, price: { $gte: priceLimits.min, $lte: priceLimits.max } }).limit(2)
  const productsWithDiscount = await Product.find({ _id: { $ne: _id }, discount: { $gte: discountLimits.min, $lte: discountLimits.max } }).limit(2)

  const fetchedProducts = [ ...productsByCategory, ...productsByPrice, ...productsWithDiscount ]

  return res.json({
    products: fetchedProducts
  })
}

const updateProduct = async (req, res, next) => {
  const _id = req.params.product_id
  const props = req.body

  const product = await Product.findOne({ _id })
  const oldPhotos = product.photos

  const base64Photos = props.photos.filter(photo => !photo.hasOwnProperty('webp') && photo.includes('base64'))
  let uploadedPhotos = []
  if (base64Photos.length) {
    uploadedPhotos = await collectPhotosAndUpload(base64Photos)
  }

  const newPhotos = oldPhotos.concat(uploadedPhotos)
  
  const oldWebps = oldPhotos.map(photo => photo.webp)
  const newWebps = newPhotos.map(photo => photo.webp)

  const photosToRemove = oldWebps.filter(old => !newWebps.includes(old))
  if (photosToRemove.length) {
    const deletedPhotos = await deleteImages(photosToRemove)
  }

  const updatedProduct = await Product.updateOne({ _id }, { ...props, photos: newPhotos })
  const products = await Product.find()

  return res.json({
    products
  })

}

const deleteProduct = async (req, res, next) => {
  const _id = req.params.product_id

  const { photos } = await Product.findOne({ _id })
  await deleteImages(photos)
  
  const deleted = await Product.deleteOne({ _id })
  const products = await Product.find()

  return res.json({
    product
  })
}

module.exports = {
  createProduct,
  searchProducts,
  getProduct,
  getProducts,
  getRelativeProducts,
  getNewProducts,
  updateProduct,
  deleteProduct,
}