<template>
  <div class="wordDance">
    <el-button type="primary" @click="start">点击开始</el-button>
    <p>平生不展凌云志</p>
    <p>空负身长八尺躯</p>
    <p>今日暂且展翼去</p>
    <p>明朝登仙答凤凰</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {

})
function start() {
  let doms = document.querySelectorAll('.wordDance p');
  console.log(doms)
  doms.forEach((item, index) => {
    let delay = index * 1000
    item.style.animationDelay = `${delay}ms`
    item.style.animationName = 'wordAdd'
    item.style.animationDuration = '1s'
    item.style.animationFillMode = 'forwards'
    item.style.animationTimingFunction = 'ease-in-out'
  })
}
</script>

<style lang="scss" scoped>
@keyframes wordAdd {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.wordDance p {
  line-height: 40px;
  opacity: 0;
  // animation: wordAdd 1s ease-in-out forwards;
}
</style>