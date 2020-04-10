<template>
  <div class="loginout">
    <div class="logindiv">
      <div class="login">
        <div class="rightlogin">
          <div class="logininner">
            <p class="loginp">欢迎回来</p>
            <el-form :model="ruleForm"  ref="ruleForm" label-width="50px">
              <el-form-item label="账户"  prop="name">
                <el-input  prefix-icon="el-icon-s-custom" v-model.number="ruleForm.name" autocomplete="off" placeholder="请输入账号"><</el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <div class="remember" id="remembermi">
                <el-form-item prop="remember">
                  <el-checkbox label="记住密码" v-model="ruleForm.remember"></el-checkbox>
                </el-form-item>
              </div>
              <el-form-item>
                <el-button type="primary" @click="login('ruleForm')" style="height: 40px;width:100%;padding: 0px 10px"><span class="loginspan">立即登录</span></el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="login('ruleForm')" style="height: 40px;width:100%;padding: 0px 10px"><span class="loginspan">注册账号</span></el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="leftimg">
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
    data() {
      return {
        ruleForm: {
          password: '',
          name:'',
          remember:false,   //是否记住密码
        },
      };
    },
    methods: {
      //登录
      login(){
        this.resetForm('ruleForm')    //清空所有值
        console.log(this.ruleForm.password)
      },
      //情况表单
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body,html{
    height: 100%;
    overflow: hidden;
  }
  .loginout{
    .logindiv{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      .login{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate3d(-50%,-60%,0);

        width:800px;

        border: 1px solid rgb(233,233,233);
        box-sizing: border-box;
        border-radius: 8px;

        .leftimg{
          width: 400px;
          height: 385px;
          background-color: red;
          border-radius: 8px 0 0 8px;
          background-image: url("https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2300875363,445064071&fm=5");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .rightlogin{
          float: right;

          width: 400px;
          height: 100%;
          padding: 30px;
          .logininner{
            p.loginp{
              font-size: 25px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              margin-bottom: 30px;
              margin-left: 25px;
              letter-spacing: 5px;

              -webkit-touch-callout: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
            .el-form-item{
              margin-bottom: 10px;
            }
            .el-input__inner,.el-button{
              /*输入框椭圆*/
              border-radius: 20px;
            }
            .remember .el-form-item{
              margin-bottom: 0px;
            }
          }
        }
      }
    }
  }
  @media screen and(max-width: 899px) and (min-width: 500px){
    .logindiv{
      .login{
        width: 400px!important;
        .leftimg{
          display: none;
        }
      }
    }
  }
  @media screen and(max-width: 499px){
    #remembermi{
      display: none;
    }
    .logindiv{
      .login{
        border: 0!important;
        width: 100vw!important;
        transform: translate3d(-50%,-50%,0) !important;
        .rightlogin{
          width: 100%!important;
          padding: 20px!important;
          margin: auto;
          p.loginp{
            font-size: 32px!important;
            margin-top: -30px!important;
            margin-bottom: 50px!important;
          }
          .el-form-item{
            margin-bottom: 18px!important;
          }
          .loginspan{
            letter-spacing: 5px;
            font-size: 16px;
          }
        }
        .leftimg{
          display: none;
        }
      }
    }
  }
</style>
