<template>
  <div class="tables">

    <div class="table">
      <el-card>
        <div slot="header" class="clearfix">
          <span>表格</span>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="水果" width="180">
          </el-table-column>
          <el-table-column prop="price" label="价格">
          </el-table-column>
          <el-table-column prop="num" label="数量">
            <template #default="scope">
              {{ scope.row.num }}
              <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">+</el-button>
            </template>
          </el-table-column>
          <el-table-column label="总价">
            <template #default="scope">
              <div>
                {{ computedPrice(scope.row) }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <div class="table">
      大量数据优化{{ addCount }}
      vue2
      <br>
      Object.freeze();
      will-change:auto;
      list.length={{ arrtList.length }}
    </div>


    <div class="table" v-loading="showLoading" element-loading-text="数据加载中...">
      <p>
        显示/隐藏 table：
        <el-switch :model-value="showTable" @click="switchTableShow"></el-switch>
        {{ arrtList.length }}
      </p>
      <div v-if="showTable">
        <div v-for="(item, index) of arrtList" :key="index">
          {{ item }}{{ index }}
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onBeforeUnmount, computed } from "vue";
import { useComputed } from "../../utils/myHooks/useComputed";


let showLoading = ref(false);
let showTable = ref(false);
let timer = null;
let tableData = ref([
  { name: '梨', price: '100', num: 1, },
  { name: '苹果', price: '200', num: 1, },
  { name: '西瓜', price: '200', num: 1, },
  { name: '梨1', price: '110', num: 1, },
  { name: '苹果1', price: '220', num: 1, },
  { name: '西瓜1', price: '330', num: 1, },
])
function totalPrice(row) {
  console.log('计算属性')
  return row.price * row.num;
}
const computedPrice = useComputed(totalPrice)


const addCount = ref(0);
const switchTableShow = () => {
  // 先展示 loading
  showLoading.value = true;
  // 200ms 后再修改 table 是否显示，防止和 loading 合并到一个渲染周期，导致 loading 不显示
  setTimeout(() => {
    let startTime = +new Date();
    showTable.value = !showTable.value; // 修改 table 显示，会形成 script 阻塞
    showLoading.value = false; // 这里的 loading 关闭，会在 table 阻塞完成后渲染关闭 dom
    // 创建一个宏任务，等上面阻塞的微任务执行完成后，再显示计算耗时
    setTimeout(() => {
      let endTime = +new Date();
      console.log(`渲染耗时：${(endTime - startTime) / 1000}s`);
      ElMessage.success(`渲染耗时：${(endTime - startTime) / 1000}s`);
    }, 0);
  }, 200);
};
let arrtList = ref([])
function getList() {
  return new Promise(function (resolve, reject) {
    var ajax = new XMLHttpRequest();
    ajax.open('get', 'http://127.0.0.1:5173/api/test2');
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200) {
        // console.log(JSON.parse(ajax.responseText))
        // arrtList.value = JSON.parse(ajax.responseText)
        resolve(JSON.parse(ajax.responseText))
      }
    }
  })
}
getList().then((list) => {
  console.log('获取', list)
  const total = list.length
  const page = 0
  const limit = 2000
  const totalPage = Math.ceil(total / limit)
  // arrtList.value = list
  arrtList.value = Object.freeze(list)
  // const render = (page) => {
  //   if (page >= totalPage) return
  //   timer = setTimeout(() => {
  //     for (let i = page * limit; i < page * limit + limit; i++) {
  //       const item = list[i]
  //       arrtList.value.push(item)
  //     }
  //     console.log('当前', arrtList.value.length)
  //     render(page + 1)
  //   }, 1000)
  // }
  // render(page)
})

function handleAdd(ind, row) {
  row.num += 1
}
onBeforeUnmount(() => {
  clearTimeout(timer)
})
console.log(44, window.performance)
// console.log(window.performance.timing.loadEventEnd - window.performance.timing.navigationStart)



</script>

<style lang="scss">
.plan {
  will-change: transform;
}

.tables {
  padding: 20px;
  display: grid;
  grid-template-columns: 700px 700px;

  gap: 20px;

  .table {
    border: 1px solid #ccc;
    padding: 20px;
    height: 400px;
    overflow: auto;
    will-change: transform;
  }
}
</style>
