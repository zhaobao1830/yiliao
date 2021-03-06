const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('view', resolve('src/view'))
      .set('lin', resolve('src/lin'))
      .set('components', resolve('src/components'))
      .set('store', resolve('src/store'))
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.html']
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/share.scss";'
      }
    }
  },
  devServer: {},
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: [
    'vuex-persist'
  ]
}
