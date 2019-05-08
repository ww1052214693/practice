<template>
<div class="header">
  <!--内容区域   wrapper:包装-->
  <div class="content-wrapper">
      <div class="logo">
        <!--这里图片的地址要用v-bind形式添加,因为是请求的是mock数据,所以如果用src来指定地址的话会报错-->
        <img width="60" height="60" :src="seller.avatar">
      </div>
      <div class="content">
        <!--logo旁的标题-->
        <div class="title">
          <!--brand : 平拍-->
          <span class="brand"></span>
          <!--店名-->
          <span class="name">{{seller.name}}</span>
        </div>
          <!--店名下的描述    蜂鸟专送....-->
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <!--这里的v-if判断,若seller.supports的值不为空,就是true,下面的子元素才会显示出来.因为seller对象中的值是在vue生命周期函数created的这个过程中赋值的.若不加v-if这个判断,则这条语句会报错-->
          <div v-if="seller.supports" class="support">
            <span class="ico" :class="classMap[seller.supports[0].type]" ></span>
            <span class="text">
              {{seller.supports[0].description}}
            </span>
          </div>


      </div>
    <!--@click="showDetail"-->
      <div class="support-count" v-if="seller.supports" >
        <span class="count"></span>
        <!--{{seller.supports.length}}-->
        <i class="icon-keyboard_arrow_right"></i>
  </div>
  </div>
  <!--公告区域   bulletin:公告-->
  <div class="bulletin-wrapper" >
    <span class="bulletin"></span>
    <span class="bulletin-text" >{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <!--logo这部分区域的背景图片-->
  <div class="background">
    <img :src="seller.avatar" width="100%" height="100%">
  </div>
  <!--商家详情介绍页面-->
  <!--skldfgjsdjkgjkldfjklghjkldfjklhjfgjklhjkfgj-->
  <transition name="fade">
    <div class="detail" v-show="detailShow" >
    <!--采用stickyFooters布局方式,达到 页面底部的元素会随着页面内容的增多而往下移动--><!--固定写法     clearfix 清除浮动-->

      <!--登录界面-->
      <form action="" method="post" class="form">
        <div class="form-group">
          用户名: <input type="text" placeholder="请输入用户名" name="username">
        </div>
        <div class="form-group">密码:&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入密码" name="password">
        </div>
        <button type="submit" class="login">登录</button>
        <button type="button" class="zhu_ce"><router-link to="/register">注册</router-link></button>


      </form>



    <!--用来关闭此页面-->
    <div class="detail-close" @click="closeDetail">
      <i class="icon-close"></i>
    </div>
  </div>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">

  //在一个组件中使用另一个组件的方法:
  // 1.引入这个组件
  // 2.注册这个组件名     components:{组件名}
  // 3.在html区域 调用这个组件   <组件名></组件名>

  // 引入评价的星星的这个组件
  import star from '../star/star';

  export default {
    props:{
      seller:{
        type:Object
    }
    },
    //data 数据层
    data(){
      return {
        detailShow:false
      }
    },
    methods:{
      showDetail(){
        this.detailShow=true;
      },
      closeDetail(){
        this.detailShow=false;

      }
    },

    //注册星星组件
    components:{
      star
    },
    created() {
      this.classMap=["decrease","discount","guarantee","invoice","special"]

    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"


  .header
    color: #fff
    background-color:rgba(7,17,27,0.5)
    position:relative
    overflow:hidden
    .content-wrapper
      position:relative
      padding:24px 16px 18px 24px
      .logo
        display:inline-block
        /*设置图片与文字顶部对齐*/
        vertical-align:top
        img
          border-radius:2px
      .content
        display: inline-block
        padding-left:16px
        font-size:14px
        .title
          margin:2px 0 8px 0
          .brand
            display:inline-block
            /*设置背景图片与文字的对齐方式*/
            vertical-align:top
            width: 30px
            height: 18px
            bg-image("brand")
            background-size:30px 18px
            background-repeat:no-repeat
          .name
            margin-left:6px
            font-size:16px
            line-height: 18px
            font-weight:bold


        .description
          margin-bottom:5px
          line-height:12px
          font-size:12px
        .support
          .ico
            display:inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right:4px
            background-color: red;
            background-size:12px 12px
            background-repeat:no-repeat
            margin-top:2px
            &.decrease
              bg-image("decrease_1")
            &.discount
              bg-image("discount_1")
            &.guarantee
              bg-image("guarantee_1")
            &.invoice
              bg-image("invoice_1")
            &.special
              bg-image("special_1")

          .text
            line-height: 12px
            font-size:12px
      .support-count
        position:absolute
        right:12px
        bottom: 18px
        display: block
        padding:0 8px
        /*width: 46px;*/
        height: 24px
        line-height:24px
        border-radius:14px
        background-color: rgba(0,0,0,0.2)
        text-align:center
        .count
          font-size:10px
        .icon-keyboard_arrow_right
          font-size:10px
    .bulletin-wrapper
      background-color: rgba(0,0,0,0.2);
      position:relative
      height: 28px
      line-height:28px
      padding:0 22px 0 12px
      /*规定段落中的文本不会换行*/
      white-space:nowrap
      overflow:hidden
      /*被hidden 隐藏住的文字用三个小点显示*/
      text-overflow: ellipsis
      .bulletin
        display:inline-block
        margin-top:8px
        width: 22px
        height: 12px
        bg-image("bulletin")
        background-size:22px 12px
        background-repeat:no-repeat
      .bulletin-text
        vertical-align:top
        font-size:10px
      .icon-keyboard_arrow_right
        position:absolute
        font-size:10px
        right:12px
        bottom:8px

    .background
      position:absolute
      width: 100%
      height:100%
      top:0
      left:0
      z-index:-1
      /*设置图片的模糊程度,像素越大,越模糊*/
      filter:blur(10px)
    .fade-enter-active
      transition:all 0.5s
    .fade-enter
      opacity:0
      background-color: rgba(7,17,27,0);

    .detail
      position:fixed
      top:0
      left:0
      width: 100%;
      height: 100%
      overflow:auto
      background-color: #fff
      z-index:1000
      .form
        width: 300px
        height: 50%
        margin:200px auto 0
        text-align:center
        position:relative

      .form-group
        margin-top:20px
        width:300px
        color: #000
        input
          margin-left:15px
          border:1px solid #000

      .login
        width:80px
        height:40px
        position:absolute
        left:10px
        top:100px

      .zhu_ce
        width:80px
        height:40px
        text-align: center
        line-height:40px
        /*border-radius:10px*/
        position:absolute
        left:208px
        top:100px



        a
          display:block
          width: 100%
          height:100%
          color: #000
      .detail-close
        position:fixed
        width: 100%
        height:32px
        left:0
        bottom:0
        /*background-color: red;*/
        text-align:center
        font-size:32px
        line-height:32px

</style>
