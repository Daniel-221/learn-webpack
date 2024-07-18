//https://www.runoob.com/nodejs/nodejs-tutorial.html



// 基于experss的服务示例

// 引入Express模块
const express = require('express');
const cors = require('cors')
// 创建Express应用
const app = express();


// 解决跨域问题
// 1.使用cors中间件，允许所有来源的请求
// app.use(cors())

// 2.手动设置相应头 也是自定义中间件
app.use((req, res, next) => {
  const allowOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080']
  const origin = req.headers.origin
  console.log('request from ', origin)
  if (allowOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  }
  next();// 调用下一个中间件或路由处理器
})


// 定义端口号
const port = 3000;

// 处理根路径的GET请求
// Express框架提供了一个更高级、更灵活的路由机制，使得定义路由变得简单而且直观
app.get('/', (req, res) => {
  console.log('home')
  res.send('欢迎来到Node.js服务端示例！');
});

app.get('/name', (req, res) => {
  console.log('name')
  res.status(200)
  res.header('Content-Type', 'application/json')
  res.send({ name: 'zzl' })
})
app.get('/age', () => {
  console.log('age')
  res.status(200)
  res.header('Content-Type', 'application/json')
  res.send({ age: 18 })
})
// 路由和中间件的执行顺序是根据它们被定义的顺序来决定的 只有当没有任何其他路由匹配当前请求时，404处理器才会被执行
app.use((req, res) => {
  console.log('404')
  res.status(404).send('Not Found')
})


// 使应用监听指定端口，等待连接
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});




// ***************************



// 原生服务示例
// 引入 http 模块
const http = require('http');
// 在macOS上使用Node.js实现内网穿透，可以使用ngrok或localtunnel这样的服务
const localtunnel = require('localtunnel');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 在原生Node.js中，没有内置的路由功能，因此需要手动解析请求的URL和方法
  const { url, method } = req;
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' })
    res.end('<h1>Hello, Node.js!</h1>');
  } else if (url === '/api' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ name: 'zzy' }))
  }
});

const PORT = 3001;
// 监听 3001 端口
server.listen(PORT, () => {
  console.log('服务器运行在 http://localhost:3001/');
  // 开启localtunnel
  // 启动node服务 运行lt --port 3001
  tunnels = localtunnel(PORT, (err, tunnel) => {
    if (err) console.error(err);
    else console.log(`Your public URL is: ${tunnel.url}`);
  });
});