import React, { Component } from 'react'
import './index.css'
import './index.less'
import image from './assets/poi-pic.png'
import Todolist from '../todo-list'

import request from '../../../request/index'

export default class index extends Component {

  componentDidMount() {
    request.get('/name').then(res => {
      console.log('res from http://127.0.0.1:3000/name', res)
    }).catch(err => {
      console.log('err', err)
    })
    request.get('http://127.0.0.1:3001/api').then(res => {
      console.log('res from http://127.0.0.1:3001/api', res)
    }).catch(err => {
      console.log('request err', err)
    })
  }

  render() {
    // 测试sourceMap
    // const c = a.b
    return (
      <div className="root-container">
        this is a react component
        <span className='red'>red</span>
        <img className='image' src={image} />
        <Todolist />
      </div>
    )
  }
}
