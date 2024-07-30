import axios from 'axios';

//创建axios石粒
const http = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器可以在发送请求之前或请求发送出去之后，但还未到达服务器时进行操作。常见的用途包括：
// 设置通用的请求头（如认证令牌）
// 开启加载动画
// 序列化请求发送之前的数据
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    config.headers.Authorization = ``;//比如设置请求头
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
)

// 移除拦截器
// const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);


// 响应拦截器可以在服务器响应数据回来之后，但还未被 then 或 catch 方法处理之前进行操作。常见的用途包括：
// 统一错误处理
// 关闭加载动画
// 对返回的数据进行格式化
http.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data; // 直接返回数据中的data，方便使用
  },
  error => {
    if (error.response.status === 401) {
      //根据返回状态码 处理错误
    }
    return Promise.reject(error)
  }
)

// 封装请求方法
const request = { 
  get(url, params) {
    return http.get(url, { params })
  },
  post(url, data) {
    return http.post(url, data)
  }
}

// http实例也可以直接调用 传入请求方法
// http({
//   method: 'post',
//   url: '',
//   params:{},
//   data:{}
// })

export default request

