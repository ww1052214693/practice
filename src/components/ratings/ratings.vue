<template>
<div class="ratings" ref="rating">
  <div class="rating-wrapper">
    <div class="overview">
      <div class="overview-left">
        <div class="score">{{seller.score}}</div>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star :size="36" :score="seller.serviceScore"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <star :size="36" :score="seller.foodScore"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"  :ratings="ratings" @ratingType="son" @ratingContent="son1"></ratingselect>
    <div class="rating-wrapper" >
      <ul>
        <li  v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
          <div class="avatar">
            <img  :src="rating.avatar" width="28px" height="28px">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" >{{rating.deliveryTime}}</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend">
              <span :class="[{'icon-thumb_up': rating.rateType===0},{'icon-thumb_down': rating.rateType===1}]"></span>
              <span v-for="(item,i) in rating.recommend" class="item">{{item}}</span>
          </div>
            <div class="time">
              {{rating.rateTime | formatDate}}
            </div>
          </div>
        </li>
      </ul>

    </div>

  </div>
</div>
</template>

<script type="text/ecmascript-6">
  var all=2;
  var err_ok=0;


  import {getDate} from "../../common/js/date";

  // 引入better-scroll插件
  import BScroll from "better-scroll"

  //引入star组件
  import star from "../star/star"

 // 引入split组件
  import split from  "../split/split"


 // 引入selectrating组件
  import ratingselect from "../ratingselect/ratingselect"

 export default {

   props:{
     seller:{
       type:Object
     }
   },
   methods:{
     //通过子组件传过来的 selectType 和 onlyContent(是否显示评价内容)的值来改变显示的评价内容
     needShow(type,text) {
       if (this.onlyContent && !text) {
         return false
       }
       //all=2
       if (this.selectType === all) {
         return true
       } else {
         //type是rating.ratetype,评价中的一个属性值,0为好评,1为差评
         return type === this.selectType
       }
     },

     son(type){
       this.selectType=type;
     },

     son1(type) {
       this.onlyContent=type;
     }

   },
   data() {
     return {
        ratings:[],
        selectType:all,
        onlyContent:true,
        desc: {
         all:"全部",
         positive:"推荐",
         negative:"吐槽"
       }
     }
   },


   created() {
     this.$http.get("/api/ratings").then((response)=>{
       response=response.body;
       if (response.errno === err_ok) {
         this.ratings = response.data;
         console.log(this.ratings);
         this.$nextTick(()=>{
           this.ratingScroll=new BScroll(this.$refs.rating,{
             //为了让menuWrapper能注册点击事件,所以这里需要如下代码
             click:true
           });

         });

       }

     });



   },
   filters:{
     formatDate(time){
       var date = new Date(time);
       // 单独抽成一个模块,需要的时候在外部引入进来,这个方法放在  common/date.js
       return getDate(date);

     }
   },

   components:{
     star,
     split,
     ratingselect


   }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position:absolute
    top:174px
    bottom:0
    width:100%
    left:0
    overflow:hidden
    .overview
      display:flex
      padding:18px 0
      .overview-left
        flex:0 0 137px
        padding:6px 0
        width:137px
        border-right:1px solid rgba(7,17,27,0.1)
        text-align:center
        .score
          margin-bottom:6px
          line-height:28px
          font-size:24px
          color: rgb(255,153,0)
        .title
          margin-bottom:8px
          line-height:12px
          font-size:12px
          color: rgb(7,17,27)
        .rank
          line-height:10px
          font-size:10px
          color: rgb(147,153,159)
      .overview-right
        flex:1
        padding:6px 0 6px 24px
        .score-wrapper
          margin-bottom:8px
          line-height:18px
          .title
            font-size:12px
            color: rgb(7,17,27)
          .star
            display:inline-block
            margin:0 12px
            vertical-align:top
          .score
            display: inline-block
            line-height:18px
            vertical-align:top
            font-size:12px
            color: rgb(255,153,0)
        .delivery-wrapper
          .title
            line-height:18px
            font-size:12px
            color: rgb(7,17,27)
          .delivery-time
            margin-left:12px
            font-size:12px
            color: rgb(147,153,159)





    .rating-wrapper
      padding:0 18px
      .rating-item
        display:flex
        padding:18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex:0 0 28px
          width:28px
          margin-right:12px
          img
            border-radius:50%
        .content
          position:relative
          flex:1
          .name
            margin-bottom:4px
            line-height:12px
            font-size:10px
            color: rgb(7,17,27)
          .star-wrapper
            margin-bottom:6px

            .star
              display:inline-block
              margin-right:6px
              vertical-align:top
            .delivery
              display:inline-block
              vertical-align:top
              font-size:12px
              color: rgb(147,153,159)




          .text
            margin-bottom:8px
            line-height:18px
            color: rgb(7,17,27)
            font-size:12px
          .recommend
            line-height:16px
            .icon-thumb_up, .icon-thumb_down, .item
              display:inline-block
              margin:0 8px 4px 0
              font-size:9px
            .icon-thumb_up
              color: rgb(0,160,220)
            .item
              padding:0 6px
              border:1px solid rgba(7,17,27,0.1)
              border-radius:1px
              color: rgb(147,153,159)
              background-color: #fff;

          .time
            position:absolute
            top:0
            right:0
            font-size:12px
            color: rgb(147,153,159)
</style>

