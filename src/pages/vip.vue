<template>
  <div>
    <button @click="isShow=!isShow">点击个人中心</button>
    

    <transition name="slide">
      <!-- <v-touch tag="div" v-on:swipeleft="hideSilde" class="other-set" v-show="isShow">                    
      </v-touch>            -->
      <div class="other-set" v-show="isShow">                    
      </div>           
    </transition>
    <div class="shadow" v-show="isShow" @click="isShow=!isShow"></div>    
  </div>
</template>

<script>
export default {
    data(){
        return {
            isShow:false           
        }
    },

    methods:{
        hideSilde(){
            this.isShow=!this.isShow
        }
    }
}
</script>

<style scoped>

.shadow{
    position: absolute;
    width:100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    top:0;
    left:0;
    z-index: 9999;
}
.other-set{
    position: absolute;
    top:0;
    left:0;
    width:70%;
    background: #97e7a8;
    height: 100%;
    z-index: 99999;
    /* @include flex-center; */
    flex-direction:column;
}


    .slide-enter-active{
        transition:all 0.4s;
    }
    .slide-enter, .slide-leave-active{
        transform:translateX(-100%);
        transition:all 0.4s;
    }

</style>