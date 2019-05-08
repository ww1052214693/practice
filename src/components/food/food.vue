<template>
  <transition name="food-show">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <!--图片下面的内容-->
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <!--这里判断 foods中这个属性的值是否为空,若为空这里就不显示这个原价-->
            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>

          <!--引入cartcontrol组件-->
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <!--购物车按钮-->
          <!--判断:如果用户添加过该商品,或该商品的count值为0,则不显示这个元素-->
          <div @click="add" class="buy" v-show="!food.count || food.count ===0 ">加入购物车</div>
        </div>

        <split v-show="food.info"></split>
        <!--商品的信息介绍-->
        <!--注意:有的商品后台数据中没有info属性,所以有此属性才显示这个元素,没有就不显示-->
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>

        <split></split>

        <div class="rating">
          <h1 class="title">商品评价</h1>


          <!--将父组件中的值传入到子组件中-->
          <!--子组件中的属性名 selectType  这里传值是 要写成 select-type的形式-->
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"  :ratings="food.ratings" @ratingType="son" @ratingContent="son1"></ratingselect>

          <!--评论区域-->
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="12px" height="12px">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <!--这里要给:class设置多个class判断的话,或设置多个类名,可以用数组的方式达成想要的效果-->
                  <span :class="[{'icon-thumb_up': rating.rateType===0},{'icon-thumb_down': rating.rateType===1}]"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>

  </transition>
</template>

<script type="text/ecmascript-6">
  //引入 vue
  import Vue from "vue"


  // 引入better-scroll插件
  import BScroll from "better-scroll"

  //引入 cartcontrol 组件
  import cartcontrol from "../../components/cartcontrol/cartcontrol"


  //引入 split 组件  ,子组件是一个分割矩形区域
  import split from "../../components/split/split"


  //引入ratingselect组件    评论组件   商品详情页中的
  import ratingselect from "../../components/ratingselect/ratingselect"



  //引入外部js文件    因为js文件中使用export创建的方法,所以这里要加个{}
  //而通过export default {}    的不用加
  import {getDate} from  "../../common/js/date"


  //此三个变量 关联 ratingselect 组件
  const post=0;
  const worse=1;
  const all=2;



  export default {
    props:{
        //由父组件(goods组件传入的值),food来接收
        food:{
          type:Object
        }
    },
    data() {
      return {
        showFlag:false,

        //此三个属性 关联 ratingselect组件
        selectType:all,
        onlyContent: true,
        desc: {
          all:"全部",
          positive:"推荐",
          negative:"吐槽"
        }




      }
    },
    methods:{
      //定义一个显示food组件的方法,由父组件(goods组件)调用
      show(){
        this.showFlag=true;
      //  在显示商品详情页面的时候,加载better-scroll插件,在内容超过适口的高度时,可以滚动页面



        //项目中多个地方有可能用到ratingselect组件,所以每次在商品详情页弹出之后.初始化其中的一些数据
        //关联的 组件  ratingselect
        this.selectType=all;
        this.onlyContent=true;





      //  和$nextTick()这个函数结合使用
        this.$nextTick(()=>{
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click:true
            });
          } else{
            this.scroll.refresh();
          }
        });
      },
      hide(){
        this.showFlag=false
      },


    //  点击 .buy元素  加入购物车
      add(event) {
        if (!event._constructed) {
          return
        }

        Vue.set(this.food,"count",1)

      },

      //显示评论的方法, 关联组件  ratingselect组件
      needShow(type,text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === all) {
          return true
        } else {
          return type === this.selectType
        }
      },




      /*
      * 父组件怎么获取子组件传过来的属性值?
      *
      * 子组件: this.$emit("a(方法名)",b(子组件中的属性) )    可以看ratingselect中的用法
      *
      * 父组件: 父组件中引入子组件   例:<ratingselect></ratingselect>,在这上面注册事件  v-on:方法名,   然后在methodes里面注册这个事件    用法参考这个组件中ed实例
      *
      *
      * */

      //获取子组件传过来的值的方法
      son(type){
        this.selectType=type;
      },

      son1(type) {
        this.onlyContent=type;
      }

    },

    filters:{
      formatDate(time){
        var date = new Date(time);
        // 单独抽成一个模块,需要的时候在外部引入进来,这个方法放在  common/date.js
        return getDate(date);

      }
    },


    components:{
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"


    .food
      position:fixed
      top:0
      left:0
      /*给购物车留的位置*/
      bottom:48px
      z-index:30
      width: 100%
      background-color: #fff;
      &.food-show-enter-active
        transition:all 1s
      &.food-show-leave-active
        transition:all 1s
      &.food-show-enter, &.food-show-leave-to
        transform:translate3d(100%,0,0)
      .image-header
        position:relative
        /*设置图片容器的宽度和屏幕一样宽,高度设置0,在设置顶部外边距100%,这样显示出来的效果是图片容器的宽度和高度相等,都是屏幕的宽度.这个方法很实用,需记住*/
        width: 100%
        height:0
        padding-top: 100%
        img
          position:absolute
          left:0
          top:0
          width: 100%
          height:100%
        .back
          position:absolute
          left:0
          top:10px
          .icon-arrow_lift
            display:block
            padding:10px
            font-size:20px
            color: #fff




      .content
        position:relative
        padding:18px
        .title
          line-height:14px
          margin-bottom:8px
          font-size:14px
          font-weight:700
          color:rgb(7,17,27)
        .detail
          margin-bottom:18px
          line-height:10px
          .sell-count, .rating
            font-size:10px
            color: rgb(147,153,159)
          .sell-count
            margin-right:12px


        .price
          font-weight:700
          line-height:24px
          .now
            margin-right:8px
            font-size:14px
            color: rgb(240,20,20)
          .old
            /*给文字添加中横线*/
            text-decoration:line-through
            font-size:10px
            color: rgb(147,153,159)


        .cartcontrol-wrapper
          position absolute
          right:12px
          bottom:12px
        .buy
          position: absolute
          right:18px
          bottom:18px
          height:24px
          line-height:24px
          z-index:10
          padding:0 12px
          box-sizing:border-box
          border-radius:12px
          font-size:10px
          color: #fff
          background-color: rgb(0,160,220);



      .info
        padding:18px
        .title
          line-height:14px
          margin-bottom:6px
          font-size:14px
          color:rgb(7,17,27)
        .text
          line-height:24px
          padding:0 8px
          font-size:12px
          color: rgb(77,85,93)


      .rating
        padding-top:18px
        .title
          line-height:14px
          margin-bottom:6px
          font-size:14px
          color: rgb(7,17,27)

        .rating-wrapper
          padding:0 18px
          .rating-item
            position:relative
            padding:16px 0
            border-1px(rgba(7,17,27,0.1))
            .user
              position:absolute
              right:0
              top:16px
              line-height:12px
              .name
                display:inline-block
                margin-right:6px
                /*vertical-align:top*/
                font-size:10px
                color: rgb(147,153,159)
              .avatar
                border-radius:50%

            .time
              margin-bottom:6px
              line-height:12px
              font-size:10px
              color: rgb(147,153,159)

            .text
              line-height:16px
              font-size:12px
              color:rgb(7,17,27)
              .icon-thumb_up, .icon-thumb_down
                margin-right:4px
                line-height:24px
                font-size:12px
              .icon-thumb_up
                color: rgb(0,160,220)
              .icon-thumb_down
                color:rgb(147,153,159)

          .no-rating
            padding:16px 0
            color:rgb(147,153,159)





</style>

