//第一种原生的ajax
let xhr = new XMLHttpRequest();

// xhr.open('GET', '/api/orders');
// xhr.send()
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     console.log(JSON.parse(xhr.responseText))
//   }
// }
xhr.open('POST', '/api/orders');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send('name=lisi&age=18')
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText))
  }
}

//第二种原生函数
import axios from 'axios';
(async () => {

  let ins = axios.create({
    baseURL: "http://localhost:3000/api"
  })
  ins.interceptors.request.use(config => {
    console.log('发送请求');
    return config
  })
  ins.interceptors.response.use(config => {
    console.log('接受请求');
    return config
  })

  //get post  区别在参数。get params
  const res = await ins.get('/api/tes2', {
    params: {
      name: 'lisi',
      age: 18
    }
  })
  const res2 = await ins.post('/api/postName', {
    name: 'lisi',
    age: 18
  })
})()

//第三种 fetch
fetch('http://localhost:3000/api/tes2').then(res => {
  if (res.ok) {
    return res.json()
  }
}).then(data => {
  console.log(date);
})
