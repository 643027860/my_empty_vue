<template>
  <div style="width: 1000px;height: 500px;margin: 100px auto;">
    <div id="ueditor">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        editor: null,
      }
    },
    mounted () {
        this.editor = UE.getEditor('ueditor') // 初始化UE
    },
    destroyed () {
      this.editor.destroy()
    }
  }
</script>

<style lang="less">

</style>

