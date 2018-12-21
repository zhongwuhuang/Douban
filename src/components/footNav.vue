<template>
  <div>
    <ul>
      <router-link tag="li" :to="{name:'index'}">
        <i class="iconfont icon-home"></i>
        <p>
          首页
        </p>
      </router-link>
      <router-link tag="li" :to="{name:'search'}">
        <i class="iconfont icon-sousuo"></i>
        <p>
          搜索
        </p>
      </router-link>
      <router-link tag="li" :to="{name:'car'}">
        <span class="goodsNumber" v-show="goodsNumber>0">{{goodsNumber}}</span>
        <i class="iconfont icon-gouwuche1"></i>
        <p>
          购物车
        </p>
      </router-link>
      <router-link tag="li" :to="{name:'vip'}">
        <i class="iconfont icon-gerenzhongxin-xuanzhong"></i>
        <p>
          我的
        </p>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    computed:{
      goodsNumber(){
        return this.$store.getters.goodsNumber
      }
    }
  }
</script>

<style scoped lang="scss">
  ul{
    width: 100%;
    padding: 4px 0;
    display: flex;
    border-top: 1px solid #afd1e2;
    background: #fff;
    li{
      list-style-type: none;
      flex: 1;
      text-align: center;
      color:#93b7f3;
      position: relative;
      &.router-link-active{
        color:#4caf50;
      }
      p{
        font-size: 12px;
      }
      .goodsNumber{
        padding: 2px 4px;
        border-radius: 50%;
        color: #fff;
        background: #ff1100;
        position: absolute;
        left: 10%;
        top: -4px;
        text-align: center;
      }
    }
  }
</style>