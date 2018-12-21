<template>
  <transition name="slide">
    <div>
      <headComponent :headTitle="loadingWordTip"></headComponent>
        
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

        <transition :name="loadingPosition">
          <Loading id="loading"
              v-show="showLoading"
              :class='{pullDownLoading,pullUpLoading,center}'
              ref="loading"
              :loadingWord="loadingWord"
          ></Loading>
        </transition>
      </div>

      <!-- 加载组件 -->
      <Loading class="loading" :loadingWord="loadingWordTip" v-show="issearching"></Loading>
    </div>
  </transition>
</template>

<script>
  import headComponent from '@/components/head.vue'
  import {getStyle,getDeviceRatio} from '@/assets/util/tools.js'
  import BScroll from 'better-scroll'
  import Loading from '@/components/loading.vue'

  /*获取当前缩放比*/
  const DEVICE_RATIO=getDeviceRatio();
  /*下拉配置*/
  const DOWN_CONFIG={
    threshold:80*DEVICE_RATIO,
    stop:40*DEVICE_RATIO
  }
  /*上拉配置*/
  const UP_CONFIG={
    threshold:-80*DEVICE_RATIO,
  }

  export default {
    data() {
      return {
        type:this.$route.params.type,
        issearching:false,
        myScroll:null,
        filmList:[],
        center:false,

   			showLoading:false,					  			
        pullDownLoading:false,
        pullUpLoading:false,
        loadingWord:"正在加载",
   			loadingPosition:"",
   			currentPage:0,  
   			noMoreData:false
      }
    },
    computed:{
      loadingWordTip(){
        if(this.$route.params.type == 'top250'){
          return '最多播放'
        }else if(this.$route.params.type == 'coming_soon'){
          return '即将上映'
        }else if(this.$route.params.type == 'in_theaters'){
          return '正在热播'
        }
      },
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
    components:{
      headComponent,
      Loading
    },
    created(){
      // this.fetchData();
    },

    watch:{
      filmList(){
        this.$nextTick(()=>{
          this.refresh(); //作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
        }) 	
      },
      '$route' (to, from) {
          // data数据操作
        this.fetchData();
      }
    },
    mounted(){
      this.fetchData();
      /*初始化scroll*/
      this.myScroll = this.initScroll(this.$refs.film_wrap)
      /*下拉刷新*/
      this.myScroll.on('pullingDown',()=> {
        console.log(2222)
        this.pullDown()
      });
      /*上拉加载更多*/
      this.myScroll.on('pullingUp',()=> this.pullUp());
    },    
    methods:{
	    refresh(){
        this.myScroll&&this.myScroll.refresh()
      },
      // 启用 better-scroll, 默认 开启
	    enable(){
	    	this.myScroll&&this.myScroll.enable()
      },
      // 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
	    disable(type){
	    	this.myScroll&&this.myScroll.disable()
      },
      // 当下拉刷新数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
	    finishPullDown(){
        this.myScroll&&this.myScroll.finishPullDown()
	    },
      // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
	    finishPullUp(){
			this.myScroll&&this.myScroll.finishPullUp()
	    },
	    beforeFetch(type){
	    	this[`pull${type}Loading`]=true;	
	    	this[`inPulling${type}`]=true;
	    	this.showLoading=true;
	    	if(type=="Down"){
	    		this.loadingPosition="top";
	    		this.loadingWord="正在下拉刷新";
	    		this.disable();
	    	}else if(type=="Up"){
					this.loadingPosition="bot";
		    	this.loadingWord="正在加载更多"
	    	}
      },
	    afterFetch(type){
        this.enable();
	    	this[`finishPull${type}`]();
        this.refresh(); //作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
	    	this.showLoading=false;
	    	setTimeout(()=>{
	    		this[`pull${type}Loading`]=false;	
        },300)    	    	
	    },      
      // 下拉
	    pullDown(){
	    	this.beforeFetch("Down");  
	    	setTimeout(()=>{
		    	this.$ajax.get(`/${this.type}?count=10&start=${Math.floor(Math.random()*100)}`).then((res)=>{
            this.loadingWord="刷新成功"
            res=res.data;
            if(res.subjects.length>0){
              this.filmList=res.subjects.concat(this.filmList);	    		
            }else{
              console.log("已经到底了")
            }
            setTimeout(()=>{
              this.afterFetch("Down");
            },300)
          }).catch((error)=>{
            this.afterFetch("Down");
            console.log(error);
          })
        },1000)     	  	
      },
      // 上拉
	    pullUp(){
	    	if(!this.noMoreData){
		    	this.beforeFetch("Up");
		    	setTimeout(()=>{
			    	this.$ajax.get(`/${this.type}?count=10&start=${(++this.currentPage)*10}`).then((res)=>{
							res=res.data;
							if(res.subjects.length>0){
								this.filmList=this.filmList.concat(res.subjects);	  	    		
							}else{
								alert("已经到底了");
								this.noMoreData=true;
							}
							this.afterFetch("Up");
						}).catch((error)=>{
							this.afterFetch("Up");
						})
					},1000)
	    	}    	
	    },
      // 获取列表
      fetchData(){
        console.log(this.type);
        this.issearching = true
        this.$ajax.get(`/${this.type}?count=10&start=0`).then((res)=>{
          console.log(res)
          this.issearching = false
          if(res.data.subjects.length>0){
            this.filmList = res.data.subjects
          }
        }).catch((error)=>{
          this.issearching=false;	   	    		
          alert(error)
        })
      },
      initScroll(el){
        return new BScroll(el,{
          click:true,
          probeType:3,
          pullDownRefresh:DOWN_CONFIG,
          pullUpLoad:UP_CONFIG
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .film_wrap{
    height: 100%;
    overflow: hidden;
    position: relative;
    ul{
      padding-top: 46px;
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

  #loading{
    text-align: center;
    position: absolute;
    z-index: 100;
    width: 100%;
    &.center{			
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
    }
    &.pullDownLoading{
      position: absolute;
      top:48px;left:0;
    }
    &.pullUpLoading{
      position: absolute;
      bottom:0;left:0;
    }
  }  

  .loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .slide-enter-active{
    transition:all 0.4s;
  }
  .slide-enter, .slide-leave-active{
    transform:translate3d(100%,0,0);
    transition:all 0.4s;
  }
  .top-enter-active,.bot-enter-active{
    transition:all 0.2s;
	}
	.top-enter, .top-leave-active{
    transform:translateY(-100%);
    transition:all 0.2s;
	} 
	.bot-enter, .bot-leave-active{
    transform:translateY(100%);
    transition:all 0.2s;
	}  
</style>