import {defineConfig} from 'vite'
import {join} from 'path'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation' // 引入 vite-plugin-federation

function resolve(dir) {
  return join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(), // 入口主文件项目的 index.html 当前路径开始
  // 配置服务器
  server: {
    https: false,
    cors: true, // 默认启用并允许任何源
    host: true,  // 在 dev 场景下尽量显示声明 ip、port，防止`vite`启动时ip、port自动获取机制导致不准确的问题
    port: 5001, // 端口, APP1的端口设为5001, APP2的端口设为5002
  },
  // 打包配置
  build: {
    // assetsInlineLimit: 40960, // 40kb
    // outDir: 'dist', // 指定输出路径(相对于项目根目录)
    // assetsDir: 'assets', // 指定生成静态资源的存放路径(相对于build.outDir)
    polyfillModulePreload: false,
    assetsInlineLimit: 40960,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  },
    // 插件配置
    plugins: [
      react(),
      federation({
        name: 'app1', // 远程模块名称，一个服务既可以作为本地模块使用远程模块组件，可以作为远程模块，对外提供组件
        filename: 'app1.js', // 远程模块入口文件，与本地模块中`remotes`配置相对应
        remotes: {
          app2: 'http://localhost:4174/assets/app2.js', // 远程模块入口文件的网络地址，用于获取远程模块的`remoteEntry.js`来加载组件
        },
        shared: [], // 远程模块组件使用的第三方依赖，如果本地有可以优先使用本地；在 dev 模式下尽量在本地引用这些第三方依赖，防止第三方组件在 dev 和打包模式下不同导致的问题。
      }),
    ],  
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
})
