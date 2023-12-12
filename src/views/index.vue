
<template>
  <div class="appMain">
    <myHeader></myHeader>
    <myCont></myCont>
  </div>
</template>
<script setup>
import myHeader from "@/components/layout/header.vue";
import myCont from "@/components/layout/midCont.vue";

defineProps({
  msg: String,
});
</script>

