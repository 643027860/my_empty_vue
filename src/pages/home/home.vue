<template>
  <div class="home">
    <Nav></Nav>
    <Mainpage></Mainpage>
  </div>
</template>

<script>
  import Nav from '../../components/home/base/nav'
  import Mainpage from '../mainpage'
  export default {
    components:{
      Nav,
      Mainpage
    },
    data () {
      return {}
    },
    mounted () {

    },
    methods: {},
  }
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }

  .home{
    position: absolute;
    background-color: rgb(237,237,237);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
