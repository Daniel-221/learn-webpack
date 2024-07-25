// original component demo⬇️
// 'use strict';
// var component = require('./components/testComponent/index.js');

// document.body.appendChild(component());


//react component demo
import React from "react";
import ReactDOM from "react-dom/client";
import App from './components/react-components/test-component/index'
// 废弃
// ReactDOM.render(<App />, document.getElementById('root'));
// 18+

//整个页面 包括dom，图片，样式加载完
window.onload = () => {
  console.log('window.onload')
}
window.addEventListener('load', () => {
  console.log('window.addEventListener load')
})

// 当初始的 HTML 文档被完全加载和解析完成后触发，不必等待样式表、图像和子框架的完全加载。
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');
});

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App />)