 
<template>
  <div class="unload">
    <input ref="ipt" type="file" name="file" @change="fileChange">
    <br>
    <div class="btn2">
      <button class="btnPrimary2 btnPrimary" @click="toUpload($event)">
        上传文件
      </button>
    </div>
    <div style="height:240px;overflow-y: auto;overflow-x: hidden;">
      <img :src="chooseImg" alt="" style="width: 260px;">
    </div>

  </div>
</template>
<script setup>
import { ref, nextTick } from "vue";
//file blob  无法直接传递，必须搭载formData,或者转化为base64传递
//formData fileReader
//file=>blob new Blob([file])
import { ElMessage } from 'element-plus'
import axios from 'axios'
let ipt = ref(null)
let chooseImg = ref(null)
let submitFile = ref(null)

function fileChange(e) {
  console.log(e.target.files[0]);
  let file = e.target.files[0]
  submitFile.value = file
  // if (file.size > 5 * 1024 * 1024) {
  //   ElMessage({
  //     message: '文件大小不能超过5M',
  //     type: 'warning',
  //   })
  // }
  // if (file.type !== 'video/mp4') {
  //   ElMessage({
  //     message: '文件必须为mp4视频',
  //     type: 'warning',
  //   })
  // }
  let _blobSlice = new Blob([file]).slice(0, 50000)
  let _fileSlice = new File([_blobSlice], 'test.jpg')
  let fr = new FileReader()
  fr.readAsDataURL(file)//异步事件，base64
  fr.onload = function () {
    chooseImg.value = fr.result;

    // console.log('数据', fr.result)
  }
}

function toUpload() {
  const _form = new FormData();
  _form.append('file', submitFile.value)
  axios.post('http://localhost:3000/upload/img', _form).then(res => {
    console.log('上传', res)
    if (res.status === 200) {
      console.log('上传成功');
    } else {
      console.log('上传失败');
    }
  })
}

</script>

<style lang="scss" scoped>
.btn2 {
  height: 60px;
  display: flex;
  align-items: center;

  .btnPrimary2 {
    color: #fff;
    position: relative;

    cursor: pointer;
    border-radius: 4px;
    border: none;
    outline: none;
    height: 50px;
    width: 100px;
    overflow: hidden;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    background: linear-gradient(90deg, #409eff, #ccc);

    &:hover {
      background: linear-gradient(90deg, #ff40b6ab, #ccc);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -40%;
      width: 15%;
      height: 100%;
      background: linear-gradient(90deg, transparent, #fff, transparent);
      transform: skew(-45deg);
    }

    &:hover::before {
      left: 120%;
      transition: all 1s;
    }
  }

}
</style>

