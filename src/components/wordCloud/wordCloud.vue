<template>
  <div>
    <div class="wordCloud"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
const text = "Hello world! This is a test text for generating a word cloud. a ha is Let's see if it works!";

// 将文本拆分为单词数组
const words = text.toLowerCase().split(" ");

// 存储词频的对象
const wordFreq = {};

for (const word of words) {
  if (wordFreq[word]) {
    wordFreq[word]++
  } else {
    wordFreq[word] = 1
  }
}
// 按照词频从高到低排序
const sortedWordFreq = Object.keys(wordFreq).sort((a, b) => wordFreq[b] - wordFreq[a]);

// 创建画布和上下文
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

// 设置画布大小
canvas.width = 240;
canvas.height = 300;

let placedTexts = [];
// 在画布上绘制每个单词


function getNewPosition(x, y, width, height) {
  // if (placedTexts.length > 0) {
  //   for (let block of placedTexts) {
  //     if (x < block.x || x + width > block.x + block.width ||
  //       y < block.y || y + height > block.y + block.height) {
  //       // 重叠,重新生成
  //     }
  //   }
  //  
  // } else {
  //   return false
  // }
  // return { x, y };
  return false
}
function isOut(x, y, textWidth, textHeight) {
  if (x + textWidth / 2 > canvas.width) {
    // 超出右边界
    return true
  }
  if (x - textWidth / 2 < 0) {
    // 超出左边界
    return true
  }
  if (y - textHeight / 2 < 0) {
    // 超出顶部边界
    return true
  }

  if (y + textHeight / 2 > canvas.height) {
    // 超出底部边界  
    return true
  }
  return false
}


for (let word of sortedWordFreq) {
  let x, y
  const fontSize = Math.max(12, Math.min(100, 80 * (wordFreq[word] / Math.max(...Object.values(wordFreq)))));
  context.font = fontSize + "px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  // 计算文本的宽度和高度
  const textWidth = context.measureText(word).width;
  const textHeight = +context.font.split(' ')[0].replace('px', '');
  //当不超出边界的时候开始绘制
  x = Math.random() * canvas.width;
  y = Math.random() * canvas.height;
  //超出边界和重复都需要重新获取位置信息
  while (isOut(x, y, textWidth, textHeight) || getNewPosition(x, y, textWidth, textHeight)) {
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
  }
  context.fillText(word, x, y);
  // 保存信息
  placedTexts.push({ word, x, y, textWidth, textHeight });

  // console.log('object', x, y, word, context.font, textWidth, textHeight);


}
// 将画布添加到文档中
onMounted(() => {
  document.querySelector('.wordCloud').appendChild(canvas)
})



</script>

<style lang="scss" scoped></style>