<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!--jkashfjdhsjhfjhsdjhgjsdfhg   current-->
          <li v-for="(item, i) in goods" class="menu-item"
              :class="{'current':currentIndex===i}" @click="selectMenu(i,$event)">
        <span class="text border-1px">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
        </span>

          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper" >
        <ul>
          <!--此处循环的是goods数组中的所有食物对象-->
          <!--food-list-hook  钩子  用来定位这个dom元素-->
          <li v-for="item in goods" class="food-list food-list-hook">
            <!--食物名-->
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <!--此处循环的是每个食物对象中的foods属性,比如 名字 价格 好评率等-->
              <li v-for="food in item.foods" class="food-item border-1px" @click="fooded(food,$event)"> <!--注册点击事件,将food参数传给selectedFoods数组,这里event要加个$,否则报错-->
                <!--食物的图片-->
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <!--食物的属性   名字 价格等-->
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span>
                    <!--这里判断 foods中这个属性的值是否为空,若为空这里就不显示这个原价-->
                    <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <!--调用cartcontrol组件-->
                  <div class="cartcontrol-wrapper">
                    <!--把food对象传入-->
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </div>
      <!--调用购物车组件-->
      <!--deliveryPrice:配送费  minPrice:起送费    selectFoods: 关联上shopcart组件中的props中的参数selectFoods  -->
      <!--子组件中props中的参数,需要在父组件中传参(传入值)子组件中才能使用的到.传参方式:    :selectFoods(对应的是子组件中props中的参数的名)="selectFoods"(引号中的内容是父组件中的某个方法或属性,此处的就是方法,将方法的返回值传给子组件的参数)       -->
      <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>

    </div>
                        <!--ref命令  用来找到此dom对象-->
      <food :food="selectedFoods" ref="food"></food>


  </div>

</template>

<script type="text/ecmascript-6">
  //npm 或 cnpm 安装 better-scroll插件,让页面生成一个滚动条
  //引入 better-scroll插件
  import BScroll  from 'better-scroll';


  //引入购物车组件
  import shopcart from "../../components/shopcart/shopcart"


  //引入添加减少商品的组件  cartcontrol组件
  import cartcontrol from  "../../components/cartcontrol/cartcontrol"


  //引入商品详情页组件   food组件
  import food from "../../components/food/food"


  var err_ok=0;
  export default {
    //接收父组件传过来的值
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return {
        //在created生命周期函数中接收data.json中的数据
        goods:[],
        //每个区块的高度
        listHeight:[],   //menuFoods每个区块(li)相对于顶部的距离
        scrollY:0,            //实时获得当前y轴的高度

        //关联 food 组件   商品详情页
         selectedFoods:{}
      };
    },
    computed:{
      //这个函数的作用是  右边的food-list 滚动到哪个区块后,左边的menu-list与之对应的内容会高亮显示


      //和左边的导航栏有关
      currentIndex() {
        for (var i=0;i<this.listHeight.length;i++){
          //举例子:  height1 是第一个区块的内容高度    0+第一个区块的高度(clientHeight)

          //         height2 是第二个区块的内容高度    0+第一个区块的高度+第二个区块的高度        都是相对于顶部ed距离
          var height1=this.listHeight[i];
          var height2=this.listHeight[i+1];
          if (!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
            //遇到return语句后,return后面你的代码不会被执行
            return i;
          }
        }
        return 0;
      },



      //关联的内容:    与shopcart组件有关,里面props有个子组件参数,selectFoods,这里是定义selectFoods中的内容
      selectFoods() {
        var foods=[];
        //循环遍历data.json中的goods数组
        //good是goods数组中的对象,good对象中有foods数组
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if (food.count){
              foods.push(food);
            }
          })
        });
        return foods;
      }
    },





    created() {
      //和打折的图片有关
      this.classMap=["decrease","discount","guarantee","invoice","special"];
      //请求后台数据
      this.$http.get('api/goods').then((response) => {
        response=response.body;
        if (response.errno === err_ok ) {
          this.goods=response.data;
          // console.log(this.goods);
          // console.log(response);
          //$nextTick:  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
          // console.log(this.goods);

          //better-scroll 的调用方式
          this.$nextTick(()=>{
            //此方法调用要放在$nextTick函数中调用才会让页面产生滚动条
            this._initScroll();      //给this.scrollY赋值,实时获得y轴的高度
            //计算每个区块的高度,这个区块就是 比如 热销榜 精选套餐
            // 从一个区块的标题上边框到下一个区块的标题的上边框的距离就是这个区块的距离
            this._calculateHeight();//给 listHeight赋值,计算每个区块相对于顶部的距离
          });

        }
      });

      // console.log(this.$refs.foodsWrapper);

    },
    methods: {
      //此方法用来点击 menu-list,会定位到对应的右边的food-list区块上
      selectMenu(index,event) {
        //当切换pc端时,点击事件会被触发两次,为了避免,需要如下代码
        if (!event._constructed){
          return
        }
        // console.log(index);
        var foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        var el=foodList[index];
        //better-scroll提供的api,用来定位到对应的区块,有动画效果,参数300是执行动画的时间
        this.foodsScroll.scrollToElement(el, 300);
      },
      //betterScroll插件的运用
      _initScroll() {
          //这个实例对象接收两个参数,一个是dom对象,领一个是json对象
        // 在需要操作的dom元素后添加 ref属性   ref="dom元素的名字"
        // this.$refs.menuWrapper  用来获取这个dom元素

        //让menu-wrapper 生成一个滚动条
        this.menuScroll=new BScroll(this.$refs.menuWrapper,{
          //为了让menuWrapper能注册点击事件,所以这里需要如下代码
          click:true
        });
        this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
          //关联的地方  cartcontrol组件  中的 cart-add 的点击事件
          click:true,
          //传入这个属性是因为需要实时监控滚动条的滚动的位置 ,相当于一个探针
          probeType:3
        });
        //监听食物列表的滚动条滑动的事件,来获取y轴的实时位置
        this.foodsScroll.on("scroll",(pos)=>{
          this.scrollY=Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        //foodList 中存的是food-list对象   也就是每个区块(如:热销榜)的那个li标签
        var foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        var height=0; //初始的在热销榜,屏幕没滑动过,此时高度为0
        this.listHeight.push(height);
        //foodList代表了多少个区块,也就是多少个分区,也就是左边的导航menu-list
        for (var i=0;i<foodList.length;i++) {
          //item 存的是每个区块的li
          var item=foodList[i];
          //clientHeight：元素客户区的大小，指的是元素内容及其边框所占据的空间大小（经过实践取出来的大多是视口大小）不包括边框的大小,与之相似的属性有 offsetHeight(width)
          //clientHeight：包括padding但不包括border、水平滚动条、margin的元素的高度。对于inline的元素这个属性一直是0，单位px，只读元素。
          //累加height
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
      },


    //  关联组件   food组件
      fooded(food,event) {
        if (!event._constructed){
          return
        }
        //这里的food就是foods中的每一件商品
        this.selectedFoods=food;
        //父组件调用子组件的方法
        //1.找到子组件这个dom对象
        //2.调用子组件方法
        this.$refs.food.show();
      }
    },
    components: {
    //  注册   购物车组件
      shopcart,
      cartcontrol,
      food

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display:flex
    position:absolute
    top:174px
    bottom:46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      /*flex布局   菜单只占80px     要向下面这样写,0不能少*/
      flex:0 0 80px
      width:80px
      background-color:#f3f5f7
      .menu-item
        display:table
        height:54px
        width:56px
        line-height:14px
        padding:0 12px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background-color: #eee
          font-weight:700
          .text
            border-none()
        .icon
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
            bg-image("decrease_3")
          &.discount
            bg-image("discount_3")
          &.guarantee
            bg-image("guarantee_3")
          &.invoice
            bg-image("invoice_3")
          &.special
            bg-image("special_3")
        .text
          display:table-cell
          width:56px
          vertical-align:middle
          border-1px(rgba(7,17,27,0.1))
          font-size:12px

    .foods-wrapper
      flex:1
      .title
        padding-left:14px
        height:26px
        line-height:26px
        border-left:2px solid #d9dde1
        font-size:12px
        color: rgb(147,153,159)
        background-color:#f3f5f7
      .food-item
        display: flex
        margin:18px
        padding-bottom:18px
        border-1px(rgba(7,17,27margin 0.1))
        &:last-child
          border-none()
          margin-bottom:0
        .icon
          flex:0 0 57px
          margin-right:10px     /*这里运用flex布局   食物图片  和  描述食物的文字内容


          图片icon:   flex:0 0 57px     这里将图片固定在这个位置
          内容content:   flex:1     这样内容区域会随着宽度的改变而自适应改变  */
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height:14px
            line-height:14px
            font-size:14px
            color: rgb(7,17,27)
          .desc, .extra
            line-height:10px
            font-size:10px
            color: rgb(147,153,159)
          .desc
            margin-bottom:8px
            line-height:14px
          .extra
            &.count
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
            position:absolute
            right:0
            bottom:12px
</style>

