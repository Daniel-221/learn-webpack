import React, { useState } from "react"
// 简单的自定义hook 封装计数器逻辑
export default function useCount(initNum) {
    const [count, setCount] = useState(initNum)
    function increase() {
        setCount(count + 1)
    }
    function decrease() {
        setCount(count - 1)
    }
    return { count, decrease,increase }

}