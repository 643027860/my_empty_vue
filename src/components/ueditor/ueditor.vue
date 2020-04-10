<template>
  <div>
    <div class="ueditor">
      <div id="editor" type="text/plain"></div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import store from 'store'
  export default {
    name: 'UE',
    data() {
      return {
        editor: null,    //编辑器对象
        jwt:'',   //令牌
        config:'',    //请求头部
        contenturl:'',  //文章返回的UR
        user:[],      //用户信息
        depts:[],     //机构信息
        type:[],     //文章类型
        page:'',    //具体文章
        content:'',            //正文内容
        content1:'',           //正文内容纯文本格式
      }
    },
    mounted() {
      this.jwt = store.get('fuwenben_Authorization') || {}
      if(!this.jwt){
        this.$router.replace('/login')
      }else{
        this.config = {
          headers:{
            'Authorization': store.get('fuwenben_Authorization') || {}
          }
        }
      }
      var myconfig = this.config
      //初始化编辑器
      axios.get("http://47.97.170.173:8211/ueditor",myconfig)
        .then(response=>{
          myconfig = response.data
          myconfig.initialFrameWidth = '100%'
          myconfig.initialFrameHeight = 250
          myconfig.maximumWords = 100000
          var _this = this
          this.editor = UE.getEditor('editor',myconfig); // 初始化UE
          this.editor.ready(()=>{
            UE.getEditor('editor').addListener("contentChange",function(){
              _this.content = UE.getEditor('editor').getContent()
              _this.content1 = UE.getEditor('editor').getContentTxt()
            });
          })
          UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
          UE.Editor.prototype.getActionUrl = function(action) {
            //上传图片
            if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
              return 'http://47.97.170.173:8211/imgUpload';
              //上传视频
            }else if(action == "uploadvideo"){
              return 'http://47.97.170.173:8211/videoUpload';
            }
            //上传附件
            else if(action == "uploadfile"){
              return 'http://47.97.170.173:8211/fileUpload';
            }
            //默认
            else {
              return this._bkGetActionUrl.call(this, action);
            }
          }
        })

    },

    methods: {
      // 上传文章内容方法
      uploadContent() {
        var content1 = this.editor.getContentTxt()
        var content = this.editor.getContent()     //获取整个页面的html代码   content表示内容
        var {config} = this
        var params = new FormData()
        params.append('content',content)
        params.append('content1',content1)
        axios.post('http://47.97.170.173:8211/content',params,config)
          .then(response=>{
            var result = response.data
            if(response.status == 200)
            {
              this.contenturl = result
              this.$emit('getcontenturl',this.contenturl)
              this.$message({
                type:'success',
                duration:1500,
                message:'上传成功'
              })
              this.clearContent()
            }else{
              console.log(response)
              this.$message({
                type:'error',
                duration:1500,
                message:'上传失败'
              })
            }
          }).catch(err => {
          console.log(err)
        })
      },
      //获取文章内容方法
      getPage(){
        var config = {
          headers:{
            'Authorization':store.get('fuwenben_Authorization') || {}
          }
        }
        axios.get(this.contenturl,config)
          .then(response=>{
            var result = response
            if(result.status == 200)
            {
              //result.data就是文章返回的链接
              $('.uploadpage1').html(result.data)
              this.$message({
                type:'success',
                duration:1500,
                message:'获取成功'
              })
            }else{
              console.log(response)
              this.$message({
                type:'error',
                duration:1500,
                message:'获取失败'
              })
            }
          }).catch(err => {
          console.log(err)
        })
        console.log()
      },
      //上传文章
      uploadPage(){
        var config = {
          headers:{
            'Authorization':store.get('fuwenben_Authorization') || {}
          }
        }
        var params = new FormData()
        params.append('articleContentUrl',this.contenturl)
        params.append('articleImgUrl',this.contenturl)
        params.append('articleIntroUrl',this.contenturl)
        params.append('articleName','背影')
        params.append('depts', 1)
        params.append('types',1)
        params.append('users',1)
        axios.post('http://47.97.170.173:8211/article/register',params,config)
          .then(response=>{
            var result = response
            console.log(result)
            if(result.status == 200)
            {
              this.contenturl = result.data
              this.$message({
                type:'success',
                duration:1500,
                message:'上传成功'
              })
            }else{
              console.log(response)
              this.$message({
                type:'error',
                duration:1500,
                message:'上传失败'
              })
            }
          }).catch(err => {
          console.log(err)
        })
      },
      //获取具体文章
      reqPage(id){
        var config = {
          headers:{
            'Authorization':store.get('fuwenben_Authorization') || {}
          }
        }
        var params = new FormData()
        params.append('id',id)
        axios.post('http://47.97.170.173:8211/article/find/id',params,config)
          .then(response=>{
            var result = response.data
            if(result.code == 200)
            {
              this.page = result.data
              console.log(this.page)
            }else{
              console.log(response)
              this.$message({
                type:'error',
                duration:1500,
                message:'获取失败，请重试'
              })
            }
          }).catch(err => {
          console.log(err)
          this.$message({
            type:'error',
            duration:1500,
            message:'获取失败，请重试'
          })
        })
      },
      //清空编辑器
      clearContent() { // 清空编辑器内容
        return this.editor.execCommand('cleardoc');
      },
    },

    //销毁编辑器
    beforeDestroy() {
      // 组件销毁的时候，要销毁 UEditor 实例
      if (this.editor !== null && this.editor.destroy) {
        this.editor.destroy();
      }
    }
  }
</script>

<style lang="less">

</style>
