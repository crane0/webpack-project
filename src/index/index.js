import helloWebpack from './helloWebpack'
// import commonHello from '../../utils/index'

document.write(helloWebpack())
// commonHello()
const user = {
  name: {
    info: {
      age() {
        return 18
      }
    }
  },
  level: 0
}

const age = user?.name?.info?.age()  // 18
const other = user?.other?.age()  // undefined
const other2 = user?.other?.age?.()  // undefined
console.log(age, other, other2)

// var level = `${user.level}级` ?? '暂无等级'
// var level2 = user.level || '暂无等级'
// var level3 = user?.level ?? '暂无等级'
// console.log(level)
// console.log(level2)
// console.log(level3)

const str = '<div>js</div><div>html</div>'
const reg = /<\w+>(.*?)<\/\w+>/
console.log(str.match(reg))
// const allMatch = str.matchAll(reg)
// // console.log(allMatch)
// for (const a of allMatch) {
//   console.log(a)
// }


// Promise.allSettled([
//   Promise.reject({code: 500, message: '服务异常'}),
//   Promise.resolve({code: 200, list: []}),
//   Promise.resolve({code: 200, message: '成功'}),
// ]).then((result) => {
//   result.forEach((result) => console.log(result))
// }).catch((error) => {
//   console.log(error)
// })

// Promise.all([
//   Promise.reject({ code: 500, message: '服务异常' }),
//   Promise.resolve({ code: 200, list: [] }),
//   Promise.resolve({ code: 200, message: '成功' }),
// ]).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })