<template>
<transition name="slide" mode="out-in"> 
  <div>
    <headComponent :headTitle="filmDetail.title"></headComponent>

    <div class="detail">
      <div class="detail_head" :style="{backgroundImage:'url('+image+')'}">
        <div class="back">
          <i class="iconfont icon-huitui" @click="$router.back()"></i>
        </div>
        <div class="shadow flexboxrow">
          <div class="flexboxitems" style="width:90px;margin-top: 80px;">
            <img :src="image" alt="">
          </div>
          <div class="flexboxitems" style="flex:1; padding-left:20px;">
            <p>{{filmDetail.title}}</p>
            <p>
              <span class="rating">{{rating}}</span>
              <span>
                <i :class="{rankcolor:rating>((i-0.5)*2)}" v-for="i in 5" :key="i" class="iconfont icon-shoucang"></i>
              </span>
            </p>
            <p>{{filmDetail.ratings_count}} 人评价</p>
          </div>
        </div>
      </div>

      <div class="detail_content">
        <div class="detail_content_info">
          <p>导演：<span>{{getDirectors(filmDetail.directors)}}</span></p>
          <p>类型：<span>{{filmDetail.genres&&filmDetail.genres.join('/')}}</span></p>
          <p>年份：<span>{{filmDetail.year}}</span></p>
          <p>地区：<span>{{filmDetail.countries&&filmDetail.countries.join('/')}}</span></p>
        </div>
        <div class="detail_content_breif">
          <h4>{{filmDetail.title}}的简介</h4>
          <p>{{filmDetail.summary}}</p>
        </div>
      </div>
    </div>

    <!-- 添加到购物车 -->
    <div class="addGoods">
      <button @click="addToCar(id)">添加数据到vuex</button>
      <span class="addTip" v-if="isAdd">+1</span>
    </div>

    <div class="loading" v-show="loading"><img src="@/assets/img/transition.gif" alt=""></div>
  </div>
</transition> 
</template>

<script>
  import headComponent from '@/components/head.vue'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        // id:this.$route.params.id,
        filmDetail: {},
        loading: false,
        isAdd: false,
      }
    },
    computed:{
      id() {
        return this.$route.params.id
      },
      image(){
        return this.filmDetail.images?this.filmDetail.images.large:''
      },
      rating(){
        return this.filmDetail.rating?this.filmDetail.rating.average:0
      },
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
    //  '$route': 'fetchData'
    },
    components:{
      headComponent
    },
    methods:{
      ...mapMutations(['addGoods']),
      // 获取数据
      fetchData(){
        this.loading = true
        this.$ajax.get(`/subject/${this.id}`).then(res=>{
          console.log(res);
          this.filmDetail = res.data
          this.loading = false
        })
      },
      getDirectors(arr){
        let name="";  
        if (arr && arr.length > 0) {
          arr.forEach((item,i)=>{
              if(i==arr.length-1){
                  name+=item.name
              }else{
                  name+=item.name+" / "
              }               
          })
        }
        return name  
      },
      // 加入购物车
      addToCar(id){
        let carList = this.$store.state.goodsList
        let idExist = carList.find(item => id == item.id)
        if(!idExist){
          let data = {
            url:this.image,
            title:this.filmDetail.title,
            price:Math.floor(Math.random() * 100),
            stock: '盒',
            number: 1,
            select: true,
            id: this.id
          }
          // 这里有两种方法调用addDoods方法
          this.$store.commit('addGoods',data)
          // this.addGoods(data)
          this.isAdd = true
        }else{
          alert('已加入购物车！')
        }
      }
    },
    mounted(){
      this.fetchData()
    }
  }
</script>

<style scoped lang="scss">
  .detail{
    padding-top: 44px;
    .detail_head{
      position: relative;
      color: #fff;
      height: 170px;
      background-size:cover;
      .back{
        position: absolute;
        top: 10px;
        left: 10px;
        color: #f21100;
        cursor: pointer;
      }
      .shadow{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        padding-left: 24px;
        .rankcolor{
          color: #59a794;
        }
        .rating{
          font-size: 24px;
        }
        img{
          width: 100%;
        }
      }
    }
    .detail_content{
      margin-top: 20px;
      padding: 10px 14px;
      .detail_content_info{
        span{
          color: #8BC34A;
        }
      }
      .detail_content_breif{
        h4{
          color: #333;
          padding: 10px 0;
        }
        p{
          text-align: justify;
        }
      }
    }
  }

  .addGoods{
    width: 60%;
    margin: 20px auto 0;
    text-align: center;
    position: relative;
    padding-bottom: 30px;
    button{
      border: 1px solid #77b59c;
      color: #77b59c;
      border-radius: 6px;
      padding: 6px 10px;
      outline: none;
      background: none;
    }
    .addTip{
      position: absolute;
      left: 104px;
      top: 6px;
      // transform: translate(-50%,-50%);
      color: #fff;
      padding: 2px 4px;
      background: #f21100;
      border-radius: 40%;
      animation: move 2s forwards;//把物体动画地从一个地方移动到另一个地方，并让它停留在那里：
    }
  }

  .loading{
    background: #fff;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    img{
      width: 70%;
      height: auto;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }

  .slide-enter-active {
    transition: all 0.4s;
    transform: translate3d(0, 0, 0);
  }
  .slide-enter,
  .slide-leave-active {
    transform: translate3d(-100%, 0, 0);
    transition: all 0.4s;
  }

  @keyframes move {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-100%);
    }
  }
</style>