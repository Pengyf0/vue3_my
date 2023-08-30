<template>
  <div>
    {{ percent }}
    <div class="progress-bar">
      <div class="progress" :style="{ 'width': percent + '%' }"></div>
    </div>
    <h3>多接口loading</h3>
    <button @click="startLoading2">开始</button> {{ showInt2 }}成功{{ successnum }}失败{{ falidnum }}
    <div class="progress-bar">
      <div class="progress" :style="{ 'width': showInt2 + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'
let props = defineProps({
  'percent': {
    type: Number,
    default: 20
  }
})

let percent2 = ref(0);
let showInt2 = ref(0)
let apiList = [
  'api/user',
  'api/order',
  'api/orders',
  'api/test2',
  'api/user',
  'api/order',
  'api/orders',
  'api/test2',
  'api/user',
  'api/order',
  'api/orders',
  'api/test2',
  'api/user',
  'api/order',
  'api/orders',
  'api/test2',
]
// function startLoading() {
//   axios.get('api/user').then(res => {
//     percent2.value += 5
//     console.log(1, res.data);
//   });
//   axios.get('api/order').then(res => {
//     percent2.value += 5
//     console.log(2, res.data);
//   });
//   axios.get('api/test2').then(res => {
//     percent2.value += 5
//     console.log(3, res.data);
//   });
// }

// 定义一个函数，用于循环调用多个接口，链式调用
async function startLoading() {
  let len = apiList.length
  percent2.value = 0
  for (let i = 0; i < len; i++) {
    // 调用接口，并等待响应
    const response = await fetch(apiList[i]);
    // 处理响应
    if (response.ok) {
      percent2.value += 5
      console.log(`调用 ${apiList[i]} 成功`);
    } else {
      percent2.value += 5
      console.error(`调用 ${apiList[i]} 失败`);
    }
  }
}
let successnum = ref(0);
let falidnum = ref(0);
let len = 0;
let step = 0


function startLoading2() {
  percent2.value = 0//
  showInt2.value = 0
  len = apiList.length;
  step = +(100 / len).toFixed(2)
  const promises = apiList.map(url => callAPI(url));
}
async function callAPI(url) {
  return fetch(url).then(response => {
    if (len > 1) {
      len--;
      percent2.value += step
    } else {
      percent2.value = 100
    }
    successnum.value += 1
    incrementCompare(percent2.value)
    return response.json()
  }).catch(error => {
    falidnum.value += 1
    return false
  });
}
function incrementCompare(value) {
  function increase() {
    setTimeout(() => {
      showInt2.value += 1;
      if (showInt2.value < value) {
        increase();
      }
    }, 200)
  }
  increase();
}
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  // width: 40px;
  background-color: #4caf50;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
}

h3 {
  line-height: 60px;
}
</style>