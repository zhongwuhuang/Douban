<template>
  <div>
    <img src="@/assets/img/loading.gif" alt="">
    <span>{{loadingWord}}</span>
  </div>
</template>

<script>
  export default {
    props:{
      loadingWord:{
    		type:String
    	}
    }
  }
</script>

<style scoped lang="scss">
  div{
    text-align: center;
    img{
      vertical-align: middle;
    }
  }
</style>