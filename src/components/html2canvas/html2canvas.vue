<template>
  <div class="html2canvas" ref="cards">
    <button @click="save">保存当前tab</button>
    <button @click="del">删除图片</button>
    <button @click="changeImg">更改图片</button>
    <div class="img">
      <img :src="imgRef" alt="" style="height: 100%;width:100%">
    </div>
    <div v-if="imgRef2">
      <img :src="imgRef2" alt="" style="height: 100%;width:100%">
    </div>

  </div>
</template>

<script setup>
import html2canvas from 'html2canvas';
import { ref } from 'vue';
import bg6 from '@/assets/images/bg6.jpeg'
import bg7 from '@/assets/images/bg7.jpeg'


let imgRef = ref('');
let imgRef2 = ref('');
let cards = ref(null);
imgRef.value = bg6;

function save() {
  console.log(111, cards.value)
  html2canvas(cards.value, {
    width: cards.value.offsetWidth,
    height: cards.value.offsetHeight
  }).then(res => {
    imgRef2.value = res.toDataURL('image/png', 1)
  })
}
function del() {
  imgRef2.value = ''
}
function changeImg() {
  imgRef.value = bg6 == imgRef.value ? bg7 : bg6
}


</script>

<style lang="scss" scoped>
.html2canvas {
  background: skyblue;

  .img {
    height: 100px;
    width: 260px;
    ;
  }
}
</style>