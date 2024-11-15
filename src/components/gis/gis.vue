<template>
  <div>
    <div id="map" ref="map"></div>
    <div id="navigate-container">
      <input type="button" @click="moveToLeft" value="左移" />
      <input type="button" @click="moveToRight" value="右移" />
      <input type="button" @click="moveToUp" value="上移" />
      <input type="button" @click="moveToDown();" value="下移" />
      <input type="button" @click="moveToshilong();" value="移动到石龙" />
      <input type="button" @click="zoomIn();" value="放大" />
      <input type="button" @click="zoomOut();" value="缩小" />
      <input type="button" @click="apply3D(true);" value="3D" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Control from 'ol/control/Control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ.js';
//自定义控件
import { FullScreen, MousePosition, ScaleLine } from 'ol/control'
// FullScreen全屏, MousePosition鼠标位置, ScaleLine200m,500m,1Km 间距单位
// 3d
// import OLCesium from 'ol-cesium';
// import 'cesium/Build/Cesium/Widgets/widgets.css';
//默认背景图
import ImageLayer from 'ol/layer/Image';
import ImageStatic from 'ol/source/ImageStatic';
import { getCenter } from 'ol/extent';


onMounted(() => {
  initMap()
  //地图点击事件  
  map.value.on('click', function (evt) {
    var coordinate = evt.coordinate;
    console.log(coordinate, evt);
  });
})
const map = ref(null);
function initMap() {
  const extent = [0, 0, 1970, 700]
  let options = {
    // 指定容器
    target: 'map',
    // 配置地图视图属性
    view: new View({
      //默认的投影是Web Mercator (EPSG:3857)， 指定投影坐标系为“EPSG:4326”，以实际情况为准，公司默认使用4326投影坐标系
      projection: 'EPSG:4326',//wgs84投影,经度纬度为坐标系
      // extent: [113, 23, 114, 23.5],//指定中心范围
      //extent参数类型为[minX, minY, maxX, maxY]
      center: [113.86830067139676, 23.103050667184637],
      // 地图默认加载时的缩放比例
      // zoom: 14.6,
      zoom: 15,
    }),
    // 地图加载时，默认加载的图层
    layers: [
      new ImageLayer({
        source: new ImageStatic({
          url: 'http://localhost:5173/src/assets/images/loginbg.jpeg', // URL to your static image
          imageExtent: extent,
        }),

      }),
      new TileLayer({
        source: new OSM(),
        // source: new XYZ({
        //   url:
        //     'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
        //     '?apikey=Your API key from https://www.thunderforest.com/docs/apikeys/ here',
        // }),
        opacity: 1,
      }),
    ],
    // // OpenLayer自动的地图工具，置为空数组时默认不显示
    controls: []
    // controls: [new FullScreen()]//
    // logo: { src: '../../assets/icon/tips.png' },//没用
  }

  map.value = new Map(options);
  const customAttribution = new Control({
    element: document.createElement('div'),
    target: document.createElement('div')
  });
  customAttribution.element.className = 'custom-attribution ol-unselectable ol-control';
  customAttribution.element.innerHTML = 'Custom Map Information © Your Company';
  map.value.addControl(customAttribution)
}


// 启用立体效果
function apply3D(enabled) {
  var view = map.value.getView();
  console.log('33d', view.getResolution(), view.getResolutions())
  // return
  // if (enabled) {
  //   view.setResolution(view.getResolution() - 0.01); // 减小分辨率实现立体效果
  // } else {
  //   view.setResolution(view.getResolution() + 0.01); // 恢复正常分辨率
  // }
}

// 向左移动地图
function moveToLeft() {
  var view = map.value.getView();
  var mapCenter = view.getCenter();
  mapCenter[0] += 0.1;
  view.setCenter(mapCenter);
  map.value.render();
}
// 向右移动地图
function moveToRight() {
  var view = map.value.getView();
  var mapCenter = view.getCenter();
  mapCenter[0] -= 0.1;
  view.setCenter(mapCenter);
  map.value.render();
}

// 向上移动地图
function moveToUp() {
  var view = map.value.getView();
  var mapCenter = view.getCenter();
  mapCenter[1] -= .1;
  view.setCenter(mapCenter);
  map.value.render();
}

// 向下移动地图
function moveToDown() {
  var view = map.value.getView();
  var mapCenter = view.getCenter();
  mapCenter[1] += .1;
  view.setCenter(mapCenter);
  map.value.render();
}

// 移动到石龙
function moveToshilong() {
  var view = map.value.getView();
  view.animate({
    center: [113.86830067139676, 23.103050667184637],
    zoom: 15,
    duration: 2000,
  })
  // view.setCenter([113.86830067139676, 23.103050667184637]);
  // // view.fit([113.86830067139676, 23.103050667184637, 103.92, 23.203050667184637], map.value.getSize());
  // map.value.render();
}

// 放大地图
function zoomIn() {
  var view = map.value.getView();
  view.setZoom(view.getZoom() + 1);
}

// 缩小地图
function zoomOut() {
  var view = map.value.getView();
  view.setZoom(view.getZoom() - 1);
}

</script>

<style lang="scss" scoped>
#map {
  height: 700px;
  width: 100%;
}
</style>