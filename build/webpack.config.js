/**
 * Created by Ljili on 2020/9/22.
 */

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')//打包后的js需要手动引入 此插件可以实现自动引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//每次执行npm run build 会发现dist文件夹里会残留上次打包的文件，这里我们推荐一个plugin来帮我们在打包输出前清空文件夹clean-webpack-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//拆分css 所有css打包后都在一个里面
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')//拆分多个css、、对应多个css

const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')

const devMode = process.argv.indexOf('--mode=production') === -1;

module.exports = {
  mode:'development', // 开发模式
  context: path.resolve(__dirname, '../'),//基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  entry:["@babel/polyfill",'./src/main.js'] ,    // 入口文件npm i -D vue-loader vue-template-compiler vue-style-loader
  output: {
    path: path.resolve(__dirname,'../dist'), // 打包后的目录
    filename:'js/[name].[hash:8].js',      // 打包后的文件名称
    chunkFilename:'js/[name].[hash:8].js'
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        use:'vue-loader'// 从右向左解析原则
      },
      // MiniCssExtractPlugin.loader 拆分css 所有css打包后都在一个里面
      {
        test:/\.css$/,
        use:['style-loader',MiniCssExtractPlugin.loader,'css-loader',"postcss-loader"] // 从右向左解析原则
      },
      {
        test:/\.less$/,
        use:['style-loader',MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader'] // 从右向左解析原则
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
//拆分多个css、、对应多个css
//       {
//         test:/\.css$/,
//         use: ExtractTextWebpackPlugin.extract({
//           fallback: "style-loader",
//           use: "css-loader"
//         })
//       },
//       {
//         test:/\.less$/,
//         use: ExtractTextWebpackPlugin.extract({
//           fallback: "style-loader",
//           use: ["css-loader","less-loader"]
//         })
//       },

      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',//babel-loader只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/
      },
    ]
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.runtime.esm.js',
      ' @':path.resolve(__dirname,'../src')
    },
    extensions:['*','.js','.json','.vue']
  },
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:"[name].[hash].css",
      chunkFilename: "[id].css",
    }),
    // new ExtractTextWebpackPlugin({
    //     filename: 'css/[name].css',
    //     allChunks: true
    //     }),
    new vueLoaderPlugin(),
    // new Webpack.HotModuleReplacementPlugin()
  ]
}