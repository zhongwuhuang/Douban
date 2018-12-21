<template>
  <div>
    <!-- 购物车列表 -->
    <div class="film_wrap" ref="film_wrap">
      <ul>

        <li class="film_list flexboxrow" v-for="(val,idx) in goodsList" :key="idx">
          <div class="flexboxitems film_list_img">
            <!-- <img src="@/assets/img/logo.png" alt=""> -->
            <img v-lazy="val.url" alt="">
          </div>
          <div class="flexboxitems film_list_detail">
            <p>{{val.title}}</p>
            <p class="num">
              数量：
              <i class="iconfont icon-default" @click="changeNumber(val.id,-1)"></i>
              <span>{{val.number}}</span>
              <i class="iconfont icon-add" @click="changeNumber(val.id,1)"></i>
            </p>
            <p>规格：<span class="setcolor">{{val.stock}}</span></p>
            <p>单价：<span class="setcolor">￥{{val.price}}</span></p>
            <p>小计：<span class="setcolor">￥{{val.price*val.number}}</span></p>
          </div>
          <div class="flexboxitems film_list_control">
            <i class="iconfont icon-shanchu" @click="del(val.id)"></i>
            <label>
              <input type="checkbox" :checked="val.select" @change="toggleSelect(val.id)">
              <i :class="{ 'select': val.select }" class="iconfont icon-xuanzhong"></i>
            </label>
          </div>  
        </li>  

      </ul>
    </div>
    <!-- 结算 -->
    <div class="jieshuang flexboxrow">
      <div class="flexboxitems">
        总额：￥{{sumPrice}}
      </div>
      <router-link class="flexboxitems" to="/home/index">
        继续购物
      </router-link>
      <div class="flexboxitems">
        结算
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations,mapGetters} from 'vuex'
  export default {
    data() {
      return {
      }
    },
    computed:{
      ...mapGetters(['sumPrice']),
      goodsList(){
        return this.$store.state.goodsList
      }
    },
    methods:{
      ...mapMutations(['deleteGoods','updateGoods']),
      // 查找该id的索引
      findIndex(id){
        return this.goodsList.findIndex(item=>{//返回符合条件的数组第一个元素位置
          return item.id == id
        })
      },
      // 是否选中
      toggleSelect(id){
        let i = this.findIndex(id)
        let select = this.goodsList[i].select
        this.updateGoods({
          index:i,
          key:'select',
          val:!select
        })
      },
      // 更改数量
      changeNumber(id,val){
        let i = this.findIndex(id)
        let number = this.goodsList[i].number
        this.updateGoods({
          index:i,
          key:'number',
          val:number+val<=1?1:number+val,
        })
      },
      del(id){
        let i = this.findIndex(id)
        this.deleteGoods(i)
      }
    },
  }
</script>

<style scoped lang="scss">
  .film_wrap{
    // height: 1000px;
    // overflow: hidden;
    padding-bottom:43px; 
    .film_list{
      padding:10px 12px;
      border-bottom: 1px solid #afd1e2;
      .film_list_img{
        width: 86px;
        height: 120px;
        border: 1px solid #333;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .film_list_detail{
        flex: 1;
        padding-left: 16px;
        color: #7f7f7f;
        .setcolor{
          color: #4CAF50;
        }
        .num{
          span{
            border: 1px solid #bbb;
            padding: 2px 10px;
            border-radius: 4px;
            box-shadow: 0px 0px 16px #99cab1b5;
          }
          i{
            font-size: 20px;
            vertical-align: middle;
            color: #61daa5;
          }
        }
      }
      .film_list_control{
        width:26px;
        height: 118px;
        position: relative;
        i{
          font-size: 26px;
        }
        .icon-shanchu{
          font-size: 24px;
          position: absolute;
          top: 0;
          color: #ff2919;
        }
        .icon-xuanzhong{
          color: #d1d1d1;
        }
        label{
          position: absolute;
          bottom: 0;
          input{
            display: none;
          }
        }
        .select{
          color: #4CAF50;
        }
      }
    }
  }

  .jieshuang{
    line-height: 44px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    .flexboxitems:nth-child(1){
      background: #f2f2f2;
      color: #77b59c;
      width: 40%;
    }
    .flexboxitems:nth-child(2){
      background: #ffc107;
      width: 30%;
      color: #fff;
      text-decoration: none;
    }
    .flexboxitems:nth-child(3){
      background: #FF5722;
      width: 30%;
    }
  }
</style>