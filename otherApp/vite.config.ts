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
    port: 5002, // 端口, APP1的端口设为5001, APP2的端口设为5002
  },
  // 打包配置
  build: {
    // assetsInlineLimit: 40960, // 40kb
    outDir: 'dist', // 指定输出路径(相对于项目根目录)
     assetsDir: 'assets', // 指定生成静态资源的存放路径(相对于build.outDir)
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
      name: 'app2', // 远程模块名称
      filename: 'app2.js', // 远程模块入口文件，与本地模块中`remotes`配置相对应
      exposes: {
        './APP2': './src/App.tsx', // 组件名称及其对应文件
      },
      shared: [] // 对外提供的组件所依赖的第三方依赖
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
})
