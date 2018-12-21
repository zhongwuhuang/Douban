<template>
  <div style="height:100%;">
    <!-- 顶部搜索 -->
    <div class="search flexboxrow">
      <div class="flexboxitems" style="flex:1;position:relative;">
        <input type="text" v-model="searchText" placeholder="请输入搜索内容" @keydown.13="searchFilm">
        <!-- <i class="iconfont icon-shanchu" @click="clearsearchText"></i> -->
        <i class="iconfont icon-qingchu" @click="clearsearchText"></i>
      </div>
      <div class="flexboxitems" style="width:60px;">
        <button @click="searchFilm"><i class="iconfont icon-sousuo1"></i></button>
      </div>
    </div>
    <!-- 电影列表 -->
    <div class="film_wrap" ref="film_wrap">
      <ul>
        <router-link v-for="(val,idx) in filmList" :key="idx" tag="li" class="film_list flexboxrow" :to="{path:'/film-detail/'+val.id}">
          <div class="flexboxitems film_list_img">
            <img :src="val.images.small" alt="">
          </div>
          <div class="flexboxitems film_list_detail">
            <p>影名：{{val.title}}</p>
            <p>导演：{{(val.directors)|getDirectors}}</p>
            <p>年份：{{val.year}}</p>
            <p>类型：{{val.genres.join('/')}}</p>
            <p>评分：<span style="color:#30c757;">{{val.rating.average}}</span></p>
          </div>
        </router-link>      
      </ul>
    </div>
    <!-- 加载组件 -->
    <Loading class="loading" :loadingWord="loadingWord" v-show="issearching"></Loading>
  </div>
</template>

<script>
  import Loading from '@/components/loading.vue'
  import {getStyle} from '@/assets/util/tools.js'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        filmList: [],
        searchText: '',
        issearching: false,
        loadingWord:'搜索中',
        myScroll:null
      }
    },
    components:{
      Loading
    },
    filters:{
      getDirectors(arr){
        let name="";
        arr.forEach((item,i)=>{
            if(i==arr.length-1){
                name+=item.name
            }else{
                name+=item.name+" / "
            }
        })
        return name
      }
    },
    props:{
    },
    mounted(){
      this.myScroll = this.initScroll(this.$refs.film_wrap)
      console.log(this.myScroll)
      // 下拉刷新
      this.myScroll.on('pullingDown',()=>{
        console.log('下拉刷新');
        
      })
    },
    methods:{
      clearsearchText(){
        this.searchText = ''
      },
      searchFilm(){
        if(!this.searchText){
          return
        }
        this.issearching = true
        this.fetchData()
      },
      fetchData(){
        this.$ajax.get(`/search?q=${this.searchText}`)
        .then((res)=>{
          console.log(res)
          this.issearching = false
          if(res.data.subjects.length == 0){
            alert('没有数据')
          }else{
            this.filmList = res.data.subjects
            this.$nextTick(()=>{
              console.log('触发nextTick');
              // this.myScroll.refresh();      
              // this.freshHeight(this.$refs.film_wrap.children[0]);              
              // console.log(this.myScroll)
            })  
          }            
        }) 
      },
      initScroll(el){
        return new BScroll(el,{
          click:true,
          probeType:3,
          scrollX:false,
          scrollY:true,//设置Y轴滚动
          pullDownRefresh:{
            threshold:50,
            stop:0
          },
          pullUpLoad:{
            threshold:-50,
          },
        })
      },
      freshHeight(el){
        let height=getStyle(el.children[0],"height");
        el.style.height=el.children.length*(height+4)+"px";       
        console.log(height) 
        console.log(el.children.length) 
      },
    }
  }
</script>

<style scoped lang="scss">
  .search{
    padding: 10px 0px 10px 14px;
    background: #8bdbc9;
    position: fixed;
    width: 100%;
    z-index: 100;
    .icon-qingchu{
      position: absolute;
      top: 50%;
      right: 6px;
      color: #ff0000;
      transform: translateY(-50%);
    }
    .icon-shanchu{
      position: absolute;
      top: 50%;
      right: 6px;
      color: #ff0000;
      transform: translateY(-50%);
    }
    input{
      width:100%;
      height: 26px;
      border: none;
      outline: none;
      padding-left: 6px;
      border-radius: 4px;
    }
    button{
      background: none;
      border: none;
      color: #fff;
      width: 100%;
      outline: none;
      i{
        font-size: 20px;
      }
    }
  }
  .film_wrap{
    height: 100%;
    overflow: hidden;
    ul{
      padding: 46px 0 41px;
    }
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
      }
    }
  }
  .loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>