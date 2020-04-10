<template>
  <div class="registerdiv">
    <div class="register">
      <div class="inner">
        <div class="container">
          <div class="row">
            <div class="innerdiv col-lg-6 col-md-6 col-sm-8 col-xs-12 col-xs-push-0 col-sm-push-2 col-md-push-3 col-lg-push-3 col-xs-push-0 xsnopadding">
              <div class="title">
                <p>欢迎注册</p>
              </div>
              <div class="form">
                <form class="form-horizontal" style="z-index: 1;">
                  <div class="form-group">
                    <label for="name" class="col-sm-3 control-label" style="color: rgb(255,255,255);">用户名:</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" id="name" placeholder="请输入用户名" v-model="name">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="password" class="col-sm-3 control-label" style="color: rgb(255,255,255);">密&nbsp;码:</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="password">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="password1" class="col-sm-3 control-label" style="color: rgb(255,255,255);">确认密码:</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" id="password1" placeholder="请再次输入密码" v-model="password1">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="grade" class="col-sm-3 control-label" style="color: rgb(255,255,255);">年&nbsp;级:</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" id="grade" placeholder="请如实填写年级，例：2018" v-model="grade">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="deptId" class="col-sm-3 control-label" style="color: rgb(255,255,255);">方&nbsp;向:</label>
                    <div class="col-sm-8">
                      <div class="input-group">
                        <div class="input-group-btn">
                          <button type="button" class="btn btn-default
                        dropdown-toggle" data-toggle="dropdown" tabindex="-1" id="deptId">
                            <span class="caret"></span>
                            <span class="sr-only">切换下拉菜单</span>
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <a href="#">功能</a>
                            </li>
                            <li>
                              <a href="#">另一个功能</a>
                            </li>
                            <li>
                              <a href="#">其他</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                              <a href="#">分离的链接</a>
                            </li>
                          </ul>
                        </div>
                        <input type="text" class="form-control" v-model="deptId">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="role" class="col-sm-3 control-label" style="color: rgb(255,255,255);">角&nbsp;色:</label>
                    <div class="col-sm-8">
                      <div class="input-group">
                        <div class="input-group-btn">
                          <button type="button" class="btn btn-default
                        dropdown-toggle" data-toggle="dropdown" tabindex="-1" id="role">
                            <span class="caret"></span>
                            <span class="sr-only">切换下拉菜单</span>
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <a href="#">功能</a>
                            </li>
                            <li>
                              <a href="#">另一个功能</a>
                            </li>
                            <li>
                              <a href="#">其他</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                              <a href="#">分离的链接</a>
                            </li>
                          </ul>
                        </div><!-- /btn-group -->
                        <input type="text" class="form-control" v-model="role">
                      </div><!-- /input-group -->
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="mobile" class="col-sm-3 control-label" style="color: rgb(255,255,255);">电&nbsp;话:</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" id="mobile" placeholder="请如实填写正确的手机号码" v-model="mobile">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="email" class="col-sm-3 control-label" style="color: rgb(255,255,255);">邮&nbsp;箱:</label>
                    <div class="col-sm-8">
                      <input type="password" class="form-control" id="email" placeholder="请如实填写正确的邮箱" v-model="email">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label" style="color: rgb(255,255,255);"></label>
                    <div class="col-sm-8">
                      <div class="col-xs-2" style="float: left">
                        <button type="submit" class="btn btn-default" @click="load">登录</button>
                      </div>
                      <div class="col-xs-2" style="float: right">
                        <button type="submit" class="btn btn-default" @click="toregister">注册</button>
                      </div>
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
  import qs from 'qs'
  import store from 'store'
  export default {
    data () {
      return {
        name:'',  //账号
        password:'',//密码
        password1:'',//确认密码
        grade:'',  //年级
        email:'',  //邮箱
        mobile :'',  //手机
        deptId:'',  //方向
        role:[],  //角色列表
        jwt:'',   //令牌
      }
    },
    mounted () {

    },
    methods: {
      async load(){
        var {name,password} = this
        if(name.trim()&&password.trim()){
          let param = {name,password}
          param = qs.stringify(param)
          axios.post('http://47.97.170.173:8211/user/login?',param)
            .then(response=>{
              if(response.status == 200)
              {
                var result = response.data
                result = result.data
                this.jwt = result.jwt
                var jwt = this.jwt
                store.set('fuwenben_Authorization',jwt.token_type + ' ' + jwt.access_token)
                var jwt = store.get('fuwenben_Authorization') || {}
                console.log('成功')
                this.$router.push('/home/uploadpage')
              }else{
                console.log(response)
                console.log('失败')
              }
            }).catch(err => {
            console.log(err)
          })
        }else{
          console.log('账号密码不能为空')
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
  @media screen and(max-width: 500px){
    .xsnopadding{
    }
  }
  .registerdiv{
    .register{
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
