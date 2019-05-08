<template>
  <div>
    <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <!--购物车图标-->
        <div class="logo-wrapper">
          <!--这里判断 :   若totalCount大于0,也就是用户选中商品后,添加一个新类heightLight-->
          <div class="logo" :class="{'heightLight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'heightLight':totalCount>0}"></i>
          </div>
          <!--购物车上用户选取商品的个数-->
          <!--这里判断,若用户添加商品后,才显示num这个元素,未添加时则隐藏-->
          <!--购物车图标上的商品总数-->
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'heightLight':totalCount>0}">¥{{totalPrice}}元</div>
        <div class="decr">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <!--完成去结算的功能-->
        <div class="pay" :class="{'enough':totalPrice >= minPrice }" @click.stop="payMoney">
          {{payDecr}}
        </div>
      </div>
    </div>



    <!--购物车详情页-->
    <transition name="open">
      <div class="shopCart-List" v-show="listShow">
        <div class="listHeader">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>{{food.price*food.count}}</span>
              </div>
              <!--这里调用了cartcontrol组件   1.引入此组件 2.注册此组件 3.调用此组件-->
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>


  </div>
    <!--遮罩层-->
    <transition name="mask">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>

  </div>
<!--若有些组件必需使用俩根元素,可以考虑在外面套一个大div-->

</template>

<script type="text/ecmascript-6">

  //引入better-scroll组件.产生滚动条
  import BScroll  from 'better-scroll';



  // 引入组件
  import cartcontrol from "../../components/cartcontrol/cartcontrol"




 export default {
   props: {
     //这个属性是一个数组,里面存的是每个商品的价格
     //购物车上所有的显示效果斗鱼这个属性有关

     //这个参数的值  是在   goods组件中的computed中定义的
     //存的是顾客选中的商品
     selectFoods:{
       type:Array,
       default() {
         return [];
       }
     },
     deliveryPrice:{
       type: Number,
       default:0
 },
     minPrice:{
       type:Number,
       default: 0
     }
   },
   data() {
     return {
       //此属性 与 listShow方法  和 toggleList方法有关
       fold:true

     }
   },
   computed:{
     //计算购物车添加的 所有商品的总价钱
     totalPrice() {
       var total=0;
       this.selectFoods.forEach((food)=>{
         total+=food.price * food.count;
       });
       return total;
     },
     //计算用户添加的商品的总个数
     totalCount() {
       var count=0;
       this.selectFoods.forEach((food)=>{
          count+=food.count;
       });
       return count;
     },
     //这个方法使用来判断用户点餐结算的总价个是否达到起送价格,根据不同的总价来显示不同的字样
     payDecr() {
       if (this.totalPrice===0) {
         return `¥${this.minPrice}元起送`;
       } else if (this.totalPrice < this.minPrice) {
         var cha=this.minPrice - this.totalPrice;
         return `还差¥${cha}元起送`
       } else if(this.totalPrice >= this.minPrice){
         return "去结算"

       }
     },


     //listShow方法和下面的toggleList方法 相关联
     //解释:   toggleList方法:若是用户没有选商品,这个方法什么都不返回;若选中了商品,则将fold值取反,此时执行了listShow方法,执行过后,商品页会被显示出来.
     listShow() {
       if (!this.totalCount) {
         this.fold=true;
         return false;
       }
       var show = !this.fold;
        if(show){
          //goods组件有类似代码
          //为了让cartcontrol组件在这个组件中能够触发点击事件
          this.$nextTick(()=>{
            if (!this.scroll){
              //这里的代码是给商品列表添加滚动效果
              //在创建better-scroll实例对象时传入俩参数,
              // 参数一:  需要添加滚动效果的那个dom元素
              //参数二:传入一个对象,里面存储的一些属性,具体是什么请百度;例如给需要添加滚动效果的那个dom元素的子元素添加点击事件,这里就加上一个属性click:true

              this.scroll=new BScroll(this.$refs.listContent,{
                click:true
              });
            }else{
              this.scroll.refresh();
            }

          })
        }


       return show;
     }
   },
   components:{
     cartcontrol
   },
   methods:{
     //与点击list-content,显示购物车详细列表的功能有关
     toggleList() {
       if (!this.totalCount) {
         return;
       }

       this.fold=!this.fold;
     },


   //  清空购物车函数
     empty() {
       //遍历这个数组,将所有添加的商品的count个数重置为0,就可以清空购物车
       this.selectFoods.forEach((food)=>{
         food.count =0;
       })
     },


   //  点击list-mask  隐藏购物车列表
     hideList() {
       this.fold=true;
     },

   //  点击去结算,触发事件
     payMoney() {
       if (this.totalPrice < this.minPrice) {
         return;
       }
       alert(`需支付¥${this.totalPrice}元`)
     }
   }
   }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position:fixed
    left:0
    bottom:0
    z-index:50
    width:100%
    height:48px
    .content
      display: flex
      background-color: #141d27
      /*左边的区域自适应    右边的结算区域固定占一块区域      flex布局  */
      .content-left
        flex:1
        .logo-wrapper
          display:inline-block
          position:relative
          top: -10px
          margin:0 12px
          padding:6px
          width: 56px
          height:56px
          /*规定两个并排的带边框的框：*/
          box-sizing:border-box
          vertical-align:top
          border-radius:50%
          background-color: #141d27
          .logo
            width: 100%
            height:100%
            border-radius:50%
            background-color: #2b343c
            text-align:center
            &.heightLight
              background-color: rgb(0,160,220)
            .icon-shopping_cart
              line-height:44px
              font-size:24px
              color: #80858a
              &.heightLight
                color: #fff;

          .num
            position:absolute
            top:0
            right:0
            width:24px
            height:16px
            line-height:16px
            text-align:center
            border-radius:16px
            font-size:9px
            font-weight:700
            color: #fff
            background-color: rgb(240,20,20);
            box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)

        .price
          display:inline-block
          vertical-align:top
          margin-top:12px
          line-height:24px
          padding-right:12px
          box-sizing:border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size:16px
          font-weight:700
          color:rgba(255,255,255,0.4)
          &.heightLight
            color: #fff
        .decr
          display:inline-block
          vertical-align:top
          margin:12px 0 0 12px
          line-height:24px
          font-size:10px
          color: rgba(255,255,255,0.4)
      .content-right
        flex:0 0 105px
        width:105px
        .pay
          height:48px
          line-height:48px
          font-size:12px
          font-weight:700
          text-align: center
          color: rgba(255,255,255,0.4)
          background-color: #2b333b;
          &.enough
            background-color: #00b43c;
            color: #fff


    .shopCart-List
      position:absolute
      left:0
      top:0
      z-index: -1
      width: 100%
      transform:translate3d(0,-100%,0)

      &.open-enter-active
        transition:all 1s

      &.open-leave-active
        transition:all 0.5s



      &.open-enter, &.open-leave-to
        transform:translate3d(0,0,0)

      .listHeader
        height:40px
        line-height:40px
        padding:0 18px
        background-color: #f3f5f7
        border-bottom:1px solid rgba(7,17,27,0.1)
        .title
          float: left
          font-size:14px
          color: rgb(7,17,27)
        .empty
          float:right
          font-size:12px
          color: rgb(0,160,220)




      .list-content
        padding:0 18px
        max-height:217px
        overflow:hidden
        background-color:#fff
        .food
          position:relative
          padding:12px 0
          box-sizing: border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height:24px
            font-size:14px
            color: rgb(7,17,27)
          .price
            position:absolute
            right:90px
            bottom:12px
            line-height:24px
            font-size:14px
            font-weight:700
            color: rgb(240,20,20)
          .cartcontrol-wrapper
            position:absolute
            right:0
            bottom:6px





  .list-mask
    position:fixed
    top:0
    left:0
    width: 100%
    height: 100%
    z-index:40
    background-color: rgba(7,17,27,0.6);
    /*设置模糊效果*/
    backdrop-filter:blur(10px)
    &.mask-enter-active
      transition:all 1s
    &.mask-leave-active
      transition:all 0.5s
    &.mask-enter, &.mask-leave-to
      opacity:0
      background-color: rgba(7,17,27,0)



</style>

