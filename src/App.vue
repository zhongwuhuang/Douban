<template>
  <div id="app">
    <!-- App.vue使用了keep-alive，所以film-detail组件在第一次进入后就会被缓存，由于该组件不会被销毁，所以之后我们每次进来都会保持第一次进来获取的数据 -->
    <!-- <keep-alive exclude="search"> -->
    <keep-alive include="search">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* @import url('//at.alicdn.com/t/font_342152_sf25eoela9f9lik9.css'); */
@import url('//at.alicdn.com/t/font_747390_z36mo0vbede.css');/* 我的图标库 */
@import './assets/css/common.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
}
#app>div {
  height: 100%;
}
</style>
