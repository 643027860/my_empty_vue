<template>
  <div class="apk">
    <div class="condition">
      <span class="out">
        <span style="float: right;margin-right: 20px;width: auto;display: inline-block;">
          <el-checkbox v-model="checked" style="font-size: 16px;">可见</el-checkbox>
          <el-button type="primary" style="padding: 5px;margin-left: 10px;" class="my-button">
            <input type="file" class="my-input-file" @change="getFile($event)">
            <i class="el-icon-upload2"></i>上传
          </el-button>
        </span>
        查询结果列表：
      </span>
    </div>
    <div class="result" v-loading="loading">
      <div v-if="Apks!=[]">
        <table class="table table-hover table-striped table-responsive">
          <thead>
          <tr>
            <th class="name col-lg-6 col-md-5 col-sm-5 col-xs-5">名称</th>
            <th class="remark col-lg-3 col-md-3 col-sm-3 col-xs-3">文件大小</th>
            <th class="createBy col-lg-2 col-md-2 col-sm-2 col-xs-2">创建时间</th>
            <th class="caozuo col-lg-1 col-md-2 col-sm-2 col-xs-2">操作</th>
          </tr>
          </thead>
          <tbody style="height: 460px;">
          <tr class="something" v-for="(apk,index) in apks" :key="index" v-if="apks.length>0">
            <td ><p><a :href="apk.apkUrl">{{apk.apkName}}</a></p></td>
            <td ><p>{{getSize(apk.apkSize)}}</p></td>
            <td ><p>{{apk.createTime.slice(0,10)}}</p></td>
            <td class="buttom">
              <span v-if="delFlag==0"><i class="el-icon-download"></i></span>
              <span v-if="delFlag==0"><i class="el-icon-delete" @click="fixapk(apk.id,-1)"></i></span>
              <span v-if="delFlag==-1"><i class="el-icon-refresh-left" @click="fixapk(apk.id,0)"></i></span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="pages" v-if="Apks!=[]">
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="Apks.totalSize*1"
              :current-page="pageNum*1"
              :page-size="pageSize*1"
              @current-change="(currentPage)=>reqapkspage(currentPage)"
              style="margin-top: -10px;"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import axios from 'axios'
  import {mapActions} from 'vuex'
  import '../../assets/my-css.css'
  export default {
    data () {
      return {
        jwt:'',   //令牌
        config:'',  //请求设置

        Apks:[],  //apk列表以及页数信息
        apks:[],   //apk列表

        delFlag:0,   //是否已删除
        pageNum:1,  //页数
        pageSize:4,  //每页行数

        uploadFile:null,   //上传的文件

        checked:true,   //是否选中可见
        loading:false,  //加载
      }
    },
    mounted () {
      this.jwt = store.get('fuwenben_Authorization') || {}
      if(!this.jwt){
        this.$router.replace({name:'login'})
      }else{
        this.config = {
          headers:{
            'Authorization': store.get('fuwenben_Authorization') || {}
          }
        }
      }
      //修改菜单UD
      this.choiceMenuId('7-1')
      //修改路径名
      this.changePathNames(
        [
          {
            name:'APK管理',
          },
          {
            name:'APK列表',
            path:'apk',
          },
        ]
      )
      //获取APK列表
      this.reqapkspage(1)
    },
    methods: {
      //修改主界面菜单
      ...mapActions(['choiceMenuId','changePathNames']),

      //获取apk列表
      reqapkspage(pagenum){
        this.loading = true
        this.pageNum = pagenum
        var {config,pageNum,pageSize,delFlag} = this
        if(pageNum&&pageSize){
          var params = new FormData()
          params.append("pageNum",pageNum)
          params.append("pageSize",pageSize)
          params.append("delFlag",delFlag)
          axios.post('http://47.112.132.177:8221/micro-apk-consumer/feign/upload/select/delFlag',params,config)
            .then(response=>{
              this.loading = false
              var result = response.data
              if(result.code == 200)
              {
                this.Apks = result.data
                this.apks = this.Apks.content
              }else{
                this.$message({
                  type:'error',
                  duration:1500,
                  message:'获取apk列表失败'
                })
              }
            }).catch(err => {
            this.loading = false
            console.log(err)
          })
        }else{
          this.$message({
            type:'error',
            duration:1500,
            message:'请选择查询页数'
          })
        }
      },

      //获取apk文件大小
      getSize(size){
        if(size/1024/1024/1024>0.5){
          return ((size/1024/1024/1024)+'').split('.')[0]+'.'+((size/1024/1024/1024)+'').split('.')[1].slice(0,2)+'G'
        } else if(size/1024/1024>0.5){
          return ((size/1024/1024)+'').split('.')[0]+'.'+((size/1024/1024)+'').split('.')[1].slice(0,2)+'M'
        }else if(size/1024>0.5){
          return ((size/1024)+'').split('.')[0]+'.'+((size/1024)+'').split('.')[1].slice(0,2)+'KB'
        }else{
          return size + 'B'
        }
      },

      //修改apk状态
      fixapk(id,delFlag){
        var message = ''
        if(delFlag==-1){
          message = '是否确定删除该文件?'
        }else{
          message = '是否确定还原该文件?'
        }
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var {config} = this
          var params = new FormData()
          params.append("id",id)
          params.append("delFlag",delFlag)
          axios.put("http://47.112.132.177:8221/micro-apk-consumer/feign/upload/update",params,config)
            .then(response=>{
              this.reqapkspage(1)
            }).catch(error=>{
              console.log(error)
          })
        }).catch(() => {

        });
      },

      //选择文件
      getFile(event){
        this.uploadFile = event.target.files[0]
        this.uploadapk()
      },

      //上传apk文件
      uploadapk(){
        if(this.uploadFile){
          var {uploadFile,config} = this
          let param = new FormData()
          param.append('uploadFile',uploadFile)
          axios.post('http://47.112.132.177:8221/micro-apk-consumer/feign/upload/apk',param,config)
            .then(response=>{
              var result = response.data
              if(result.code == 200)
              {
                console.log(response)
                this.uploadFile = ''
                this.$message({
                  type:'success',
                  duration:1000,
                  message:'上传成功'
                })
                this.reqapkspage(1)
              }else{
                console.log(response)
                this.$message({
                  type:'error',
                  duration:1000,
                  message:'上传失败'
                })
              }
            }).catch(err => {
            console.log(err)
          })
        }else{
          this.$message({
            message:'文件不能为空',
            duration:1500,
            type:'warning'
          })
        }
      },
    },
    watch:{
      checked(newval,oldval){
        if(newval){
          this.delFlag = 0
        }else{
          this.delFlag = -1
        }
        this.reqapkspage(1)
      }
    }
  }
</script>

<style lang="less">
  @media screen and(max-width: 499px){
    .nosee{
      display: none!important;
    }
    .buttom{
      span{
        font-size: 14px;
      }
    }
  }
  a{
    text-decoration: none;
  }
  //自定义上传按钮
  .my-button{
    height: 25px;
    width: 59px;
    position: relative;
    overflow: hidden;
  }
  .my-input-file{
    height: 25px;
    width: 59px;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    margin-top: -6px;
    margin-left: -6px;
  }

  .apk{
    .condition{
      height: 50px;
      background-color: rgb(250,250,250);
      span.out{
        font-size: 16px;
        line-height: 60px;
        height: 50px;
        color: black;
        padding-left: 10px;
        letter-spacing: 2px;
        span.inner{
          display: inline-block;
          float: right;
          padding-right: 10px;
          width: 250px;
          height: 40px;
          margin-top: -5px;
        }
      }
    }
    .result{
      margin-bottom: 70px;
      .table{
        td p{
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          margin: 0;
        }
        tr:last-child td{
          border-bottom: 1px solid #ddd;
        }
        .buttom{
          span{
            display: inline-block;
            width: 40%;
            font-size: 16px;
            color: #5bc0de;
            cursor: pointer;
          }
        }
      }
      .pages{
        position: absolute;
        bottom: 0;
        margin-bottom: 30px;
        margin-left: 40%;
      }
    }
  }
</style>
