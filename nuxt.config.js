require('dotenv').config()
const {join} = require('path')
const {copySync, removeSync} = require('fs-extra')

module.exports = {
    mode: 'spa',

    env: {
        apiUrl: process.env.API_URL || process.env.APP_URL + '/api',
        appName: process.env.APP_NAME || 'Laravel Nuxt',
        appCurrency: process.env.APP_CURRENCY || 'EUR',
        appLocale: process.env.APP_LOCALE || 'en',
        githubAuth: !!process.env.GITHUB_CLIENT_ID
    },

    head: {
        title: process.env.APP_NAME,
        titleTemplate: '%s - ' + process.env.APP_NAME,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    loading: {color: '#007bff'},

    router: {
        middleware: ['locale', 'check-auth']
    },

    css: [
        {src: '~assets/sass/app.scss', lang: 'scss'}
    ],

    plugins: [
        '~components/global',
        '~plugins/i18n',
        '~plugins/vform',
        '~plugins/axios',
        '~plugins/bus',
        '~plugins/fontawesome',
        '~plugins/nuxt-client-init',
        {src: '~plugins/bootstrap', mode: 'client'}
    ],

    modules: [
        '@nuxtjs/router'
    ],

    build: {
        extractCSS: true,

        /*extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }*/
    },

    hooks: {
        generate: {
            done(generator) {
                // Copy dist files to public/_nuxt
                if (generator.nuxt.options.dev === false && generator.nuxt.options.mode === 'spa') {
                    const publicDir = join(generator.nuxt.options.rootDir, 'public', '_nuxt')
                    const publicDirIndex = join(generator.nuxt.options.rootDir, 'public')
                    removeSync(publicDir)
                    copySync(join(generator.nuxt.options.generate.dir, '_nuxt'), publicDir)
                    copySync(join(generator.nuxt.options.generate.dir, '200.html'), join(publicDir, 'index.html'))
                    copySync(join(publicDir, 'index.html'), join(publicDirIndex, 'index.html'))
                    removeSync(generator.nuxt.options.generate.dir)
                }
            }
        }
    }
}
