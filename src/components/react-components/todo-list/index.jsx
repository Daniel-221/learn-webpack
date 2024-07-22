import React, { useState } from "react"
import useCount from '../../../hooks/custom-hook-test'
import './index.less'

export default function Todolist() {
    const [list, setList] = useState([])
    const [inputValue, setInputValue] = useState('')
    const { count, decrease, increase, } = useCount(0)

    function onAddItem() {
        if (inputValue) {
            // 这里注意 直接修改list并setlist是无法正常更新的
            setList([...list, {
                text: inputValue
            }])
            setInputValue('')
        } else {
            window.alert('请输入文本')
        }

    }

    function onDeleteItem(index) {
        setList(list.filter((item, i) => (i !== index)))
    }
    function onInputChange(e) {
        setInputValue(e.target.value)
    }

    return (
        <div className="container">
            <div className="list-container">
                {
                    list.map((item, index) => {
                        return <div className="list-item" key={index}>
                            <span className="list-item-text">{item.text}</span>
                            <div onClick={() => { onDeleteItem(index) }} className="delete-item">x</div>
                        </div>
                    })
                }
            </div>

            <div className="addcontainer">
                <input type="text" value={inputValue} onChange={onInputChange} />
                <div className="add-item" onClick={onAddItem}> 新增+</div>
            </div>
            {/* 使用自定义hook */}
            <div className="count">
                <span className="minus" onClick={decrease}>-</span>
                {count}
                <span className="plus" onClick={increase}>+</span>
            </div>
        </div>
    )
}