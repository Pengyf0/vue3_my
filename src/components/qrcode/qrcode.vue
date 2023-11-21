<template>
  <div>
    <input v-model="myUrl" type="text" name="" id="">
    <el-button type="primary" size="small" @click="changeUrl">点击转化</el-button>
    <br>

    <div style="height: 50px;">{{ myUrl }}</div>
    <div class="qrClass">
      <canvas ref="mycanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import qrcode from 'qrcode';
import { nextTick, onMounted, ref } from 'vue';
let mycanvas = ref(null);
let myUrl = ref('')
onMounted(() => {
  const cavasdom = document.querySelector('.qrClass')
  console.log(cavasdom.clientWidth, cavasdom.clientHeight, mycanvas.value);
  const text = 'https://example.com';
  // 图标文件路径
  const icon = '../../assets/icon/tips.png';
  // 生成配置
  const options = {
    width: cavasdom.clientWidth,
    height: cavasdom.clientHeight,
    image: {
      src: icon,
      excavate: true // 挖空二维码区域
    }
  }
  // 生成二维码
  qrcode.toCanvas(mycanvas.value, text, options, err => {
    if (err) console.error(err)
  })
})

function changeUrl() {
  const cavasdom = document.querySelector('.qrClass')
  console.log(cavasdom.clientWidth, cavasdom.clientHeight, mycanvas.value);
  const text = 'https://example.com';
  // 图标文件路径
  const icon = '../../assets/icon/tips.png';
  // 生成配置
  const options = {
    width: cavasdom.clientWidth,
    height: cavasdom.clientHeight,
    image: {
      src: icon,
      excavate: true // 挖空二维码区域
    }
  }
  // 生成二维码
  qrcode.toCanvas(mycanvas.value, myUrl.value, options, err => {
    if (err) console.error(err)
  })
}
</script>

<style lang="scss" scoped>
.qrClass {
  height: 200px;
  width: 200px;
}
</style>