const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        devtool: 'cheap-module-source-map'
      }
    }
  }
})
