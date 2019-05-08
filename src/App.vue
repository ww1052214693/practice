<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <!--出现问题:   shortcart组件  使用seller 会报错 ;但在这添加了seller属性错误消失    -->
   <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue';

  export default {
    data() {
      return {
        seller:{}
      };
    },
    //生命周期函数
    created() {
      //通过vue-resource插件中的get方法来取得mock的假数据,ajax异步请求.
      this.$http.get('api/seller').then((response) =>{
          response=response.body;
          if (response.errno===0){
            //this.seller是个对象.
            this.seller=response.data;
            // console.log(this.seller);

          }
      })
    },
    components: {
      "v-header": header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex:1
        text-align center
        &>a
          display: block
          font-size: 14px
          color: rgb(77,85,93)
          //类选择器
          &.router-link-active
            color: rgb(240,20,20)
</style>
