import { useState, useEffect, useRef, useCallback } from 'react';

function useTimer() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const start = () => {
    if (timerRef.current !== null) return; // 防止重复启动定时器
    timerRef.current = setInterval(() => {
      // 更新count 这里使用回调函数的形式
      setCount(prevCount => prevCount + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { count, start };
}

export default useTimer;



// 使用示例

// import React from 'react';
// import useTimer from './useTimer';

// function TimerComponent() {
//   const { count, start } = useTimer();

//   return (
//     <div>
//       <h1>计数器: {count}</h1>
//       <button onClick={start}>启动定时器</button>
//     </div>
//   );
// }

// export default TimerComponent;
