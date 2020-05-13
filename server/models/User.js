const bcrypt = require('bcrypt')
const { Schema } = require('mongoose')
const SALT_ROUNDS = 13

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
}, { 
  versionKey: false,
  timestamps: true,
})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err)
    next(null, isMatch)
  })
}

module.exports = db.model('User', UserSchema)