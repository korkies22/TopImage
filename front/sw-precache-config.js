module.exports = {
    staticFileGlobs: [
      'build/static/css/**.css',
      'build/static/js/**.js',
      'build/static/media/**.jpg',
      'build/static/media/**.svg',
      'build/static/media/**.png'
    ],
    swFilePath: './build/service-worker.js',
    templateFilePath: './service-worker.tmpl',
    stripPrefix: 'build/',
    handleFetch: false,
    runtimeCaching: [{
      //urlPattern: /^https:\/\/top-image\.herokuapp\.com\/api/,
      urlPattern: /^https:\/\/top-image\.herokuapp\.com\/api/,
      handler: 'networkFirst'
    }]
  }