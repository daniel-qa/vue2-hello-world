const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 這行最重要，請確保有這一行
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue2-hello-world/'
    : '/',
  
  transpileDependencies: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        devtool: 'cheap-module-source-map'
      }
    }
  }
})