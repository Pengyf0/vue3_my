<template>
  <div id="content">
    <div class="item" ref="myItem">
      <div class="cont">春花秋月平潭落叶辱骂于我何加焉 见字如面</div>
      <div class="delete">删除</div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
let myItem = ref(null)
onMounted(() => {
  let startX = 0;
  let dist=0;
  //手机上是touchstart
  myItem.value.addEventListener('mousedown', (e) => {
    dist=0;
    startX = e.clientX;
  });
  //手机上是touchend
  myItem.value.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    dist = startX - x;
  });
  myItem.value.addEventListener('mouseup', (e) => {
    console.log(dist)
    if (dist > 0 && dist > 50) {
      e.currentTarget.classList.add('active');
    } else {
      if(dist<50){
        e.currentTarget.classList.remove('active');
      }
      
    }
  });
})


</script>

<style lang="scss" scoped>
.item {
  position: relative;
  height: 50px;
  width: 100%;
  overflow: hidden;
  border: 1px solid #d2d2d2;

  .cont {
    position: absolute;
    width: 100%;
  }

  .delete {
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 100%;
    line-height: 50px;
    background: red;
    color: #fff;
    text-align: center;
    /* 默认隐藏删除按钮 */
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  &.active {
    .cont {
      width: calc(100%);
      transform: translateX(-100px);
      transition: transform 0.3s ease;
    }

    .delete {
      transform: translateX(0);
      transition: transform 0.3s ease;
    }

  }
}




.swipe-cell {
  overflow: hidden;
  position: relative;
  height: 50px;
  cursor: pointer;
}

.swipe-cell__left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;

  width: 80px;
  background-color: #e54d42;

  transform: translateX(-100%);
  transition: transform .3s;
}

.swipe-cell__right {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
}
</style>