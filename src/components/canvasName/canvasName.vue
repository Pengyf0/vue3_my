
<template>
  <div class="canvas">
    <canvas height="145" width="260" id="write" ref="canvas"></canvas>
    <div class="btns">
      <el-button size="small" type="primary" @click="back"> 撤回 </el-button>
      <el-button size="small" type="primary" @click="noback"> 取消撤回 </el-button>
      <el-button size="small" type="primary" @click="reset"> 清空 </el-button>
      <el-button size="small" type="primary" @click="download"> 下载 </el-button>
    </div>
    <p style="line-height:2">
      手机网站打开无法使用哟～
    </p>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

defineProps({
  msg: String,
});

const addCount = ref(0);

let isDraw = ref(false);

let canvas = ref(null)//默认绑定的dom
let ctx = null;//获取元素
let status = [];//状态列表
let statusInd = 0;//当前状态
onMounted(() => {
  init(canvas.value)
})

function init(canvas) {
  if (canvas.getContext) {
    ctx = canvas.getContext('2d')
    // ctx.beginPath()

    //绘制两个背景图图形

    //按下时候开始绘画
    canvas.onmousedown = (e) => {
      isDraw.value = true;
      draw(e.offsetX, e.offsetY)
    }
    function toline(e) {
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
    }
    // let enable = true
    //监听移动事件
    canvas.addEventListener('mousemove', (e) => {
      if (isDraw.value) {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
      }
      // if (enable) {
      //   enable = false
      //   requestAnimationFrame(toline.bind(null, e))
      //   setTimeout(() => enable = true, 50)
      // }
    })
    //鼠标抬起结束绘画
    canvas.onmouseup = () => {
      isDraw.value = false;
      ctx.closePath()
      addStatus()
    }
  }
}
function draw(x, y) {//开始作画
  ctx.beginPath();//必须要加不然会有重影
  ctx.strokeStyle = "red"
  ctx.lineWidth = 3;
  ctx.moveTo(x, y)
}
function addStatus() {//画一次添加记录
  let img = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height);
  status.push(img);

  statusInd++
  console.log(22, statusInd);
}
function back() {//撤回
  statusInd--
  console.log(statusInd)
  if (!!statusInd) {
    let ImageData = status[statusInd - 1]
    ctx.putImageData(ImageData, 0, 0)
  }
}
function noback() {//取消撤回
  let len = status.length;
  if (statusInd < len + 1) {
    statusInd++
  }
  if (statusInd < len) {
    let img = status[statusInd]
    ctx.putImageData(img, 0, 0)
  }

}
function reset() {//重置
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
}
function download() {
  //导出图片
  let imgUrl = canvas.value.toDataURL("image/png")
  let img = document.createElement('a');

  img.href = imgUrl
  // 下载的文件名字
  img.download = `urname.jpg`;
  document.body.appendChild(img);
  img.click();
  document.body.removeChild(img);

}





</script>

<style lang="scss" scoped>
#write {
  border: 1px solid #f2f2f2;
  margin-bottom: 10px
}
</style>

