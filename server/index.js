const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const https = require('https')
const isProd = process.env.NODE_ENV === 'production'

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !isProd

const mongoose = require('mongoose')
global.db = mongoose.createConnection(process.env.MONGO_URL, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })

const { checkAndCreateAdmin } = require('./config/startup')
checkAndCreateAdmin()

require('./config/passport')(passport)

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(cors())
  app.use(bodyParser.json({ limit: '150mb' }))
  app.use(bodyParser.urlencoded({ 
    limit: '150mb', 
    extended: true ,
    parameterLimit: 1000000000,
  }))
  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: db,
      ttl: 12 * 24 * 60 * 60,
      cookie: { maxAge: 2678400000 },
      transformFunctions: {
        serialize: (x) => x
      }
    }),
    resave: false,
    saveUninitialized: false,
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/api', [
    require('./routes/articles'),
    require('./routes/auth'),
    require('./routes/categories'),
    require('./routes/fillings'),
    require('./routes/np'),
    require('./routes/orders'),
    require('./routes/fabrics'),
    require('./routes/users'),
    require('./routes/tasks'),
    require('./routes/products'),
    require('./routes/telegram'),
  ])

  // Give nuxt middleware to express
  app.use(nuxt.render)
  app.listen(port)

  console.log(`Server listening on https://${host}:${port}`)
}
start()
