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





'11+2-3*4+5/2*4+10/5'

function solution(str) {
  return str.replace(/([0-9]+([\*\/][0-9]+)+)/g, (s, p) => {
    return `(${s})`
  })
}


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


// 并发控制
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

class myPromise {
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
  // ES2022 才有的私有字段
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

// 字节考过我
//实现远程加法
//https://blog.csdn.net/github_37715294/article/details/121517033

const remoteAdd = async (a, b) => new Promise(resolve => {
  setTimeout(() => resolve(a + b), 1000);
});

// 请实现本地的localAdd方法，调用remoteAdd，能最优的实现输入数字的加法
// 这个是
// 虽然这个实现可以正确地计算结果，但由于每次累加操作都是串行执行的，因此总的等待时间是所有 remoteAdd 操作的时间之和。为了进一步优化，可以考虑并行处理多个加法操作。

// function localAdd(...inputs) {

//   let sum = inputs.reduce(async (pre, cur) => {
//     let preV = 0
//     let val = 0
//     if (typeof pre === 'object') {
//       await pre.then(res => {
//         preV = res
//       })
//     } else {
//       preV = pre
//     }
//     await remoteAdd(preV, cur).then(res => {
//       val = res
//     })
//     return val
//   })
//   return new Promise(resolve => {
//     resolve(sum)
//   })
// }

function localAdd(...inputs) {
  return new Promise((resolve) => {
    const temp = []
    const tasks = []

    let activeTaskNum = 0
    let i = 0
    while (i < inputs.length) {
      if (i + 1 < inputs.length) {
        runAdd(inputs[i], inputs[i + 1])
        i += 2
      } else {
        console.log(temp, inputs[i])
        temp.push(inputs[i])
        i += 1
      }

    }

    function runAdd(a, b) {
      const p = remoteAdd(a, b)
      activeTaskNum++
      tasks.push(p)
      p.then(res => {
        temp.push(res)
        activeTaskNum--
        if (temp.length > 1) {
          const a = temp.pop()
          const b = temp.pop()
          runAdd(a, b)
        }
        if (activeTaskNum === 0) {
          resolve(temp[0])
        }
      })
    }
  })
}


// 请用示例验证运行结果:
localAdd(1, 2)
  .then(result => {
    console.log(result); // 3
  });

localAdd(3, 5, 2)
  .then(result => {
    console.log(result); // 10
  });




// 手写reduce
function ArrayReduce(arr, func, initValue) {
  if (Array.isArray(arr)) {
    let value = initValue
    arr.forEach((item, index) => {
      value = func(value, item, index)
    })
    return value
  } else {
    throw new Error('Type Error')
  }
}

// 改进后 支持没有初始值

function ArrayReduce(arr, func, initValue) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First argument must be an array');
  }

  if (typeof func !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  let hasInitValue = arguments.length > 2;
  let value = hasInitValue ? initValue : arr[0];
  let startIndex = hasInitValue ? 0 : 1;

  for (let i = startIndex; i < arr.length; i++) {
    value = func(value, arr[i], i, arr);
  }

  return value;
}


// 数组转树
// const arr = [
//   {
//     id: 2,
//     name: '部门B',
//     parentId: 0
//   },
//   {
//     id: 3,
//     name: '部门C',
//     parentId: 1
//   },
//   {
//     id: 1,
//     name: '部门A',
//     parentId: 2
//   },
//   {
//     id: 4,
//     name: '部门D',
//     parentId: 1
//   },
//   {
//     id: 5,
//     name: '部门E',
//     parentId: 2
//   },
//   {
//     id: 6,
//     name: '部门F',
//     parentId: 3
//   },
//   {
//     id: 7,
//     name: '部门G',
//     parentId: 2
//   },
//   {
//     id: 8,
//     name: '部门H',
//     parentId: 4
//   }
// ]

// 自己写的
function foo(arr) {
  const map = new Map()
  arr.forEach((item, index) => {
    const { id } = item
    item.children = []
    map.set(id, item)
  })

  let root = null
  arr.forEach((item, index) => {
    const { parentId } = item
    parent = map.get(parentId)
    if (parent) {
      parent.children.push(item)
    } else {
      root = item
    }
  })
  return root
}
// 参考代码
const foo2 = (list) => {
  const map = {}
  // tag 可用数组存根节点 因未必只有一个
  const treeList = []

  list.forEach(item => {
    if (!item.children) item.children = [];
    map[item.id] = item
  });

  list.forEach(item => {
    const parent = map[item.parentId];
    if (parent) {
      parent.children.push(item);
    } else {
      treeList.push(item);
    }
  });

  return treeList;
}



// 手写filter/map/every
// 不写了

// 手写柯里化
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}


// 参考
const curry2 = (fn, ...args) => {
  if (args.length < fn.length) {
    // 未接受完参数，拼上参数
    return (..._args) => curry(fn, ...args, ..._args)
  } else {
    // 接受完所有参数，直接执行
    return fn(...args)
  }
}


// 手写eventEmitter
class EventEmitter {


  constructor() {
    this.tasks = {}
  }

  on(event, cb) {
    if (!this.tasks[event]) {
      this.tasks[event] = []
    }
    this.tasks[event].push(cb)
  }
  off(event, cb) {
    const curEventTasks = this.tasks[event]
    if (curEventTasks) {
      if (cb) {
        const index = curEventTasks.findIndex(c => c === cb)
        if (index !== -1) {
          curEventTasks.splice(index, 1)
        }
      } else {
        delete this.tasks[event]
      }
    }
  }
  emit(event) {
    const curTasks = this.tasks[event]
    curTasks.forEach(t => {
      t()
    })
  }
}

// 参考
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }

  off(eventName, listener) {
    const listeners = this.events[eventName];
    if (listeners) {
      this.events[eventName] = listeners.filter(l => l !== listener);
    }
  }

  // tag once 就是搞一个新事件，调用老的 完了再取消 奥
  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}


//  手写instanceOf
function myInstanceOf(left, right) {
  if (typeof left !== 'object' || typeof right !== 'object') {
    throw new Error('type Error')
  }
  const cur = left
  const target = right.prototype
  while (cur) {
    if (cur === target) {
      return true
    } else {
      cur = cur.__proto__
    }
  }
  return false
}

// 参考
function myInstanceOf2(obj, constructor) {
  // 加上异常处理
  if (!['object', 'function'].includes(typeof obj) || obj === null) return false;// 非有效对象\函数

  // tag 访问对象的原型 可以用这个奥
  let proto = Object.getPrototypeOf(obj);

  while (proto !== null) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}


// 手写Object.create
function myObjectCreate(src) {
  if (!['object', 'function'].includes(typeof src)) {
    throw new Error('Type Error')
  }
  const newObj = {}
  // 注意 setPrototypeOf第二个参数 直接传目标对象，而不是其原型
  Object.setPrototypeOf(newObj, src);
  return newObj
}

// 参考 有点意思
function createObject(prototype) {
  function Temp() { } // 创建一个空的构造函数

  Temp.prototype = prototype; // 将原型对象赋值给构造函数的原型

  return new Temp(); // 使用构造函数创建一个新对象
}


// 对象扁平化
function flatObj2(obj, prefix = '', newObj = {}) {
  for (let k in obj) {
    const newkey = prefix + (Array.isArray(obj) ? `[${k}]` : ((prefix ? '.' : '') + `${k}`))
    const value = obj[k]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        flatObj2(value, newkey, newObj)
      } else {
        flatObj2(value, newkey, newObj)
      }
    } else {
      newObj[newkey] = value
    }
  }
  return newObj
}

//cankao
const flattern = (obj) => {
  const res = {};

  const dfs = (curr, path) => {
    if (typeof curr === 'object' && curr !== null) {
      const isArray = Array.isArray(curr);
      for (let key in curr) {
        const newPath = path ? isArray ? `${path}[${key}]` : `${path}.${key}` : key;
        dfs(curr[key], newPath);
      }
    } else {
      res[path] = curr
    }
  }
  dfs(obj);
  return res;
}


//大厂面试每日一题
// https://q.shanyue.tech/roadmap/code#sleepdelay-


// 数组扁平化
function arrFlat(arr) {
  arr.reduce((res, cur) => {
    return res.concat(Array.isArray(cur) ? arrFlat(cur) : cur)
  }, [])
}
// 参考 注意有第二参数depth
function flatten(list, depth = 1) {
  if (depth === 0) return list
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b, depth - 1) : b), [])
}



// 实现异步缓冲队列
function asyncQueue(fn, limit) {
  const tasks = [];
  let runTaskNum = 0;

  function runTask({ id, resolve }) {
    runTaskNum++;
    fn(id).then(res => {
      resolve(res);
      runTaskNum--;
      if (tasks.length > 0) {
        const next = tasks.shift();
        runTask(next);
      }
    });
  }

  return (id) => {
    return new Promise(resolve => {
      if (runTaskNum < limit) {
        runTask({ id, resolve });
      } else {
        tasks.push({ id, resolve });
      }
    });
  };
}

// 示例异步函数
const asyncTask = (id) => new Promise((resolve) => {
  setTimeout(() => {
    console.log(`Task ${id} completed`);
    resolve(`Result of task ${id}`);
  }, 1000);
});

// 创建一个带有并发限制的异步队列
const limitedQueue = asyncQueue(asyncTask, 2);

// 添加任务到队列
limitedQueue(1).then(console.log);
limitedQueue(2).then(console.log);
limitedQueue(3).then(console.log);
limitedQueue(4).then(console.log);
limitedQueue(5).then(console.log);


class AsyncQueue {
  constructor(limit) {
    this.limit = limit;
    this.tasks = [];
    this.runTaskNum = 0;
  }

  runTask(fn, resolve) {
    this.runTaskNum++;
    Promise.resolve(fn()).then(res => {
      resolve(res);
      this.runTaskNum--;
      if (this.tasks.length) {
        const next = this.tasks.shift();
        this.runTask(next.fn, next.resolve);
      }
    });
  }

  addTask(fn) {
    return new Promise(resolve => {
      if (this.runTaskNum < this.limit) {
        this.runTask(fn, resolve);
      } else {
        this.tasks.push({ fn, resolve });
      }
    });
  }
}


class PriorityScheduler {
  constructor(limit) {
    // 初始化代码
    this.limit = limit;
    this.tasks = [];
    this.runTaskNum = 0;
  }

  // 添加任务到调度器
  add(task, priority) {
    // 实现代码
    return new Promise(resolve => {
      this.tasks.push({ task, priority, resolve });
    });
  }

  // 运行任务
  run() {
    const runtask = () => {
      // 实现代码
      const { task, resolve } = this.tasks.pop()
      this.runTaskNum++;
      Promise.resolve(task()).then(res => {
        resolve(res);
        this.runTaskNum--;
        if (this.tasks.length) {
          runTask()
        }
      });
    }

    this.tasks.sort((a, b) => a.priority - b.priority)
    for (let i = 0; i < this.limit && i < this.tasks.length; i++) {
      runtask()
    }
  }
}


// ：实现一个函数来查找数组中的所有重复元素
function findDuplicates(arr) {
  const set = new Set()
  const res = new Set()
  arr.forEach(item => {
    if (set.has(item)) {
      res.add(item)
    } else {
      set.add(item)
    }
  })
  return Array.from(res)
}


function batchProcessTasks(tasks, size) {
  const result = []
  let i = 0
  return new Promise((resolve) => {
    function runBatchTask() {
      if (i < tasks.length) {
        console.log(i)
        const nextBatch = tasks.slice(i, i + size)
        i = i + size
        Promise.all(nextBatch.map(fn => Promise.resolve(fn()))).then(res => {
          result.push(res)
          runBatchTask()
        })
      } else {
        resolve(result)
      }
    }
    runBatchTask()
  })
}


class AsyncScheduler {
  constructor(limit) {
    this.limit = limit
    this.curRunning = 0
    this.tasks = []
  }

  runTask({ fn, resolve }) {
    this.curRunning++
    Promise.resolve(fn()).then(res => {
      resolve(res)
      this.curRunning--
      if (this.tasks.length) {
        const next = this.tasks.shift()
        this.runTask(next)
      }
    })
  }
  add(fn) {
    return new Promise(resolve => {
      if (this.curRunning < this.limit) {
        this.runTask({ fn, resolve })
      } else {
        this.tasks.push({ fn, resolve })
      }
    })
  }
}


function lengthOfLongestSubstring(str) {
  let left = 0, right = 0
  let longest = 0
  const map = new Map()
  for (right = 0; right < str.length; right++) {
    if (map.has(str[right])) {
      left = map.get(str[right]) + 1
    }
    map.set(str[right], right)
    longest = Math.max(right - left + 1, longest)

  }
  return longest
}



class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance
    }
    Singleton.instance = this
  }
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }
}

