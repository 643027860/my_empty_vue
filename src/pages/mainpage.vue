<template>
  <div class="mainpage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-3 navs">
          <div class="leftnav">
            <el-row class="tac">
              <el-col :span="24">
                <el-menu
                  :default-active="acticledId"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose">
                  <el-submenu :index="menu1.id+''" v-for="(menu1,index) in menus" :key="index" v-show="menus">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>{{menu1.name}}</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item :index="menu2.id" v-for="(menu2,index) in menu1.son" :key="index" @click="jump(menu2.path)">{{menu2.name}}</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="col-lg-10 col-md-9 col-sm-9 col-xs-12 contain">
          <div  class="wrapdiv" v-show="menu">
            <p class="htitle">
              {{menu.name}}
              <span class="noshow500">
                <a href="javascript:;" v-for="(path,index) in pathnames" :key="index" @click="jump(path.path)">{{path.name}}&nbsp;</a>
              </span>
            </p>
            <div class="neirong">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        menus:[],     //菜单导航
        pathsname:'',   //路径名字
        menu:{},   //选中的菜单
      }
    },
    computed: {
      ...mapState(['acticledId','pathnames','returnlogin'])
    },
    mounted () {
      this.menus = [
        {
          name:'用户管理',
          id:1,
          son:[
            {
              name:'用户列表',
              path:'requsers',
              id:'1-1',
            },
            {
              name:'用户上传',
              path:'uploaduser',
              id:'1-2',
            },
          ]
        },
        {
          name:'角色管理',
          id:2,
          son:[
            {
              name:'角色列表',
              path:'reqroles',
              id:'2-1',
            },
            {
              name:'角色上传',
              path:'uploadrole',
              id:'2-2',
            },
          ]
        },
        {
          name:'文章管理',
          id:3,
          son:[
            {
              name:'文章列表',
              path:'reqwenzhangs',
              id:'3-1',
            },
            {
              name:'文章上传',
              path:'uploadwenzhang',
              id:'3-2',
            },
          ]
        },
        {
          name:'类型管理',
          id:4,
          son:[
            {
              name:'类型列表',
              path:'reqtypes',
              id:'4-1',
            },
            {
              name:'类型上传',
              path:'uploadtype',
              id:'4-2',
            },
          ]
        },
        {
          name:'机构管理',
          id:5,
          son:[
            {
              name:'机构列表',
              path:'reqdepts',
              id:'5-1',
            },
            {
              name:'机构上传',
              path:'uploaddept',
              id:'5-2',
            },
          ]
        },
        {
          name:'菜单管理',
          id:6,
          son:[
            {
              name:'菜单列表',
              path:'reqmenus',
              id:'6-1',
            },
            {
              name:'菜单上传',
              path:'uploadmenu',
              id:'6-2',
            },
          ]
        },
        {
          name:'APK管理',
          id:7,
          son:[
            {
              name:'apk列表',
              path:'apk',
              id:'7-1',
            },
          ]
        },
      ]
      this.menu = this.menus[0]
      console.log(this.returnlogin)
    },
    methods: {
      //修改主界面菜单
      ...mapActions(['choiceMenuId']),

      //路由跳转
      jump(name){
        this.$router.push({name})
      },

      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    watch:{
      returnlogin(newval,oldval){
        if(newval){
          console.log(newval)
          this.$router.replace({name:'login'})
        }
      }
    }
  }
</script>

<style lang="less">
  @media screen and(max-width: 499px){
    .noshow500{
      display: none;
    }
    .neirong{
      border: 1px solid rgb(233,234,237);
      box-shadow: 1px 1px 3px rgb(233,234,237);
      border-radius: 5px;
      margin: 0 -20px;
    }
  }
  @media screen and(max-width: 767px){
    .navs{
      display: none;
    }
    .noshow500{
      font-size: 12px;
    }
  }
  @media screen and(min-width: 1201px){
    .mainpage {
      width: 90%;
      margin: auto;
    }
  }
  @media screen and(max-width: 1200px){
    .mainpage {
      width: 100%;
      margin: auto;
    }
  }
  .mainpage{
    .leftnav{
      border-radius: 8px;
      background-color: white;
      height: 796px;
      overflow: auto;
      ul{
        border-radius: 8px;
      }
    }
    .contain{
      background-color: white;
      padding:15px 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      .wrapdiv{
        box-sizing: border-box;
        border-radius: 3px;
        .htitle{
          font-size: 16px;
          line-height: 40px;
          border-bottom: 1px solid #eee;
          color: #484848;
          font-weight: normal;
          position: relative;
          margin-bottom: 15px;
          span{
            float: right;
            a{
              display: block;
              margin-right: 10px;
              padding-right: 10px;
              float: left;
              position: relative;
              text-decoration: none;
              color: #333;
            }
            a:not(:last-child):after{
              position: relative;
              content: "/";
              right: -10px;
              bottom: 0;
              color: #ccc;
            }
            a:hover{
              color: #00b7ee;
            }
          }
        }
        .htitle:after{
          position: absolute;
          width: 80px;
          height: 2px;
          content: "";
          background: #000;
          left: 0;
          bottom: 0;
        }
        .neirong{
          border: 1px solid rgb(233,234,237);
          box-shadow: 1px 1px 3px rgb(233,234,237);
          border-radius: 5px;
          height: 710px;
          overflow: auto;
        }
      }
    }
  }
</style>
