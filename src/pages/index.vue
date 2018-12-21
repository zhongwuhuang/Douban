<template>
  <div class="content">
    <!-- 轮播组件 -->
    <swiperComponent :swiperOption111="swiperOption"></swiperComponent>

    <!-- 最多播放 -->
    <filmComponent :el="filmType.topFilmData.scroller" :url="filmType.topFilmData.url" :type="filmType.topFilmData.type">
    </filmComponent>
    <!-- 即将上映 -->
    <filmComponent :el="filmType.commingFilmData.scroller" :url="filmType.commingFilmData.url" :type="filmType.commingFilmData.type">
    </filmComponent>
    <!-- 正在热播 -->
    <filmComponent :el="filmType.theatersFilmData.scroller" :url="filmType.theatersFilmData.url" :type="filmType.theatersFilmData.type">
    </filmComponent>
  </div>
</template>

<script>
  import swiperComponent from '@/components/swiper.vue'
  import filmComponent from '@/components/film.vue'
  export default {
    data() {
      return {
        swiperOption: {
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          // debugger: true,  
          // autoplay: true,        
          // speed: 400,
          // loop: true,        
          // paginationType: 'fraction',        
          // slidesPerView: "auto",//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
          // centeredSlides: true//<span style="color:rgb(68,68,68);font-family:'microsoft yahei';font-size:13px;">设定为true时，活动块会居中，而不是默认状态下的居左。</span>
          pagination: '.swiper-pagination',
          direction: 'horizontal',           
        },
        filmType:{
          topFilmData:{
            scroller:"scroll-top250",
            url:"top250",
            type:"最多播放"
          },
          commingFilmData:{
            scroller:"scroll-comming",
            url:"coming_soon",
            type:"即将上映"
          },
          theatersFilmData:{
            scroller:"scroll-theaters",
            url:"in_theaters",
            type:"正在热播"
          },
        }
      }
    },
    components:{
      swiperComponent,
      filmComponent,
    }
  }
</script>

<style scoped>
  .content{
    padding-bottom: 44px;
  }
</style>