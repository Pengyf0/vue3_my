import { fileURLToPath, URL } from 'node:url'

// 常用插件
// vitejs-lpugin-leagacy 兼容老版本浏览器不支持module
// unplugin-vue-components 
// unplugin-auto-import  自动引入组件
// vite-plugin-compression 压缩代码
// vite-plugin-imagemin 压缩图片

//vue插件注册
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//压缩js css代码
import viteCompression from 'vite-plugin-compression';

//打包文件分析
import { visualizer } from 'rollup-plugin-visualizer'
//针对element包大小做的变化，按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path';

//自动添加前缀,postcss 自带
// import autoprefixer from "autoprefix"
//import cssnano from "cssnano"

const os = require('os')//配置局域网地址
function getLocalIP() {
  let interfaces = os.networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
const ip = getLocalIP()

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/pyfapp/',//默认地址,/斜杠开头
  //root:'/',//html所在文件目录
  // publicDir:"./public",//静态资源目录
  esbuild: {//配置jsx支持
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import {h} from 'vue'"
  },
  server: {
    host: "0.0.0.0",
    // port:5173,
    // proxy:{
    //   "/api":{
    //     target:'http://baidu.com',
    //     rewrite:(path)=>{//路径重写
    //       return path.replace(/^\/api/,"xxx")
    //     }
    //   }
    // },
    // headers:{}
    port: 5173,
    proxy: {
      "/api": {
        target: 'http://localhost:3000/api',
        rewrite: (path) => {//路径重写
          return path.replace(/^\/api/, "")
        }
      }
    },
  },
  build: {//只针对打包，其他的在开发和
    rollupOptions: {
      // input:"./index.html",默认打包入口
      output: {
        entryFileNames: 'js/[name]-[hash].js',//入口打包名称
        chunkFileNames: 'js/[name]-[hash].chunk.js',//打包的chunk名称运行文件，
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      }
    },
    assetsInlineLimit: 20000,//小于20Kb转化为base64，
  },
  plugins: [
    vue(),
    // viteCompression(//大于30K B的压缩,需要后台配置不然压缩文件无法找到了。
    //   {
    //     algorithm: 'gzip',//指定打包方式为gzip
    //     threshold: 30720,//大于30KB的压缩
    //     verbose: false,//不在浏览器显示
    //     deleteOriginFile: true,//打包后删除原文件
    //     minRatio: 0.8 // 压缩率小于0.8才会压缩
    //   }
    // ),
    visualizer({ open: true }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    //autoprefixer()
    //cssnano()
  ],
  resolve: {//路径省略简便别名设置，
    extensions: ['.js', '.css'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      cesium: resolve(__dirname, 'node_modules/cesium')
    }
  },
  define: {//配置默认全局参数
    LAST_UPDATE_TIME: JSON.stringify((new Date).toLocaleString()),
    LOCAL_IP: JSON.stringify(ip),
    GLOBAL_VAR: { test: 'i am global var from vite.config.js define' },
  }
})
