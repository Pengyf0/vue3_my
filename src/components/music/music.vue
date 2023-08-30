<template>
  <div class="myMusic">
    <div class="item" v-for="item in mp3" :key="item.id">
      <audio class="audio" :src="audiourl" ref="audio" controls="controls" loop>
        您的浏览器不支持html5的audio标签
      </audio>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import music1 from './mp3/thz.mp3'

const audiourl = ref(music1)
const mp3 = ref([
  { id: 0, name: '万疆' },
])



</script>

<style lang="scss" scoped>
.item {
  box-sizing: border-box;

  .audio {
    width: 260px;
  }
}
</style>