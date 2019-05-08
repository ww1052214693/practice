<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}元</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}元</span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}分钟</span>
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="(item,i) in seller.supports">

            <span class="icon" :class="classMap[seller.supports[i].type]"></span>
            <span class="text">{{seller.supports[i].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="picList" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>

      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <div class="ul">
          <li class="info-item" v-for="(info,i) in seller.infos">{{info}}</li>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import star from "../../components/star/star"

  import split from "../../components/split/split"

  import BScroll from "better-scroll"

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    },
    watch: {
      //在seller值发生变化的时候初始化BScroll,才会有滚动效果
      "seller"() {
        this._initScroll();
        this._initPics();
      }
    },

    methods: {
      _initScroll() {
        if (!this.scroll) {
          //怎么初始化BScroll?  需要看在什么时候初始化该插件;这里的组件中的BScroll是在后台将数据赋值给seller发生改变时,和mounted这个生命周期函数时初始化该插件
          this.scroll = new BScroll(this.$refs.seller, {
            //为了让menuWrapper能注册点击事件,所以这里需要如下代码
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },


      _initPics() {
        if (this.seller.pics) {

          var picWidth = 120;
          var margin = 6;
          var width = (picWidth + margin) * this.seller.pics.length-margin;
          this.$refs.picList.style.width = width + "px";
          this.$nextTick(()=>{
            if (!this.picScroll) {
            this.picScroll=new BScroll(this.$refs.picWrapper,{
              scrollX:true,
              eventPassthrough:"vertical"

              })
            }else{
              this.picScroll.refresh();
            }
          })

        }
      }


    },
    created() {
      this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"];

    },
    mounted() {

      this._initScroll();
      // this._initPics();
      console.log("哈哈");
    }
    //生命周期函数,   在页面上的所有的dom元素渲染完成后执行这个函数
    //   ready() {
    //       var scroll=new BScroll(this.$refs.seller,{
    //         click:true
    //       })
    //   }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .desc
        padding-bottom: 18px

        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display: inline-block
          margin-right: 8px
          vertical-align: top
        .text
          display: inline-block
          margin-right: 12px
          line-height: 14px
          vertical-align: top
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-size: 12px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px

    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .content-wrapper
        padding: 0 12px 16px 12px
        border: 1 px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)

      .supports
        .support-item
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: middle
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image("decrease_4")
          &.discount
            bg-image("discount_4")
          &.guarantee
            bg-image("guarantee_4")
          &.invoice
            bg-image("invoice_4")
          &.special
            bg-image("special_4")

        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)

    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .picList
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &.last-child
              margin-right: 0



    .info
      padding:18px 18px 0 18px
      color: rgb(7,17,27)
      .title
        margin-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .info-item
        padding:16px 12px
        line-height:16px
        border-1px(rgba(7,17,27,0.1))
        &.last-child
          border:none

</style>

