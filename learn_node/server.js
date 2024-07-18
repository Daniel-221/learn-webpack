// 基于experss的服务示例

// 引入Express模块
const express = require('express');
// 创建Express应用
const app = express();
// 定义端口号
const port = 3000;

// 处理根路径的GET请求
app.get('/', (req, res) => {
  res.send('欢迎来到Node.js服务端示例！');
});

// 使应用监听指定端口，等待连接
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});


// 原生服务示例
// 引入 http 模块
const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // 发送响应体
  res.end('welcome node');
});

// 监听 3000 端口
server.listen(3001, () => {
  console.log('服务器运行在 http://localhost:3001/');
});