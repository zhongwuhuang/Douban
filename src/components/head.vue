<template>
  <div>
    <div class="flexboxrow head">
      <div class="flexboxitems" style="">
        <router-link to="/home/index">首 页</router-link>
      </div>
      <div class="flexboxitems" style="flex:1;font-size:18px;color:#9e9e9e;">
        {{headTitle}}
      </div>
      <div class="flexboxitems" style="">
        <router-link :to="{name:'car'}">购物车</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:["headTitle"]
  }
</script>

<style scoped lang="scss">
  .head{
    padding: 0 8px;
    position: fixed;
    background: #fff;
    top: 0;
    width: 100%;
    height: 44px; 
    text-align: center;
    border-bottom: 1px solid #afd1e2;
    z-index: 1000;
    a{
      font-size: 16px;
      display: inline-block;
      height: 100%;
      width: 100%;
      text-decoration: none;
      color: #00b600;
    }
  }
</style>