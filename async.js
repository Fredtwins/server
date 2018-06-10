// 1. callback

// function ajax (callback) {
//   setTimeout(() => {
//     callback()
//   }, 1000)
// }

// // 回调地狱
// ajax(() => {
//   console.log(1)
//   ajax(() => {
//     console.log(2)
//     ajax(() => {
//       console.log(3)
//     })
//   })
// })

// 2. promise axios

// function ajax (str) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(str)
//     }, 1000)
//   })
// }

// ajax(1)
//   .then(res => {
//     console.log(res)
//     return ajax(2)
//   })
//   .then(res => {
//     console.log(res)
//     return ajax(3)
//   })
//   .then(res => {
//     console.log(res)
//   })

// 3. async await

function ajax (str) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(str)
    }, 1000)
  })
}

async function start () {
  const a = await ajax(1)
  console.log(a)
  const b = await ajax(2)
  console.log(b)
  const c = await ajax(3)
  console.log(c)
}

start()