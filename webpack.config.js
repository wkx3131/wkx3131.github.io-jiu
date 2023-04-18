// install  webpack webpack-cil
// webpack用于打包压缩后运行
//默认的打包入口文件路径src/index.js ,不对就会报错找不到src
//默认的输出文件路径dist/main.js

// webpack-dev-server热更新插件 根据最新的代码生成新的webpack配置，不再需要重新启动
// html-webpack-plugin插件，指定页面复制到目录


// const path = require('path');
// module.exports = {
//   mode: 'development', // 开发模式，production运行模式
//   entry: path.join(__dirname, 'src/main.js'), // 改打包出口路径，__dirname是一个全局变量，用于表示当前模块文件所在的目录的绝对路径,join是拼接了路径
//   output: {
//     path: path.join(__dirname, './dist'), // 改输出文件存放路径
//     filename: 'bundle.js' // 输出文件名称
//   }
// };



// npx webpack-cli init 不需要自己配置，命令快速生成webpack config配置

/* 
Vue官方提供的脚手架工具vue-cli内部实现了基于webpack的开发环境配置，可以通过运行"npm run dev"命令启动该开发环境。在执行"npm run dev"之后，
webpack就会开始工作进行各种构建操作，主要分为以下几个步骤：
1. 启动webpack dev server，创建一个本地开发服务器，用于提供静态文件服务和接口代理等功能；
2. 对CSS、JS、图片等资源进行处理和打包，创建一个或多个bundle文件；
3. 将bundle文件和静态资源（如图片、字体文件等）输出到内存中；
4. 监听文件的改变，如HTML、CSS、JS、Vue等文件的改动，并实时更新在浏览器中；
5. 处理ES6、TypeScript、Less、Sass等开发语言，将其转换为浏览器可以识别的语言；
6. 集成常用插件，如热更新插件，自动生成HTML插件等。
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  mode: 'development', // 开发模式，production运行模式
  entry: path.join(__dirname, 'src/main.js'), // 改打包出口路径，__dirname是一个全局变量，用于表示当前模块文件所在的目录的绝对路径,join是拼接了路径
  output: {
    path: path.join(__dirname, 'dist'), // 改输出文件存放路径
    filename: 'bundle.js' // 输出文件名称
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    port: 8080,
    open: true,
  },
};