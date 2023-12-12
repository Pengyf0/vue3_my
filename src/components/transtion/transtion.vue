<template>
  <div style="height: 100%;width:100%;">
    <div @click="nowId = !nowId">click</div>
    <div class="outer">
      <div class="item">0</div>
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item" v-show="nowId == 3">3</div>
    </div>

    <!-- <transition  name="up">
        <div class="item3" v-show="nowId==2" @click="nowId=0">3</div>
    </transition> -->
  </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from "vue";
let nowId = ref(3);
</script>


<style>
.outer {
  height: 300px;
  overflow: auto;
}

.item {
  border: 1px solid red;
  height: 100px;
  width: 100%;
}

/* .up-enter-active {
  transition: all 3.3s ease fordwords;
}
.up-enter {
  transform: translateY(100%);
}
.up-enter-to {
  transform: translateY(-100%);
} */

/* .up-leave-to {
  transform: translateY(100%); 
} */
/* .up-enter{
    transform: translateY(100%);
}
.up-enter-to{
    transform: translateY(0);
}
.up-leave{
    transform: translateY(0);
}
.up-leave-to{
    transform: rotateY(-100%);
} */
</style>
