<template >
  <div class="upload">
    <input ref="ipt" type="file" name="file" @change="fileChange">
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import axios from "axios"

function fileChange(e) {
  let file = e.target.files[0]
  file.text().then(text => {
    console.log(111, text)
    let _sliceBlob = new Blob([text]).slice(0, 5000);
    let _sliceFlie = new File([_sliceBlob], 'test.png')//两个参数
    console.log('blob', _sliceBlob)
    console.log('file', _sliceFlie)
  })
  //文件类型可以在file和blob之间互相转化
  //   let _sliceBlob = new Blob([file]).slice(0, 5000);
  //   let _sliceFlie = new File([_sliceBlob], 'test.png')//两个参数
  //   console.log('blob', _sliceBlob)
  //   console.log('file', _sliceFlie)
  // 
  //   let fr = new FileReader();//异步文件读取，
  //   fr.readAsDataURL(_sliceFlie);//readAsText转化成文字或者base64，参数为文件或者blob
  //   fr.onload = function () {
  //     console.log('base64', fr.result)
  //   }
  //   upload(file)
}

function upload(file, onProgress, onFinish) {
  console.log(file);
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = () => {
  //     const res = JSON.parse(xhr.responseText)
  //     console.log(res)
  //   }
  //   xhr.open('POST', 'http://localhost:3000/upload/img')
  // 
  //   xhr.send(_form)
  const _form = new FormData();
  _form.append('file', file)
  _form.append('age', 111)
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

<style>
.upload {
  height: 200px;
  width: 300px;
  border: 1px dashed #ccc;

}
</style>