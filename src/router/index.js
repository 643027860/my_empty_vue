import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/home',
      name:'home',
      meta:{requireAuth:true},
      component:resolve => require(['../pages/home/home'],resolve),
      children:[
        {
          path:'apk',
          name:'apk',
          meta:{requireAuth:true},
          component:resolve => require(['../components/apk/apk'],resolve),
        },
        {
          path:'/',
          redirect:to => {
            return 'apk'
          }
        },
      ]
    },
    {
      path:'/manage',
      name:'manage',
      meta:{requireAuth:true},
      component:resolve => require(['../components/home/base/manage/manage'],resolve),
    },
    {
      path:'/login',
      name:'login',
      component:resolve => require(['../pages/login/login'],resolve),
    },
    {
      path:'/register',
      name:'register',
      component:resolve => require(['../pages/register/register'],resolve),
    },
    {
      path:'/',
      redirect:to => {
        return 'login'
      }
    },
    {
      path:'',
      redirect:to => {
        return '/login'
      }
    },
    {
      path:'/error',
      name:'error',
      component:resolve => require(['../components/home/base/error/error'],resolve),
    },
    {
      path:'*',
      redirect:to => {
        return '/error'
      }
    },
  ]
})
