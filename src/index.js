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
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App />)