import React, { Component } from 'react'
import './index.css'
import './index.less'
import image from './assets/poi-pic.png'


export default class index extends Component {
  render() {
    const c = a.b
    return (
      <div className="root-container">
        this is a react component
        <text className='red'>red</text>
        <img className='image' src={image} />
      </div>
    )
  }
}
