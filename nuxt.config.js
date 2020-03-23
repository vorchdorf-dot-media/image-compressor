export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Image Compressor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'twitter:image',
        content: 'https://compressor.sascha.app/screenshot.png'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/localstorage',
      ssr: false
    },
    {
      src: '~/plugins/worker',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient, isDev }) {
      config.output.globalObject = 'this';

      config.module.rules.push({
        test: /wasm_[a-z0-9_]+\.js$/,
        loader: 'exports-loader'
      });

      config.module.rules.push({
        test: /\.wasm$/,
        loader: 'file-loader',
        type: 'javascript/auto',
        options: {
          name: 'wasm/[name]_[hash:8].[ext]'
        }
      });

      if (isClient) {
        config.node = {
          fs: 'empty'
        };
      }
    }
  },
  /*
   ** PWA configuration
   */
  pwa: {
    manifest: {
      name: 'Image Compressor',
      short_name: 'Compressor',
      display: 'standalone',
      background_color: '#163663',
      theme_color: '#03161e'
    },
    meta: {
      name: 'Image Compressor',
      ogHost: 'https://compressor.sascha.app',
      ogImage: '/screenshot.png',
      twitterCard: 'summary_large_image',
      twitterSite: '@saschazar',
      twitterCreator: '@saschazar'
    }
  }
};
