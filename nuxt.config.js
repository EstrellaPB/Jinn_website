require('dotenv').config();
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vacation Rentals | Jinn',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Discover your dream vacation' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/jinn-website.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/gmaps.js', ssr: false },
    { src: '~/plugins/vue-gallery.js', ssr: false },
    { src: '~/plugins/scroll.js', ssr: false },
    { src: '~/plugins/vue-map.js', ssr: false },
    { src: '~/plugins/paginate.js', ssr: true },
    { src: '~/plugins/date-range-picker.js', ssr: false },
    { src: '~/plugins/slider.js', ssr:false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
          'nuxt-fontawesome', {
            imports: [
             {
               set: '@fortawesome/free-solid-svg-icons',
               icons: ['fas']
             },
             {
               set:'@fortawesome/free-brands-svg-icons',
               icons: ['fab']
             }
           ]
          }
    ],
    'nuxt-leaflet',
    '@nuxtjs/auth',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/moment'
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3978/api'
  },
  /*
  ** Auth module configuration
  ** See https://auth.nuxtjs.org/schemes/local.html#usage
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/profile', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: false
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    token: {
      prefix: '_jinn_token.'
    },
    localStorage: {
      prefix: 'auth.'
    }
  },

  router: {
    middleware: ['auth']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
