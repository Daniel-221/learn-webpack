//hook的原理 闭包+Fiber架构
// https://juejin.cn/post/6891577820821061646
// 调试该代码 修改webpack  entry: "./src/testHook.js", //learn hook入口文件


import ReactDOM from "react-dom/client";
import React from 'react'

// 数组模拟react hook

const states = []
let cursor = 0

function useState(initState) {
  const curCursor = cursor
  states[curCursor] = states[curCursor] ?? initState
  function setState(newState) {
    // curCursor也是一整个闭包住了 确保setstate修改对位置
    states[curCursor] = newState
    // 重新渲染
    render()
  }
  cursor++
  console.log('return states[cursor]', states[curCursor])
  return [states[curCursor], setState]
}


// 模拟useEffect 依然是数组+cursor

const allDependencies = []
let effectCursor = 0
/**
 * 
 * @param {*} callback  回调函数
 * @param {*} deps 依赖列表（的值）
 * @returns 
 */
function useEffect(callback, deps) {
  // 首次调用
  if (!allDependencies[effectCursor]) {
    allDependencies[effectCursor] = deps
    callback()
    effectCursor++
    return
  }

  const curCursor = effectCursor
  const originalDeps = allDependencies[curCursor]
  //检查依赖变化
  const isChanged = originalDeps.some((dep, index) => {
    return deps[index] !== dep
  })
  if (isChanged) {
    callback()
    allDependencies[curCursor] = deps
  }
  effectCursor++
}




function TestComponent() {
  // 每次重新渲染函数组件 都会按照顺序重新执行以下hooks
  const [count, setCount] = useState(1)
  const [num, setNum] = useState(1)
  console.log(count, num)

  useEffect(() => {
    console.log('useEffect init')
  }, [])
  useEffect(() => {
    console.log('useEffect num', num)
  }, [num])
  
  function onAddcount() {
    setCount(count + 1)
  }
  function onAddNum() {
    setNum(num + 1)
  }
  return <div >
    <div onClick={onAddcount}>
      count: {count}
    </div>
    <div onClick={onAddNum}>
      num: {num}
    </div>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'))

function render() {
  console.log('render...')
  // 每次render都会重新调用 TestComponent() 访问闭包的值
  root.render(<TestComponent />)
  cursor = 0//重置cursor
  effectCursor = 0
}
render()//首次渲染