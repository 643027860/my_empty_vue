import Vue from 'vue'
import ElementUI from 'element-ui'
import $ from 'jquery'

import App from './App'
import router from './router'
import store from './store'

import store1 from 'store'

//组件库
import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

//ueditor
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

import './api/my-ajax'

Vue.use(ElementUI)

var vm= new Vue({
  el:'#app',
  render:h=>h(App),
  router,
  store
})

// 路由守卫
router.beforeEach((to,from,next)=>{

  let flag = store1.get('flag')

  if(to.meta.requireAuth == true){ // 需要登录权限进入的路由
    if(!flag){                   // 获取不到登录信息
      vm.$message({
        message:'请先登录',
        type:'warning',
        duration:2000
      })
      next({
        name: 'login'
      })
    }else{                       // 获取到登录信息，进行下一步
      return next();
    }
  }else{                           // 不需要登录权限的路由直接进行下一步
    return next();
  }
})
