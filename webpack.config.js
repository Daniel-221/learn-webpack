const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
module.exports = {
  // 指定构建模式，有两个参数可选
  // 开发阶段使用development,因为打包速度快
  // 上线阶段使用production,因为项目上线需要文件体积小
  mode: 'development',
  entry: "./src/index.js",
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // 这允许你在导入时省略这些扩展名
  }
}