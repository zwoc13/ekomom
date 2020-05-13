const { Schema } = require('mongoose')

const PhotosSchema = new Schema({
  webp: String,
  jpeg: String
}, {
  _id: false,
})

module.exports = PhotosSchema