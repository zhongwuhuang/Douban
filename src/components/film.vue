<template>
  <div class="film">
    <div class="flexboxrow film_top">
      <div class="flexboxitems" style="flex:1;text-align:left;">{{type}}</div>
      <div class="flexboxitems" style="flex:1;text-align:right;">
        <router-link class="more" :to="{path:'/classify/'+url}">更多<i class="iconfont icon-gengduo"></i></router-link>
      </div>
    </div>
    <div class="film_list" :ref="el" :data-request="url">
      <ul>
        <router-link v-for="(val,idx) in array" :key="idx" tag="li" :to="{path:'/film-detail/'+val.id}">
          <div class="film_list_img">
            <!-- <img src="@/assets/logo.png" alt=""> -->
            <!-- <img :src="(val.images.medium)" alt=""> -->
            <img v-lazy="(val.images.medium)" alt="">
          </div>
          <div class="film_list_detail">
            <h2 class="film_list_title">{{val.title}}</h2>
            <p class="film_list_rank">评分：{{val.rating.average}}</p>
            <p>
              <i :class="{rankcolor:val.rating.average>((i-0.5)*2)}" v-for="i in 5" :key="i" class="iconfont icon-shoucang"></i>
            </p>
          </div>
        </router-link>
      </ul>
      <!-- <Loading :loadingWord="loadingWord" class="loading"></Loading> -->
      <Loading :loadingWord="loadingWord" v-show="!array[0]" class="loading"></Loading>
    </div>
  </div>
</template>

<script>
  import Loading from './loading.vue'
  import BScroll from 'better-scroll'
  import {getStyle} from '@/assets/util/tools.js'
  export default {
    data() {
      return {
        scroller: null,
        array:[],
        loadingWord:'加载中'
      }
    },
    components:{Loading},
    // props:["el","url","type"],
    props: {
      el: {
        default: 'el'
      },
      url: {
        default: 'url'
      },
      type: {
        default: 'type'
      },
    },
    filters:{
      getImages (_url) {
        if (_url !== undefined) {
          let _u = _url.substring(11);
          return 'https://img3' + _u;
        }
      }
    },
    mounted(){
      const el = this.$refs[this.el];
      this.scroller=this.initScroll(el);
      console.log(this.scroller);
      
      const {request}=el.dataset;//获取data属性
      console.log(el.dataset);
      
      // this.$ajax.get(`/${request}?start=${Math.floor(Math.random()*10)}`)
      this.$ajax.get(`/${request}`).then((res)=>{
        console.log(res)
        this.array=res.data.subjects;
        // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
        this.$nextTick(()=>{
          this.freshWidth(el.children[0]); 
          this.scroller.refresh();                   
        })             
      }) 
    },
    methods:{
      // 初始化滚动插件
    	initScroll(el){
        return new BScroll(el,{
          click:true,
          probeType:3,
          scrollX:true,
          scrollY:false
        })
      },     
      // 计算出列表的宽度
      freshWidth(el){
        let width=getStyle(el.children[0],"width");
        // el.style.width=el.children.length*(width+padding+2)+"px";       
        el.style.width=el.children.length*(width+4)+"px";       
        console.log(width) 
        console.log(el.children.length)
      },
    }
  }
</script>

<style scoped lang="scss">
  .film{
    color: #7d7d7d;
    padding: 8px 2px;
    overflow: hidden;
    .more{
      color: #61daa5;
      text-decoration: none;
    }
    .film_top{
      border-bottom: 1px solid #afd1e2;
      padding: 0 10px 8px 10px;
    }
    .film_list{
      overflow: hidden;
      height: auto;
      width: 100%;
      margin-top: 2px;
      height: 180px;
      position: relative;
      ul{
        width: 2000px;
        li{
          width: 88px;
          float: left;
          overflow: hidden;
          margin: 0 4px 4px 0;
          .film_list_img{
            height: 120px;
            border: 1px solid #333;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .film_list_title{
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
          }
          .rankcolor{
            color: #59a794;
          }
        }
      }
    }
  }
  .loading{
    position: absolute;
    top:50%;
    left: 50%;
    margin-left:-39px;
    margin-top:-16px;
  }
</style>