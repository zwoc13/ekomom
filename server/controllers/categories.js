const Category = require('../models/category')
const { convertImageAndUpload, deleteImage, deleteImages, translit } = require('../utils')

const getCategory = async (req, res, next) => {
  const _id = req.params.category_id

  const category = await Category.findOne({ _id })

  return res.json({
    category,
  })
}

const getCategories = async (req, res, next) => {
  const categories = await Category.find()
  return res.json({
    categories,
  })
}

const createCategory = async (req, res, next) => {
  const { name, description, image, parent } = req.body
  
  const { webp, jpeg } = await convertImageAndUpload('category', image)
  const created = await Category.create({ name, url: translit(name), description, parent, webp, jpeg })
  const categories = await Category.find()

  return res.json({
    categories
  })
}

const updateCategory = async (req, res, next) => {
  const _id = req.params.category_id
  let { name, description, image } = req.body

  const deletedImages = await deleteImages([ foundCategory.webp, foundCategory.jpeg ])
  const { webp, jpeg } = await convertImageAndUpload('category', image)

  const updatedCategory = await Category.updateOne({ _id }, { name, description, webp, jpeg })
  const categories = await Category.find()

  return res.json({
    categories
  })
}

const deleteCategory = async (req, res, next) => {
  const _id = req.params.category_id

  const category = await Category.findOne({ _id })
  const subcategories = await Category.find({ parent: _id })

  let subImages = []
  if (subcategories.length) {
    subcategories.foeEach(subcategory => {
      subImages.push(subcategory.webp)
      subImages.push(subcategory.jpeg)
    })
  }
  
  const deletedImages = await deleteImages([ category.webp, category.jpeg ])

  if (subImages.length) {
    const subDeletedImages = await deleteImages(subImages)
  }

  const deletedCategory = await Category.deleteOne({ _id }) 
  const categories = await Category.find()

  return res.json({
    categories
  })
}

module.exports = {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
}