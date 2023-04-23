const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//严格模式
  runtimeCompiler: true,//运行时编译器
  devServer: {//跨域，如果访问路径开头是/api,就访问target
    proxy: {
      '/api':{
        target:'https://api.qqsuu.cn',
        changeOrigin:true,//可以跨域
        pathRewrite:{
          "^/api":"/api"//替换，用来区分不同的域
        }
      },
      '/v2':{
        target:'https://sex.nyan.xyz/api',
        changeOrigin:true,//可以跨域
        // pathRewrite:{
        //   "^/api2":""
        // }
      },
      '/xiao':{
        target:'https://api.pingcc.cn/',
        changeOrigin:true,//可以跨域
        pathRewrite:{
          "^/xiao":""//替换，用来区分不同的域
        }
      }
    }
  }
})

// const { createProxyMiddleware } = require('http-proxy-middleware')
// module.exports = {
//   devServer: {
//     transpileDependencies: true,
//     lintOnSave:false,//严格模式
//     runtimeCompiler: true,
//     // 配置代理
//     proxy: {
//       '/api': {
//         target: 'https://api.qqsuu.cn/api/', // 目标 API 地址
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': '', // 将 /api 替换为空，即去掉 /api
//         },
//       },
//     }
//   }
// }