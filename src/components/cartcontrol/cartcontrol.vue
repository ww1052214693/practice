<template>
<div class="cartcontrol">
  <!--商品减少按钮-->
  <!--判断: 当点击按钮添加了这个商品,则显示着个减少按钮-->
  <!--添加和减少都是字体图标-->
  <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0 " @click.stop="decreaseCart"></div>
  <!--添加的商品的个数-->
  <div class="cart-count" v-show="food.count>0 ">{{food.count}}</div>
  <!--商品添加的按钮-->
  <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
</div>
</template>

<script type="text/ecmascript-6">
  import Vue from "vue"
export default {
  props: {
    //子组件的food参数,从父组件那里传过来的
    food: {
      type: Object
    }
  },
  created(){
    // console.log(this.food);
  },

  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }

      //当food中count属性不存在时,添加一个属性count为1
      if (!this.food.count) {
        // this.food.count = 1;    这样写不会起效,所以要使用Vue.set()方法,使用之前需要先引入vue文件


        /*

       Vue.set() 响应式新增与修改数据:
        调用方法：Vue.set( target, key, value )

        target：要更改的数据源(可以是对象或者数组)

        key：要更改的具体数据

        value ：重新赋的值 */
        Vue.set(this.food,"count",1)
      } else {
        this.food.count++;
      }

    },


    decreaseCart (event) {
      if (!event._constructed) {
        return;
      }

      if (this.food.count) {
        this.food.count--;
      }
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">

  .cartcontrol
    .cart-decrease, .cart-add
      display: inline-block
      padding:6px
      line-height:24px
      font-size:24px
      color: rgb(0,160,220)

    .cart-count
      display: inline-block
      vertical-align:top
      width:12px
      padding-top:6px
      line-height:24px
      text-align:center
      font-size:10px
      color: rgb(147,153,159)
    .cart-add
      display: inline-block


</style>

