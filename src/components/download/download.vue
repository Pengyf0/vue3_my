<template>
  <div>
    <el-button @click="down()">下载</el-button>
  </div>
</template>

<script setup>

function down() {
  let a = document.createElement('a')
  a.download = 'video1.mp4'
  let blobUrl = window.URL.createObjectURL(new Blob(['https://player.vimeo.com/video/687848517']))
  a.href = blobUrl
  a.click()
  window.URL.revokeObjectURL(blobUrl)
}
</script>

<style lang="scss" scoped></style>