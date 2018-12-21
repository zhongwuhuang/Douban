<template>
  <div>
    <!-- <transition name="fade"> -->
      <router-view></router-view>
    <!-- </transition> -->
    <foot-nav class="foot-nav"></foot-nav>
  </div>
</template>

<script>
  import footNav from '@/components/footNav.vue'
  export default {
    components:{
      footNav
    }
  }
</script>

<style scoped>
  .foot-nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>