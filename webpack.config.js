var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

/** 跨域地址 **/
var url_dev = "http://localhost:8081";    // 开发环境
var url_test = "http://192.168.90.135:8080";  // 测试环境

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|ttf|svg|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: './imgs',
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src'),
      'components':path.resolve(__dirname, './src/components'),
      'assets': path.resolve(__dirname, './src/assets'),  
      'swiper': 'swiper/dist/js/swiper.js',//引入这句即可
      'swiper.css':path.resolve(__dirname, './src/assets/lib/swiper/swipe.css'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    disableHostCheck: false, //  新增该配置项
    // host:'192.168.1.86',
    //解决跨域
    proxy: {
        '/api': {
            target: url_dev,
            changeOrigin:true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
        }),
        // new HtmlWebpackPlugin({
        //     title: '首页',  //生成的页面标题<head><title>首页</title></head>
        //     filename: 'index.html', // dist目录下生成的文件名
        //     template: 'src/index.html', // 我们原来的index.html，作为模板
        //     inject: true
        // })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.publicPath = './dist/'
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
