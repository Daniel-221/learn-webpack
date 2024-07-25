//hook的原理 闭包+Fiber架构
// https://juejin.cn/post/6891577820821061646

const React = require('react');
const ReactDOM  = require('react-dom');

const states = []
let cursor = 0

// 数组模拟react hook
function useState(initState) {
  states[cursor] = states[cursor] ?? initState
  function setState(newState) {
    states[cursor] = newState
    render()
  }
  cursor++
  return [states[cursor], setState]
}

function TestComponent() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(1)
  onAddcount = () => {
    setCount(count + 1)
  }
  onAddNum = () => {
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

function render() {
  console.log('render...')
  ReactDOM.createRoot(document.getElementById('root')).render(<TestComponent />)
  cursor = 0//重置cursor
}
render()//首次渲染