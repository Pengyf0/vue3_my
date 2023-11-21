<template>
   <div style="height: 100%;width:100%;">
    <div @click="nowId=!nowId">click</div>
    <transition name="up">
        <div class="item1" v-show="nowId" >1</div>
    </transition>
    <!-- <transition  name="up">
        <div class="item2" v-show="nowId==1" @click="nowId=2">2</div>
    </transition> -->
    <!-- <transition  name="up">
        <div class="item3" v-show="nowId==2" @click="nowId=0">3</div>
    </transition> -->
   </div>
</template>

<script setup>
import { onMounted, nextTick, ref } from "vue";
let nowId = ref(0);
</script>


<style>
.item1,.item2,.item3{
  border:1px solid red;
 height: 300px;
 width:100%;
}
.up-enter-active {
  transition: all 3.3s ease;
}
.up-enter {
  transform: translateY(100%);
}
.up-enter-to {
  transform: translateY(-100%);
}

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
