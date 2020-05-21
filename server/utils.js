const AWS_BUCKET = process.env.AWS_BUCKET
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
})
const sharp = require('sharp')

const randomId = () => {
  const number = Math.random().toString(36)
  const id = number.substr(2,9)
  return id
}

const getBucketParams = (key, binary) => {
  return {
    Bucket: AWS_BUCKET,
    Key: key,
    Body: binary,
  }
}

const getPath = (key) => `${process.env.AWS_PATH}${key}`

const uploadImage = (bucketData) => {
  return new Promise((resolve, reject) => {
    s3.putObject(bucketData, (err) => {
      if (err) reject(err)
      const imagePath = getPath(bucketData.Key)
      resolve(imagePath)
    })
  })
}

const convertImageAndUpload = async (imageCategory, base64String, width = 480) => {
  const id = randomId()
  const match = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  if (match.length !== 3) {
    reject(new Error('Invalid base64 image'))
  }

  const bufferedImage = Buffer.from(match[2], 'base64')

  const webp = await sharp(bufferedImage).resize(width).webp({ quality: 75 }).toBuffer()
  const jpeg = await sharp(bufferedImage).resize(width).jpeg({ quality: 75 }).toBuffer()

  const webpData = await getBucketParams(`${imageCategory}_${id}.webp`, webp)
  const jpegData = await getBucketParams(`${imageCategory}_${id}.jpeg`, jpeg)

  const webpPath = await uploadImage(webpData)
  const jpegPath = await uploadImage(jpegData)

  return {
    webp: webpPath,
    jpeg: jpegPath,
  }
}

const deleteImage = (fileName) => {
  return new Promise((resolve, reject) => {
    const key = fileName.replace(process.env.AWS_PATH, '')
    const bucketParams = {
      Bucket: AWS_BUCKET,
      Key: key,
    }

    s3.deleteObject(bucketParams, (err) => {
      if (err) reject(new Error(err, err.stack))
      resolve(true)
    })
  })
}

const deleteImages = async (array) => {
  const imagesPromises = array.map(async (image) => {
    return await deleteImage(image)
  })

  const deletedResult = await Promise.all(imagesPromises)
  return deletedResult
}

const translit = (string) => {
  const ru = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya', 'i': 'i', ' ': '-',
  }

  let newString = []
  string = string.replace(/[ъь]+/g, '').replace(/й/g, 'i');

  for ( var i = 0; i < string.length; ++i ) {
    newString.push(
        ru[ string[i].toLowerCase() ]
      || ru[ string[i].toLowerCase() ] == undefined && string[i]
      || ru[ string[i].toLowerCase() ].replace(/^(.)/, function ( match ) { return match.toUpperCase() })
    );
  }

  return newString.join('')


}

module.exports = {
  deleteImage,
  deleteImages,
  convertImageAndUpload,
  translit,
}