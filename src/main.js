
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/css/index.css'

import App from './App.vue'
import router from './router'

// import ElementPlus from 'element-plus'//改为按需引入不打包整个体积缩小1/3
// import 'element-plus/dist/index.css'
import echarts from '@/utils/echarts.js'

import * as Cesium from 'cesium';
console.log('3d', Cesium)

window.CESIUM_BASE_URL = '/node_modules/cesium/Build/Cesium/';

let tabCount = 1
localStorage.setItem('44', tabCount)
document.addEventListener('onload', () => {
  tabCount++
  alert('当前网站—+111')
  console.log('增加', tabCount)
})
// document.addEventListener('onunload', () => {
//   tabCount--
//   console.log('关闭', tabCount)
//   if (tabCount === 0) {
//     // 清空登录信息
//     alert('当前网站无多余')
//   }
// })

const pinia = createPinia();
const app = createApp(App)

app.use(router).provide('echarts', echarts);
// app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.use(createPinia());
app.mount('#app')
