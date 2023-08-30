<template>
  <div class="outerId" id="outerId">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
    <div class="item">8</div>
    <div class="item">9</div>
    <div class="item">10</div>
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
    <div class="item">8</div>
    <div class="item">9</div>
    <div class="item">10</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const container = document.getElementById('outerId')
  const items = document.querySelectorAll('#outerId .item')

  // 滚动事件监听
  // 遍历item,计算距离中点距离
  container.addEventListener('scroll', (e) => {
    // 获取滚动距离
    const scrollX = container.scrollLeft
    // 容器宽度一半为中点 
    const midX = container.offsetWidth / 2
    console.log('55', midX);
    // 循环每个 item 
    items.forEach(item => {
      // 获取 item 到中点距离
      const diffX = midX - (item.offsetLeft - scrollX);

      // 计算 scale 比例
      if (diffX > -80 && diffX < 80) {
        console.log(diffX)
        const scale = Math.cos(diffX / midX * Math.PI) * 0.5 + 1
        // 设置 transform 
        item.style.transform = `scaleY(${scale})`
      } else {
        item.style.transform = `scaleY(1)`
      }
    })
    e.stopPropagation()
  })
})



</script>

<style lang="scss" scoped>
.outerId {
  width: 250px;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid #d2d2d2;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  // overflow-y: hidden;
  position: relative;

  .item {
    flex: none;
    height: 50px;
    width: 20px;
    margin-right: 10px;
    border-radius: 3px;
    border: 1px solid #d2d2d2;

    &:hover {
      box-shadow: 3px 3px 3px 3px #000;
    }
  }

  .item:nth-of-type(3) {
    transform: scale(1, 2)
  }
}
</style>