require('dotenv').config({ path: '.env' })
const imageminMozjpeg = require('imagemin-mozjpeg')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isDev = process.env.NODE_ENV !== 'production'
const getRoutes = require('./utils/routes')

module.exports = {
  ...(!isDev && {
    modern: 'client'
  }),
  head: {
    title: 'EkoMom',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Інтернет-магазин дитячого текстилю. Власне виробництво, відправка по Україні.' },
      { hid: 'msapplication-TileColor', name: "msapplication-TileColor", content: "#ffffff" },
      { hid: 'msapplication-TileImage', name: "msapplication-TileImage", content: "/favicon/ms-icon-144x144.png" },
      { hid: 'theme-color', name: "theme-color", content: "#ffffff" },
    ]
  },
  rootDir: __dirname,
  loading: '@/components/Preloader.vue',
  css: [
    'normalize.css',
    '@/assets/css/main.scss',
  ],
  router: {
    prefetchLinks: false,
  },
  render: {
    resourceHints: false,
    etag: false,
    static: {
      etag: false
    }
  },
  plugins: [
    { src: '@/plugins/lazy' }
  ],
  buildModules: [
  ],
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources',
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
    'nuxt-webfontloader',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    [ 'nuxt-vuex-localstorage', {
      ...isDev && ({
        debug: true
      }),
      localStorage: ['cart'],
    }]
  ],
  styleResources: {
    scss: [
      '~assets/css/custom.scss',
    ]
  },
  axios: {
    baseURL: process.env.BASE_URL,
    https: true,
  },
  sitemap: {
    hostname: 'https://ekomom.com',
    defaults: {
      lastmod: new Date(),
      changefreq: 'daily',
    },
    gzip: true,
    generate: false,
    cacheTime: 1000 * 60 * 60 * 24,
    exclude: [
      '/admin',
      '/admin/*'
    ],
    routes: async () => {
      const routes = await getRoutes()
      return routes
    }
  },
  pwa: {
    icon: {
      iconSrc: '/favicon.ico',
    },
    manifest: {
      "name": "EkoMom - інтернет-магазин дитячого текстилю",
      "short_name": "EkoMom",
      "lang": "ua",
      "description": "Інтернет-магазин дитячого текстилю. Власне виробництво, відправка по Україні.",
      "background_color": "#ede7e6",
      "icons": [{
        "src": "/favicon/android-icon-36x36.png",
        "sizes": "36x36",
        "type": "image/png"
      }, {
        "src": "/favicon/android-icon-48x48.png",
        "sizes": "48x48",
        "type": "image/png"
      }, {
        "src": "/favicon/android-icon-72x72.png",
        "sizes": "72x72",
        "type": "image/png"
      }, {
        "src": "/favicon/android-icon-96x96.png",
        "sizes": "96x96",
        "type": "image/png"
      }, {
        "src": "/favicon/android-icon-144x144.png",
        "sizes": "144x144",
        "type": "image/png"
      }, {
        "src": "/favicon/android-icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-57x57.png",
        "sizes": "57x57",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-60x60.png",
        "sizes": "60x60",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-72x72.png",
        "sizes": "72x72",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-76x76.png",
        "sizes": "76x76",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-114x114.png",
        "sizes": "114x114",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-120x120.png",
        "sizes": "120x120",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-144x144.png",
        "sizes": "144x144",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-152x152.png",
        "sizes": "152x152",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-180x180.png",
        "sizes": "180x180",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon-precomposed.png",
        "sizes": "192x192",
        "type": "image/png"
      }, {
        "src": "/favicon/apple-icon.png",
        "sizes": "192x192",
        "type": "image/png"
      }, {
        "src": "/favicon/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png"
      }, {
        "src": "/favicon/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      }, {
        "src": "/favicon/favicon-96x96.png",
        "sizes": "96x96",
        "type": "image/png"
      }, {
        "src": "/favicon/ms-icon-70x70.png",
        "sizes": "70x70",
        "type": "image/png"
      }, {
        "src": "/favicon/ms-icon-144x144.png",
        "sizes": "144x144",
        "type": "image/png"
      }, {
        "src": "/favicon/ms-icon-150x150.png",
        "sizes": "150x150",
        "type": "image/png"
      }, {
        "src": "/favicon/ms-icon-310x310.png",
        "sizes": "310x310",
        "type": "image/png"
      }]
    }
  },
  webfontloader: {
    events: false,
    google: {
      families: [
        'Comfortaa&display=swap',
        'Roboto&dispaly=swap',
      ]
    },
    timeout: 5000,
  },
  build: {
    optimizeCss: false,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    optimization: {
      minimize: !isDev
    },
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),
    transpile: ['vue-lazy-hydration', 'intersection-observer'],
    postcss: {
      preset: {
        features: {
          customProperties: false,
        }
      },
      plugins: {
        ...(!isDev && {
          cssnano: {
            preset: ['advanced', {
              autoprefixer: false,
              cssDeclarationSorter: false,
              zindex: false,
              discardComments: {
                removeAll: true
              }
            }]
          }
        })
      },
      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true
        }
      }),

      order: 'cssnanoLast'
    },
    extend (config, ctx) {
      const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'
      const vueSvgLoader = [
        {
          loader: 'vue-svg-loader',
          options: {
            svgo: false
          }
        }
      ]
      const imageMinPlugin = new ImageminPlugin({
        pngquant: {
          quality: '5-30',
          speed: 7,
          strip: true
        },
        jpegtran: {
          progressive: true

        },
        gifsicle: {
          interlaced: true
        },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true
          })

        ]
      })
      if (!ctx.isDev) config.plugins.push(imageMinPlugin)

      config.module.rules.forEach(rule => {
        if (rule.test.toString() === ORIGINAL_TEST) {
          rule.test = /\.(png|jpe?g|gif|webp)$/i
          rule.use = [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
              }
            }
          ]
        }
      })
      //  Create the custom SVG rule
      const svgRule = {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: vueSvgLoader
          },
          {
            resourceQuery: /data/,
            loader: 'url-loader'
          },
          {
            resourceQuery: /raw/,
            loader: 'raw-loader'
          },
          {
            loader: 'file-loader' // By default, always use file-loader
          }
        ]
      }

      config.module.rules.push(svgRule) // Actually add the rule
    }
  }
}
