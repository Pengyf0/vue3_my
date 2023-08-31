//启动模拟后台多个接口调用
const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('API server started on port 3000');
});
let list = []
let num = 0;
for (let i = 0; i < 10000; i++) {
  num++
  list.push({
    src: 'https://miro.medium.com/fit/c/64/64/1*XYGoKrb1w5zdWZLOIEevZg.png',
    text: `hello world ${num}`,
    tid: num
  })
}
app.get('/api/user', (req, res) => {
  console.log(11, req.route.path);
  res.json({
    name: 'John',
    age: 20
  });
});

// 订单信息  
app.get('/api/orders', (req, res) => {
  console.log(22, req.route.path);
  setTimeout(() => {
    res.json([
      { id: 1, product: 'Phone' },
      { id: 2, product: 'Notebook' }
    ]);
  }, 5000)

});
app.get('/api/test2', (req, res) => {
  console.log(33, req.route.path);
  res.json(list);
})
app.post('/api/postName', (req, res) => {
  console.log(33, req.route.path);
  res.json(list);
})