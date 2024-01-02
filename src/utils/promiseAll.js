//定义接口数组
const apiList = [
  fetch('/api1'),
  fetch('/api2'),
  fetch('/api3')
];

//启动进度条
startProgress();

Promise.all(apiList).then(res => {
  //所有接口调用完毕
  stopProgress();
})
  .catch(err => {
    //调用出错
    stopProgress();
  });
//进度条函数
function startProgress() {
  //显示进度条
  console.log('Progress started');
}

function stopProgress() {
  //隐藏进度条
  console.log('Progress stopped');
}