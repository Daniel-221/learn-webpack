// 常考手写题

// 柯里化
export function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  }
}

// export function curry2(func) {
//   return function curried(...args) {
//     // 检查当前接收到的参数数量是否足够
//     if (args.length >= func.length) {
//       // 如果足够，直接调用原函数
//       return func.apply(this, args);
//     } else {
//       // 如果不足，返回一个新的函数，等待接收更多参数
//       // 注意这里使用...args2来接收多个参数
//       return function (...args2) {
//         // 将之前接收到的参数和新接收到的参数合并，再次调用curried函数
//         return curried.apply(this, args.concat(args2));
//       };
//     }
//   }
// }

// 手写delay
const delay(func, time){
  return function (...args) {
    setTimeout(() => {
      func.apply(this, args)
    }, time);
  }
}

function arrange() {
  const tasks = []
  function dosomething(task) {
    tasks.push(() => {
      console.log('do ', task)
    })
    return this
  }

  function sleep(time) {
    tasks.push(
      () => {
        return new Promise((res) => {
          console.log('start sleep')
          setTimeout(() => {
            console.log('sleep', time)
            res()
          }, time);
        })
      }
    );
    return this
  }
  async function run() {
    for (let task of this.tasks) {
      await task;
    }

  }


  function test() {
    const p = new Promise((resolve, reject) => {
      console.log('hhh')
      resolve(1)
    })
    // p.then((res=>{

    // })).catch(e=>{

    // })

    async function test2() {
      const res = await p;
      console.log(res)
    }
  }

  return {
    dosomething,
    sleep,
    run
  }
}


// 深克隆
function cloneDeep(obj, map = new WeakMap()) {
  if (obj === null) {
    return null
  }
  // 简单类型
  if (typeof obj !== 'object') {
    return obj
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if (map.get(obj)) {
    return map.get(obj)
  }
  const newObj = new obj.constructor()
  map.set(obj, newObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = cloneDeep(obj[key], map)
    }
  }
  return newObj


}



// todo 实现LRU
// https://www.nowcoder.com/search/all?query=%E9%98%BF%E9%87%8C%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95&type=all&searchType=%E9%A1%B6%E9%83%A8%E5%AF%BC%E8%88%AA%E6%A0%8F


export class LRU {

  constructor(n) {
    this.size = n
    this.map = new Map()
  }

  put(key, val) {
    // // 当前key已有 删除重新插入 
    // if (this.map.get(key)) {
    //   this.map.delete(key)
    //   this.map.set(key, val)
    // }

    if (this.map.size >= this.size) {
      const firstKey = this.map.keys().next().value
      // const firstKey= [...this.data.keys()][0];
      this.map.delete(firstKey)
    }
    this.map.set(key, val)
  }

  get(key) {
    const val = this.map.get(key)
    if (val) {
      this.put(key, val)
      return val
    } else {
      return false
    }
  }



}

// 数组打平
function arrFlat(arr) {
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    const curItem = arr[i]
    if (Array.isArray(curItem)) {
      newArr.push(...arrFlat(curItem))
    } else {
      newArr.push(curItem)
    }
  }
  return newArr
}
// 非递归 用栈
function arrFlat2(arr) {
  const stack = [...arr]
  const newArr = []
  while (stack.length) {
    const item = stack.pop()
    if (Array.isArray(item)) {
      stack.push(...item)
    } else {
      newArr.push(item)
    }
  }
  return newArr.reverse()
}

// 防抖
function dbc(func, time) {
  let timer = null
  return function (...args) {
    clearInterval(timer)
    timer = setTimeout(() => {
      func.apply(this, ...args)
      timer = null
    }, time);
  }
}


// 节流
function reduceliu(func, time) {
  let timer = null
  return function (...args) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      func.call(this, args)
      timer = null
    }, time);
  }
}



//数组转树

let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];

function convert(list) {

  const tree = {
    id: 0,
    children: []
  }

  function appendData(node, data, pId) {
    if (node.id === pId) {
      node.children = [...node.children, { ...data }]
    } else if (node.children?.length > 0) {
      node.children.forEach(child => {
        appendData(child, data, pId)
      })
    }
  }

  list.forEach(item => {
    appendData(tree, item, item.parentId)
  })
  console.log('list:', list)
}
//自己写的⬆️ 不好
function convert2(list) {

  const map = new Map()
  list.forEach(item => {
    map.set(item.id, item)
  })
  const res = []
  list.forEach(item => {
    const { id, parentId } = item
    const curNode = map.get(id)
    if (parentId === 0) {
      res.push(curNode)
    } else {
      const parentNode = map.get(parentId)
      parentNode.children = [...parentNode?.children ?? [], curNode]
    }
  })

  return res

}

const result = convert(list)






// 实现bind

export function myBind(func, context) {
  return function (...args) {
    func.apply(context, args)
  }
}


// 实现apply
function myApply(func, context, args) {
  const tempKey = Symbol('applyKey')
  context[tempKey] = func
  const result = context[tempKey](...args);
  delete context[tempKey]
  return result
}



// 实现new
function myNew(func) {
  const newObj = Object.create(func.prototype)
  const result = func.apply(newObj)
  return result instanceof Object ? result : newObj
}



//实现对象flatten
const obj = {
  a: {
    b: 1,
    c: 2,
    d: {
      e: 5
    }
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3
}

// tag review
function flatObj(obj, prefix = '', result = {}) {
  //用 (let k in obj)  统一处理数组和对象
  for (let k in obj) {
    const curKey =
      Array.isArray(obj) ?
        (prefix ? (prefix + '.') : '') + '[' + k + ']'
        : (prefix ? (prefix + '.') : '') + k

    if (typeof obj[k] === 'object') {
      flatObj(obj[k], curKey, result)
    } else {
      result[curKey] = obj[k]
    }
  }
  return result
}

// function flt(obj, prefix = '', result = {}) {
//   for (let k in obj) {
//     const curItem = obj[k]
//     const curPrefix = prefix + (Array.isArray(obj) ? `[${k}]` : (prefix?`.`:'') +`${k}`)
//     if (typeof curItem === 'object') {
//       flt(curItem, curPrefix, result)
//     } else {
//       result[curPrefix] = curItem
//     }
//   }
//   return result
// }



// 现已知一个字符串是由正整数和加减乘除四个运算符(+ - * /)组成。
// 例如存在字符串 const str = '11+2-3*4+5/2*4+10/5'，现在需要将高优先级运算，用小括号包裹起来，例如结果为 '11+2-(3*4)+(5/2*4)+(10/5)'。注意可能会出现连续的乘除运算，需要包裹到一起。
// 请用 javascript 实现这一过程

const str = '11+2-3*4+5/2*4+10/5'
function formatCaculate(str = '') {
  const exp = /\d+([\*\/]\d+)+/g
  return str.replace(exp, (s) => {
    return `(${s})`
  })
}
formatCaculate(str)


// 【编程题】基于二面中的表达式包裹编程题，实现计算表达式的值
// function caculate(str) {
//   const exp = /\d+([\*\/]\d+)+/g

//   function cacu(str) {
//     const exp2 = /[\+\-\*\/]/
// const exres = exp2.exec(str).index
// const index = exres.index
//      const left = str.substring(0,index)
//      const right = 
//   }

//   str.replace(exp, (match) => {
//     console.log(match);
//   })
// }
// 不会


// 题目1：验证电子邮件地址
// 编写一个函数，使用正则表达式验证输入字符串是否为有效的电子邮件地址。

// 321324@xx.com
function isValidEmail(email) {
  // 在这里编写代码
  const exp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return exp.test(email)

}
// 题目2：提取URL的域名
function extractDomain(url = '') {
  const exp = /http:\/\/([0-9a-zA-Z\.]+)\//
  url.replace(exp, (m, p1) => {
    console.log(m, p1)
  })
}



//字符串转树

const treestr = `root
 folder1
  file1
  file2
 folder2
  file3`

function strToTree(str) {
  const arr = str.split('\n')
  const stack = []
  const root = {
    value: null,
    children: [],
    depth: -1
  }
  stack.push(root)
  arr.forEach(s => {
    const depth = s.search(/\S/)
    const text = s.trim()
    const node = {
      value: text,
      children: [],
      depth
    }
    console.log('node--->', s, node)
    while (stack?.[stack.length - 1]?.depth >= depth) {
      stack.pop()
    }
    stack[stack.length - 1].children.push(node)
    stack.push(node)

  })
  return root

}


function promiseAll(promises) {
  let resolved = 0
  const results = []
  return new Promise((res, rej) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(r => {
        resolved++
        results.push(r)
        if (resolved === promises.length) {
          return res(results)
        }
      }).catch(e => {
        return rej(e)
      }
    }
  })
}

// 链式延迟调用
function lazyMan(name) {
  // 返回一个可以对象
  return new Lazy(name)
}

class Lazy {
  constructor(name) {
    this.tasks = []
    this.tasks.push(() => {
      console.log('Hi!This is ' + name + '.');
    });
    // 随后执行
    setTimeout(() => {
      this.then();
    }, 0)
  }

  eat(name) {
    // 从后进任务数组
    this.tasks.push(() => {
      return new Promise(
        function (res, rej) {
          console.log('Eat ' + name + '.');
          return res()
        }
      )
    })
    return this
  }

  sleep(time) {
    // 从后进任务数组
    this.tasks.push(
      () => {
        return new Promise(
          (res) => {
            console.log('等待 ' + time + '秒.');
            setTimeout(() => {
              console.log('wake up after ' + time + ' seconds.');
              res()
            }, time * 1000)
          }
        )
      }

    );
    return this
  }

  sleepFirst(time) {
    // 从前进任务数组
    this.tasks.unshift(
      () => {
        return new Promise(
          (res) => {
            console.log('等待 ' + time + '秒.');
            setTimeout(() => {
              console.log('wake up after ' + time + ' seconds.');
              res()
            }, time * 1000)
          }
        )
      }
    );
    return this
  }

  // 执行任务数组里的方法
  async then() {
    for (let task of this.tasks) {
      await task();
    }

    // let task = this.tasks.shift();
    // task && task();
    // return this;
  }

}



function limit(promises, l) {

  const len = promises.length
  let settled = 0
  const result = []
  const tasks = promises.slice(0, l)
  return new Promise((resolve, reject) => {
    let curIndex = 0
    function runTask(index) {
      Promise.resolve(tasks[index]()).then(res => {
        result.push(res)
        settled++
        if (settled === len) {
          resolve(result)
        } else {
          runTask(++curIndex)
        }
      }).catch(e => {
        reject(e)
      })
    }
    for (curIndex = 0; curIndex < l && curIndex < len; curIndex++) {
      runTask(curIndex)
    }
  })
}


// compose
//比如：compose(f, g, h) 最终得到这个结果 (...args) => f(g(h(...args))).
function compose(...functions) {
  return function (...args) {
    let res = null
    for (let i = functions.length - 1; i >= 0; i--) {
      const f = functions[i]
      res = res ? f(res) : f(...args)
    }
    return res
  }
}


function cps(...fncs) {
  if (fncs.length === 1) {
    return fncs[0]
  } else {
    const f = fncs[0]
    const restF = fncs.slice(1)
    return function (...args) {
      const params = cps(restF)(...args)
      return f(params)
    }
  }
}


//单例

//用闭包
function singleton() {
  let instance = null
  return function () {
    instance = instance ? instance : new Object()
    return instance
  }
}
const getInstance = singleton()
const instance = getInstance()


//用构造函数
function funcSingleton() {
  if (funcSingleton.instance) {
    return funcSingleton.instance
  }
  // this是作为构造函数时新创建的实例
  funcSingleton.instance = this
}
const instance2 = new funcSingleton()

class SingleClassInstance {
  static instance = null
  constructor() {
    if (SingleClassInstance.instance) {
      return SingleClassInstance.instance
    }
    SingleClassInstance.instance = this
  }
}

const instance3 = new SingleClassInstance();


// 实现reduce
Array.prototype.myReduce = function (callback, initValue) {
  let res = initValue
  this.forEach((item, index) => {
    res = callback(res, item, index)
  })
  return res
}


//用 reduce 实现数组的 flat 方法
function reduceFlat(arr) {
  const result = arr.reduce((res, item) => {
    console.log(res)
    if (Array.isArray(item)) {
      res = res.concat(reduceFlat(item))
    } else {
      res.push(item)
    }
    return res
  }, [])
  return result
}


// 手写promise

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      });

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      })
    }
  }
}

// 实现ajax


// readyState 是 XMLHttpRequest 对象的一个属性，用于表示请求的当前状态。它有以下几个可能的值：
// 0 (UNSENT): 请求未初始化，即尚未调用 open() 方法。
// 1 (OPENED): 请求已建立连接，即已调用 open() 方法。
// 2 (HEADERS_RECEIVED): 已接收响应头。
// 3 (LOADING): 正在接收响应体。
// 4 (DONE): 请求完成，响应数据接收完毕。
// 在实际应用中，通常会在 readyState 为 4 时处理响应数据，因为此时请求已经完成，可以安全地访问响应数据。
function promiseAjax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error(xhr.statusText))
        }
      }
    }
    xhr.send()
  })
}

async function AjaxFunc(url) {
  try {
    const res = await promiseAjax(url)
    return res
  } catch (e) {
    console.log(e)
  }
}


// get_user_id 转 驼峰表达式
function toCamel(s) {
  return s.replace(/_([a-z]+)/g, (ss, p1) => {
    return p1[0].toUpperCase() + p1.substring(1)
  })
}

//手写一个类Person，要求有私有属性，公共方法，静态方法，用function Person(){}实现，不能用class
function Person(name) {
  // 私有变量 闭包实现
  let _name = name
  // 公共方法
  this.getName = function () {
    return _name
  }
  this.setName = function (name) {
    _name = name
  }
}
// 静态方法 直接附加在构造函数上的，可通过Person直接访问
Person.createPerson = function (name) {
  return new Person(name)
}
// 用class实现
class PersonClass {
  // 私有属性
  // 私有属性 #name 和 #age 是通过ES6的私有字段语法来实现的，只能在类内部访问
  #name;
  #age;

  // 构造函数
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  // 公共方法
  getName() {
    return this.#name;
  }

  getAge() {
    return this.#age;
  }

  setName(name) {
    this.#name = name;
  }

  setAge(age) {
    this.#age = age;
  }

  // 静态方法
  static createPerson(name, age) {
    return new Person(name, age);
  }
}

function asyncLimit(promiseExctors, limit) {
  let index = 0
  const len = promiseExctors.length
  let settled = 0
  const results = new Array(len).fill(null)

  return new Promise((resolve, reject) => {
    function runTask(index) {
      if (index >= len) {
        return
      }
      const exc = promiseExctors[index]
      Promise.resolve(exc()).then(res => {
        results[index] = res
        settled++
        if (settled === len) {
          resolve(results)
        } else {
          runTask(index + 1)
        }
      })
    }
    for (let i = 0; i < limit; i++) {
      runTask(i)
    }
  })
}
const tasks = [
  () => {
    return fetch('xxx')
  }, () => {
    return fetch('xxx')
  },
]