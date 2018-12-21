<template>
    <swiper :options="swiperOption"  class="swiper-box">
      <swiper-slide class="swiper-item" v-for="(item, index) in slides" :key="index"><img :src="item"></swiper-slide>
    </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
 
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        slides: [
          'https://img3.doubanio.com/dae/niffler/niffler/images/96c05d4a-8a5f-11e8-8a32-0242ac110036.jpg',
          'https://img3.doubanio.com/dae/niffler/niffler/images/69529e8e-8327-11e8-a22a-0242ac110070.jpg',
          'https://img1.doubanio.com/dae/niffler/niffler/images/52884a3a-8a3b-11e8-b0ba-0242ac110037.jpg',
          'https://img1.doubanio.com/dae/niffler/niffler/images/41710c9c-84c2-11e8-8227-0242ac11001c.jpg',
          'https://img1.doubanio.com/dae/niffler/niffler/images/7f80ae88-8a31-11e8-a8cb-0242ac110037.jpg'
        ],
      }
    },
    // 假如有很多页面需要轮播图，而且不同的地方很多，比如你想对a页面轮播图滑动到下一张后alert(1),对b页面alert(2)等等等等，那该如何做呢？总不能一个一个判断吧，所以正确的方法应该是把配置参数通过prop接受父组件传递过来的参数
    props:{
      swiperOption:{
        type:Object
      }
    },
    components:{
      swiper, swiperSlide 
    },
  }
</script>

<style scoped lang="scss">
	.swiper-box {
	    width: 100%;
	    height: 100%;
	    margin: 0 auto;
	    .swiper-item {
          // height: 5rem;
          img{
            width: 100%;
          }
	    }	   
	}
</style>