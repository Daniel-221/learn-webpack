// 作用域输出
var bar = 'window'
function say() {
    var bar  = '111'
    console.log(bar)
    console.log(this.bar)
}
const obj = {
    bar: '222',
    say() {
        console.log(bar)
        console.log(this.bar)
    }
}
say()
obj.say()
obj.say = say
obj.say()



// 111
// window
// undefined❌ window✅
// 222
// 111
// 222





// 异步

async function f1() {
  console.log(1)
}
async function f2() {
  console.log(2)
  await console.log(3)
  // 取消注释后输出顺序又是怎样
  // console.log(5)
}
function f3() {
  console.log(4)
}
f1()
f2()
f3()


//1 2 3 4
//1 2 3 4 5
