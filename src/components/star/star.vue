<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const length=5;
  const on='on';
  const half='half';
  const off='off';

  /*
  * 1.starType这个方法返回一个字符串,代表的是哪个尺寸的图片 24 48 36, 然后 .star 添加了一个新类,名字就是哪个尺寸的图片名
  *
  * 2.itemClasses方法.返回一个数组,v-for遍历数组创建星星
  *
  * 3.  :itemClass 数组中遍历的那个元素;为span添加这个类,通过下面的css代码给span添加对应的图片
  *
  * */



  export default {
    //在header组件中引入这个star组件;则header为父组件,star为子组件;
    //props 则是在子组件上定义变量,在父组件上调用子组件时给这个两个属性 :size 和 :score赋值
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    /*Vuejs中关于computed、methods、watch的区别。

1#computed：计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

2#methods：methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

3#watch：是一种更通用的方式来观察和响应 Vue 实例上的数据变动。一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

通俗来讲：

computed是在HTML DOM加载后马上执行的，

如赋值；而methods则必须要有一定的触发条件才能执行，如点击事件；

watch呢？它用于观察Vue实例上的数据变动。对应一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项。*/
    computed:{
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        var result=[];
        var score=Math.floor(this.score*2)/2;
        var hasDecimal=score%1 !==0;
        var integer=Math.floor(score);
        for (var i=0;i<integer;i++) {
          result.push(on);
        }
        if (hasDecimal) {
          result.push(half);
        }
        while(result.length < length){
          result.push(off);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

  .star
    font-size:0
    .star-item
      display:inline-block
      background-repeat:no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right:22px
        background-size:20px 20px
        &:last-child
          margin-right:0
        &.on
          bg-image("star48_on")
        &.half
          bg-image("star48_half");
        &.off
          bg-image("star48_off")

    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right:6px
        background-size:15px 15px
        &:last-child
          margin-right:0
        &.on
          bg-image("star36_on")
        &.half
          bg-image("star36_half");
        &.off
          bg-image("star36_off")
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right:3px
        background-size:10px 10px
        &:last-child
          margin-right:0
        &.on
          bg-image("star24_on")
        &.half
          bg-image("star24_half");
        &.off
          bg-image("star24_off")
</style>

