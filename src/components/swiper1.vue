<template>
  <div class="swiper">
    <swiper :options="swiperOption111">
      <swiper-slide v-for="(item, index) in slides" :key="index"><img :src="item"></swiper-slide>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
 
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        slides: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180050&di=0d2ee92eead284e8133d6df07535d75a&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16988_sc115.com.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=7412fd486c47c15f1d27485be0d7bd28&imgtype=0&src=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511015180167&di=3bcedd33a30129b9951be2a81f9b505c&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0420%2F06%2F05.jpg'
        ],
      }
    },
    // 假如有很多页面需要轮播图，而且不同的地方很多，比如你想对a页面轮播图滑动到下一张后alert(1),对b页面alert(2)等等等等，那该如何做呢？总不能一个一个判断吧，所以正确的方法应该是把配置参数通过prop接受父组件传递过来的参数
    props:{
      swiperOption111:{
        type:Object
      }
    }
  }
</script>

<style scoped lang="scss">
  .swiper{
    margin: 0 auto;
    overflow: hidden;
    height: 210px;
    width: 95%;
    .swiper-container{
      height:100%;
    }
    .swiper-slide{
      width: 90%;
      img{
        width: 95%;
        height: 95%;
        display: block;
        margin: 0 auto;
        margin-top: 2%;
        transition: all 1s ease 0s;
      }
      img{
        display: block;
        margin: 0 auto;
        margin-top: 3.5%;
        width: 94.625%;
        height: 90.625%;
        vertical-align: middle;
        transition: all 1s ease 0s;
      } 
      &.swiper-slide-active img{
        margin: 0 auto;
        width: 100%;
        height: 100%;
      } 
    }
  }
</style>