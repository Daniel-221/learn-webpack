const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const path = require("path")
module.exports = {
  // 指定构建模式，有两个参数可选
  // 开发阶段使用development,因为打包速度快
  // 上线阶段使用production,因为项目上线需要文件体积小
  mode: 'development',
  resolve: {
    alias: {
      //告诉 webpack ,程序员写的代码中，@符号表示 src 这一层目录
      '@': path.join(__dirname, '/src/')
    }
  },
  entry: "./src/index.js",
  // entry: "./src/testHook.js", //learn hook
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  plugins: [
    // HtmlWebpackPlugin 用于自动生成 HTML 文件，并自动注入打包后的 JavaScript 文件。
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //  用于压缩 JavaScript 代码，减少文件大小。
    // new TerserPlugin({
    //   terserOptions: {
    //     compress: {
    //       // drop_console: true // 移除console语句
    //     }
    //   }
    // })
  ],
  //sourceMap就是一个信息文件，里面存储这位置信息。也就是说， Source Map文件中存储着压缩混淆后的代码，所对应的转换前的位置。
  //保证运行时报错的行数与源代码的行数保持一致
  devtool: 'eval-source-map',
  devServer: {
    //初次打包后自动打开浏览器
    open: true
    //修改端口号
    //在http协议中，如果端口号是80,则可以被省略
    // port: 80,
    //指定运行的主机地址
    // host: '127.0.0.1'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,// 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }, {
        test: /.css$/,
        use: [
          'style-loader', // 将 CSS 注入到 DOM 中
          'css-loader',    // 解析 CSS 文件
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      },
      // 从 Webpack 5 开始，file-loader 和 url-loader 已经被 asset module type 替代，提供了一种更简单的方式来处理图片和其他静态资源
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset', // 自动选择 between 'asset/resource' 和 'asset/inline'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // 这允许你在导入时省略这些扩展名
  }
}