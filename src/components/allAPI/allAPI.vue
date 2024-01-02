<template>
  <div>
    <button @click="startFetch">开始发送请求</button>
  </div>
</template>

<script setup>
import { myRquest } from '@/utils/myHooks/my5api.js'
let list = [
  '/api/user', '/api/orders', '/api/test', '/api/test2', '/api/order',
  '/api/user', '/api/orders', '/api/test', '/api/test2', '/api/order'
]

function startFetch() {
  myRquest(list, 3).then(res => {
    console.log('返回结果',res)
  })
}

</script>

<style lang="scss" scoped></style>