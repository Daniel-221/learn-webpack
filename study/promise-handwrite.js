// https://juejin.cn/post/7256066096947265597
// 手写Promise
// 基础版本 状态/添加回掉 仅支持同步
class MyPromise {
  constructor(exector) {
    this.status = 'PENDING'
    this.value = undefined
    this.reason = undefined
    // tag注意这里 一是判断状态 而是不必写在外面作为实例方法 写在构造函数里
    const resolve = (value) => {
      if (this.status === 'PENDING') {
        this.value = value
        this.status = 'FULLFULLED'
      }
    }
    const reject = (reason) => {
      if (this.status === 'PENDING') {
        this.reason = reason
        this.status = 'REJECTED'
      }
    }

    try {
      exector(resolve, reject)
    } catch (err) {
      reject(err)
    }

  }


  then(resolved, reject) {
    if (this.status === 'FULLFULLED') {
      resolved(this.value)
    } else if (this.status === 'REJECTED') {
      reject(this.reason)
    }
  }


  catch(reject) {
    if (this.status === 'REJECTED') {
      reject(this.reason)
    }
  }
}

// 数组存放回调 
class MyPromise2 {
  constructor(exector) {
    this.status = 'PENDING'
    this.value = undefined
    this.reason = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    const resolve = (value) => {
      if (this.status === 'PENDING') {
        this.value = value
        this.status = 'FULLFULLED'
        this.resolveCallbacks.forEach(cb => {
          cb(this.value)
        })
      }
    }
    const reject = (reason) => {
      if (this.status === 'PENDING') {
        this.reason = reason
        this.status = 'REJECTED'
        this.rejectCallbacks.forEach(cb => {
          cb(this.reason)
        })
      }
    }

    try {
      exector(resolve, reject)
    } catch (err) {
      reject(err)
    }

  }


  then(onResolved, onReject) {
    this.resolveCallbacks.push(onResolved)
    this.rejectCallbacks.push(onReject)
  }


  catch(onReject) {
    this.rejectCallbacks.push(onReject)
  }
}




// 手写Promise.all
MyPromise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let settled = 0
    const res = []
    // 没有任务
    if (!promises.length) {
      return resolve(results)
    }
    promises.forEach((p, index) => {
      // tag 注意此处用resolve包一下
      Promise.resolve(p).then(r => {
        res[index] = r
        settled++
        if (settled.length === promises.length) {
          resolve(res)
        }
      }).catch(e => {
        reject(e)
      })
    })
  })
}


// 手写Promise race
MyPromise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve).catch(reject)
    })
  })
}


// 手写allSettled
// 利用Promise.all 首先吧promises映射成另一组promises，新的 Promise 在原 Promise 解决或拒绝后返回一个包含状态和结果的对象
MyPromise.allSettled = function (promises) {
  Promise.all(
    promises.map(p => (
      p.then(res => ({
        status: 'fullfilled',
        value: res
      }))
        .catch(err => ({
          status: 'rejected',
          reason: err
        }))
    ))
  )
}



// retry 重试任务
function retry(func, maxRetry) {
  return new Promise((resolve, reject) => {

    async function tryFunc() {
      for (let i = 0; i < maxRetry; i++) {
        try {
          const res = await func()
          resolve(res)
        } catch (err) {
          console.log(err)
          continue
        }
      }
      reject('noResult')
    }
    tryFunc()
  })
}
// function asyncTask() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new Error('cuowu'))
//     }, 1000);
//   })
// }

// retry(asyncTask,4)


// 手写异步串行任务

function asyncSeries(tasks) {
  const len = tasks.length
  const results = []
  return new Promise((resolve, reject) => {
    function runTask(index) {
      if (index < len) {
        Promise.resolve(tasks[index]()).then(res => {
          results[index] = res
          runTask(++index)
        }).catch(err => {
          results[index] = err
          runTask(++index)
        })
      } else {
        resolve(results)
      }
    }
    runTask(0)
  })
}

// const tasks = [
//   function () {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(1)
//       }, 1000);
//     })
//   },

//   function () {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(2)
//       }, 1000);
//     })
//   },

//   function () {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(3)
//       }, 1000);
//     })
//   }
// ]

// 手写批量请求
function batchRequest(requests, maxConcurrency) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedCount = 0;
    let currentIndex = 0;

    function makeRequest(index) {
      if (index >= requests.length) {
        if (completedCount === requests.length) {
          resolve(results);
        }
        return;
      }

      const currentRequest = requests[index];
      currentRequest()
        .then((result) => {
          results[index] = result;
        })
        .catch((error) => {
          results[index] = error;
        })
        .finally(() => {
          completedCount++;
          makeRequest(currentIndex++);
        });
    }
    for (currentIndex = 0; currentIndex < maxConcurrency && currentIndex < requests.length; currentIndex++) {
      makeRequest(currentIndex)
    }
  });
}

// 手写Promise.resolve

function promiseResolve(v) {
  if (v instanceof Promise) {
    return v
  } else {
    return new Promise((resolve) => {
      resolve(v)
    })
  }
}

// 手写Promise.finally
// 1. 调用当前 Promise 的 then 方法返回一个新的 Promise 对象（保证链式调用）
// 2. 调用 Promise 中的 resolve 方法进行返回
function Promisefinally(callback) {
  if (typeof callback !== 'function') {
    return this.then(callback, callback);
  }
  // 假设我们在promise中定义
  return this.then(
    (value) => this.resolve(callback()).then(() => value),
    (reason) =>
      this.resolve(callback()).then(() => {
        throw reason;
      })
  );
}

//1. 执行 callback this.resolve(callback())  无论 callback 是同步函数还是异步函数，Promise.resolve 都会将其包装成一个 Promise。这样可以确保 callback 被执行，并且可以处理 callback 返回的任何值或 Promise。
// 2. .then(() => value) 在 callback 执行完成后，使用 then 方法返回原始的 value。这样可以确保 finally 回调函数不会影响 Promise 的最终结果

// 手写promise.catch
function promiseCatch(cb) {
  this.then(null, cb)
}

