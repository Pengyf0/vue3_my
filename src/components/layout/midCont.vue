
<template>
  <div class="pageMid">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const addCount = ref(0);
</script>

<style lang="scss" scoped>
.pageMid {
  height: calc(100vh - 48px);
    overflow: auto;
}
</style>

