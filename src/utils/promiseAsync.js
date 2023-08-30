//promise

import { throwError } from "element-plus/es/utils";

//async,按运行顺序，执行。如果多个并列的话，按所有累加时间的结束执行。
//返回一个promise对象。

//module

// promise解决异步回调地狱，把所有的异步拉到同一个层级。链式调用

const myp1 = new Promise((resolve, reject) => {
  console.log(111);
  resolve('1成功')
})
const myp2 = new Promise((resolve, reject) => {
  console.log(222);
  resolve('2成功')
})
myp1.then(data => {
  console.log('then', data);
  return myp2//通过返回一个promise来
}, err => {
  throwError('任务1失败')
}).then(msg => {
  console.log('then', msg);
}).catch()
console.log('利用类似同步的方式去调用异步方法');

//async，基于promise，async 声明的函数返回一个 Promise 对象，通过在函数前加上 async 关键字,使得函数体本身成为一个 Promise 对象
function myPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('我完成了')
    }, 1000);
  })
}
function myPromise2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('我完成了2')
    }, 2000);
  })
}

async function main() {
  console.log(11);
  let p = await myPromise()
  let p2 = await myPromise2()
  console.log(p2)
  console.log(p)
  console.log(333);
}
// main()

//module：ESM（浏览器） commonjs(node)
//ESM 最终会编译为 ES6 的 import 和 export
//ESM 是延迟执行,只在第一次导入时执行一次
//ESM较新，<srcipt type="module"></srcipt>
// 更适合静态分析,方便编译优化依赖分析。
// 支持动态绑定,导入模块时可以绑定到任意名称。
// 支持循环依赖,ESM 模块在编译优化时会生成一个占位符,在执行时再执行模块代码,绕开循环依赖

//CommonJS 最终会编译为定义 global 对象的代码，使用require module.exports