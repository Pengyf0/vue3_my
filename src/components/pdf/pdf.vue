<template>
  <div class="pdfShow">
    展示pdf
  </div>
</template>

<script setup>
function initPdf() {
  let url = "http://www.baidu.com"
  let dom = document.querySelector('.pdfShow');
  let html = `<iframe ref="iframe" src="${url}}" style="width:100%;height:100%;autoHeight:true"></iframe>`
  dom.innerHTML = html
}
</script>

<style lang="scss" scoped></style>