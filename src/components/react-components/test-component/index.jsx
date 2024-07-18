import React, { Component } from 'react'
import './index.css'
import './index.less'
import image from './assets/poi-pic.png'

import request from '../../../request/index'

export default class index extends Component {

  componentDidMount() {
    request.get('/').then(res => {
      console.log(res)
    }).catch(err => {
      console.log('err', err)
    })
  }

  render() {
    // 测试sourceMap
    // const c = a.b
    return (
      <div className="root-container">
        this is a react component
        <text className='red'>red</text>
        <img className='image' src={image} />
      </div>
    )
  }
}
