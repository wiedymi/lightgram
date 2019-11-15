const path = require('path')
const OfflinePlugin = require('offline-plugin')

module.exports = function override (config, env) {
  config.resolve = {
    ...config.resolve,
    alias: { '@': path.resolve(__dirname, 'src') },
  }
  config.plugins = [
    ...config.plugins,
    new OfflinePlugin({
      caches: 'all',
      updateStrategy: 'all',
      responseStrategy: 'cache-first',
      externals: ['manifest.json', 'favicon.ico'],
      ServiceWorker: {
        output: './service-worker.js',
        entry: './src/service-worker.js',
        events: true,
        navigateFallbackURL: '/',
      },
    }),
  ]
  return config
}
