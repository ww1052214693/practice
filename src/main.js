// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import router from './router';
//导入 vue-router 插件
import VueRouter from 'vue-router';
//导入 vue-resource 插件
import VueResource from 'vue-resource';
//导入需要挂载的组件
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import register from './views/register'
import login from './views/login'
import './common/stylus/index.styl';
//注册vue-router插件
Vue.use(VueRouter);
//注册 vue-resource 插件
Vue.use(VueResource);






Vue.config.productionTip = false;

/* eslint-disable no-new */


//创建路由实例
const router=new VueRouter({
  routes:[
    //path:路径 component:把你需要的组件挂载进来
    {path:"/goods",component:goods},
    {path:"/ratings",component:ratings},
    {path:"/seller",component:seller},
    {path:"/login",component:login},
    {path:"/register",component:register},
    //路由的重定向实现默认进入某个路由
    {path:"/",redirect:"/login"}
  ]
});
//最后挂载到vue实例上
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
// router.go("/goods");

