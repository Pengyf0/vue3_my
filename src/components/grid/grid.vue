<template>
  <div class="grid">
    <div class="container">
      <div class="box" style="--clr:#0f0"></div>
      <div class="box" style="--clr:#ff0"></div>
      <div class="box" style="--clr:#f00"></div>
      <div class="box" style="--clr:#f0f"></div>
      <div class="box" style="--clr:#0ff"></div>
      <div class="box" style="--clr:#0f0"></div>
      <div class="box" style="--clr:#ff0"></div>
      <div class="box" style="--clr:#f00"></div>
      <div class="box" style="--clr:#f0f"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  let doms = document.querySelectorAll('.box')
  
  doms.forEach(dom => {
    dom.style.setProperty('--x', 0)
    dom.style.setProperty('--y', 0)
    dom.onmousemove = (e) => {
      let x = e.pageX - dom.offsetLeft;//e.pageX,鼠标距离左右的距离
      let y = e.pageY - dom.offsetTop+2258;//dom.offsetTop,当前div 距离文档顶部距离
      dom.style.setProperty('--x', x + 'px')
      dom.style.setProperty('--y', y/2 - 70 + 'px')
    }

  })

})

</script>

<style lang="scss" scoped>
.grid {
  background: #000;
  .container {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    grid-gap: 4px;

    .box {
      position: relative;
      height: 80px;
      width: 80px;
      background: rgba(45, 45, 45, 1);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        position: absolute;
        left: var(--x);
        top: var(--y);
        // top:80px;
        transform: translate(-50%, -50%);
        background: radial-gradient(var(--clr), transparent, transparent);
        width: 160px;
        height: 160px;
        transition: 0.5s, top .1s, left .1s;
        ;
      }

      &::after {
        content: '';
        position: absolute;
        inset: 2px;
        background: rgba(45, 45, 45, .8);
      }

    }
  }
}
</style>