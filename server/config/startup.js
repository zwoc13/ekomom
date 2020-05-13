const User = require('../models/User')

const checkAndCreateAdmin = () => {
  User.findOne({ email: process.env.ADMIN_EMAIL })
    .then(user => {
      if (!user) {
        // Let's create then user
        User.create({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          name: process.env.ADMIN_USERNAME,
        })
        .then(() => {
          console.log('Admin user is created')
        })
      }
    })
}

module.exports = {
  checkAndCreateAdmin
}