export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  loading: {
    continuous: true
  },

  head: {
    title: 'STS - NIT Rourkela',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: 'blue',
    height: '2px'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/style'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASEURL || 'https://api-sts-nitr.app.madvertlabs.com'// 'http://localhost:5000'//https://api-sts-nitr.app.madvertlabs.com
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  //auth
  router: {
    middleware: ['auth']
  },
  auth: {
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge:7776000
      }
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          type: 'Bearer',
          maxAge:7776000
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/user/login', method: 'post' },
          logout: false,
          user: { url: '/me', method: 'get' }
        },
        redirect: {
          home: false
        },    
      }
    }
  },
  pwa: {
    icon: {
      fileName: 'app-icon.png',
    },
    meta: {
      mobileAppIOS:true,
      name:"STS-NITR",
    },
    manifest: {
      name: 'STS-NITR',
      short_name:'STS-NITR',
      lang: 'en',
      crossorigin: 'use-credentials',
    },
    workbox: {
      clientsClaim: false
    }
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa'
  ],

}
