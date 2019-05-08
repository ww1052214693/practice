<template>
<div class="ratingselect">
  <div class="rating-type border-1px">
    <!--这里的desc的值可能是外部传入的-->
    <!--这里判断selectType的值,由父组件food传过来,值2为全部评论,0为推荐,1位吐槽,添加active这个类,高亮显示-->
    <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
    <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{post.length}}</span></span>
    <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{worse.length}}</span></span>
  </div>

  <!--这里的onlyContent由父组件food传过来-->
  <div @click="toggleContent" class="switch" :class="{'on':currentOnlyContent}">
    <span class="icon-check_circle"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  //推荐评价
  const post=0;
  //吐槽评价
  const worse=1;
  //所有评价
  const all=2;


  export default {
    props:{
      //由父组件获取mock数据,然后传过来,子组件接收
      ratings:{
        type:Array,
        default() {
          return [];
        }
      },
      selectType:{
        type:Number,
        default:all
      },
      onlyContent:{
        type:Boolean,
        default:false
      },
      desc:{
        type:Object,
        default() {
          return {
            all:"全部",
            positive:"满意",
            negative:"不满意"
          }
        }
      }
    },
    data() {
      return {
        currentSelectType:this.selectType,
        currentOnlyContent:this.onlyContent
      }
    },

    //计算属性
    computed:{

      post() {
        //filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
        //如下代码的意思:过滤ratings数组中元素的属性值rateType等于post值的元素,并返回一个数组

        return this.ratings.filter((rating)=> {
          //返回的是一个数组,这里的rateType对应data.json中的数据
          return rating.rateType === post;
        });
      },

      worse() {
        return this.ratings.filter((rating)=> {
          return rating.rateType === worse;
        });
      }



    },
    methods:{
      select(type,event) {
        // console.log("哈哈哈");
        if (!event._constructed) {
          return
        }
        this.currentSelectType=type;


        //$dispatch被vue2.0废弃
        /*  提交名为ratingtype的自定义事件给父组件(也就是在父组件中使用这个子组件时<ratingselect></ratingselect>,在这个子组件上注册ratingType事件),在父组件的methods方法中定义事件函数.这里的子组件中的type值将作为这个事件函数的参数传给父组件  */
        this.$emit("ratingType",type);

      },


      toggleContent() {
        if (!event._constructed) {
          return
        }
        this.currentOnlyContent=!this.currentOnlyContent;
        this.$emit("ratingContent",this.currentOnlyContent)
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding:18px
      margin:0 18px
      border-1px(rgba(7,17,27,0.1))
      .block
        display:inline-block
        padding:8px 12px
        margin-right:8px
        border-radius:1px
        font-size:12px
        color:rgb(77,85,93)
        &.active
          color:rgb(77,85,93)
        .count
          margin-left:3px
          font-size:8px

        &.positive
          background-color: rgba(0,160,220,0.6)
          &.active
            background-color: rgb(0,160,220)

        &.negative
          background-color: rgba(77,85,93,0.2)
          &.active
            background-color: rgb(77,85,93)




    .switch
      padding:12px 18px
      line-height:24px
      border-bottom:1px solid rgba(7,17,27,0.1)
      color: rgb(147,153,159)
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        margin-right:4px
        font-size:24px
        vertical-align:middle
      .text
        font-size:12px

</style>

