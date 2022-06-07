const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // transpileDependencies: true,
  // 语法检查
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3009',
        pathRewrite:{'^/api':''},
        // ws: true,
        // changeOrigin: true
      },
    }
  },
})
