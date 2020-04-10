<template>
  <div class="loginout">
    <div class="login">
      <div class="inner">
        <div class="container">
          <div class="row">
            <div class="innerdiv col-lg-6 col-md-6 col-sm-8 col-xs-12 col-xs-push-0 col-sm-push-2 col-md-push-3 col-lg-push-3 col-xs-push-0">
              <div class="title">
                <p>欢迎登陆</p>
              </div>
              <div class="form">
                <form class="form-horizontal" style="z-index: 1;">
                  <div class="form-group">
                    <label for="name" class="col-sm-3 control-label" style="color: rgb(255,255,255);">账&nbsp;号:</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="name" placeholder="账号" v-model="name">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="password" class="col-sm-3 control-label" style="color: rgb(255,255,255);">密&nbsp;码:</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="password">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-offset-3 col-sm-8">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" v-model="remunber"> <span style="color: rgb(255,255,255);">记住密码</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-push-3 col-sm-2 col-xs-push-0 col-xs-2">
                      <button type="submit" class="btn btn-default" @click="load">登录</button>
                    </div>
                    <div class="col-md-push-7 col-md-2 col-sm-push-7 col-sm-2 col-xs-push-5 col-xs-2">
                      <button type="submit" class="btn btn-default" @click="toregister">注册</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import store from 'store'
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        name:'',  //账号
        password:'',//密码
        remunber:false, //是否记住密码
        jwt:'',   //令牌
      }
    },
    mounted () {

    },
    methods: {
      //修改主界面菜单
      ...mapActions(['setConfig',]),
      async load(){
        var {name,password} = this
        if(name.trim()&&password.trim()){
          let params = new FormData()
          params.append('name',name)
          params.append('password',password)
          axios.post('http://47.112.132.177:8221/micro-uaa/user/login?',params)
            .then(response=>{
              if(response.status == 200)
              {
                var result = response.data
                result = result.data
                this.jwt = result.jwt
                var jwt = this.jwt
                store.set('fuwenben_Authorization',jwt.token_type + ' ' + jwt.access_token)
                var jwt = store.get('fuwenben_Authorization') || {}
                this.$message({
                  message:'登陆成功',
                  duration:1500,
                  type:'success'
                })
                this.$router.push('/home')
              }else{
                console.log(response)
                this.$message({
                  message:'登陆失败',
                  duration:1500,
                  type:'error'
                })
              }
            }).catch(err => {
            console.log(err)
          })
        }else{
          this.$message({
            message:'账号或密码不能为空',
            duration:1500,
            type:'warning'
          })
        }
      },
      toregister(){
        this.$router.push('/register')
      }
    },
  }
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  body,html{
    height: 100%;
    overflow: hidden;
  }
  .loginout{
    .login{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url("../../assets/imgs/login1.jpg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      opacity: 1;
    }
    .inner{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%,-60%,0);
      .innerdiv{
        position: relative;
        min-height: 250px;
        background: rgba(48,51,100,0.4);
        border-radius: 3%;
        border: 2px solid rgb(222,222,222);
        .title{
          height: 80px;
          font-size: 25px;
          line-height: 80px;
          text-align: center;
          color: rgb(255,255,255);
          letter-spacing: 12px;
          border-bottom: 1px solid rgb(244,244,244);
          margin-bottom: 15px;
        }
        .form{
          label{
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
