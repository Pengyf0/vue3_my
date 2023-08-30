<template>
  <div class="Img2x3x">
    <div></div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@mixin bg-image($url) {
  background-image: url($url+'@2x.png');
  background-size: 100% 100%;

  @media (-webkit-min-device-pixel-radio:3),
  (min-resolution: 288dpi) {
    background-image: url($url+'@3x.png');
    background-size: 100% 100%;
  }
}

.Img2x3x {
  height: 26px;
  width: 26px;
  @include bg-image('@/assets/icon/tips')
}
</style>