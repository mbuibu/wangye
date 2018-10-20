// 全部的东西 丢到这里
import Vue from 'vue'
// 根组件
import App from './App.vue'

//路由相关
import VueRouter from 'vue-router';
//导入index组件
import index from './components/index.vue';
//导入detail组件
import detail from './components/detail.vue';
//导入shopcart组件
import shopcart from './components/shopcart.vue';
//导入checkOrder组件
import checkOrder from './components/checkOrder.vue';
//导入login组件
import login from './components/login.vue';
//use一下
Vue.use(VueRouter);

//导入懒加载插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  //加载失败的图片
  error: require('./assets/img/0.7.jpg'),
  //加载成功
  loading: require('./assets/img/0.19.jpg'),
})


// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//use一下
Vue.use(ElementUI);

// 导入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//写规则
const routes = [{
    path: '/',
    component: index
  },
  {
    //首页
    path: '/index',
    component: index,
    meta:{
      zhName:'黑马买-首页'
    }
  },
  {
    //详情页
    path: '/detail/:goodId',
    component: detail,
    meta:{
      zhName:'黑马买-详情页'
    }
  },
  {
   //购物车
    path: '/shopcart',
    component: shopcart,
    meta:{
      zhName:'黑马买-购物车'
    }
  },
  {
     //订单确认页
    path: '/checkOrder/:ids',
    component: checkOrder,
    meta:{
      zhName:'黑马买-订单确认页',
      // 增加的标示字段 有这个字段 就需要 登录判断
    checkLogin: true
    }, 
  },
  {
    //登录
    path:'/login',
    component:login,
    meta:{
      zhName:'黑马买-登录'
    }
  },
]
//实例化路由对象
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // console.log("填了");
  window.document.title = to.meta.zhName;
  // 如果是去 订单确认页 登陆判断
  // if (to.path == '/checkOrder') {
    // 如果有标记字段 就需要验证登录
    if(to.meta.checkLogin == true){
      axios.get("site/account/islogin").then(response => {
        // console.log(response);
        if (response.data.code === 'nologin') {
          //登录失败 打回登录
          Vue.prototype.$message.warning('你还没登录,请先登录');
          router.push('/login');
        } else {
          //登录成功
          next();
        }
      });
    }else {
      next();
    }

})
//注册 后置钩子 跳转完毕之后执行
router.afterEach((to,from) =>{
  window.scroll(0,0)
})


Vue.config.productionTip = false

//引入全局moment.js
import moment from 'moment';
//引入全局axios
import axios from "axios";
Vue.prototype.$axios = axios;
//设置基础地址
// Vue.prototype.$baseUrl = "http://111.230.232.110:8899";
// 直接使用axios来设置基础地址
axios.defaults.baseURL = 'http://111.230.232.110:8899';
// 设置axios跨域请求携带cookie
axios.defaults.withCredentials=true;

//放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

//全局过滤器
Vue.filter('capitatime', function (value) {
  return moment(value).format('YYYY年MM月DD日');
});
//过滤器  格式化日期
Vue.filter('capitatimere', function (value, formatStr) {
  // 格式化字符串
  // 格式化日期 使用moment.js来格式化
  return moment(value).format(formatStr);
})

//vue数据共享
import Vuex from 'vuex'
Vue.use(Vuex)

//实例化数据仓库
const store = new Vuex.Store({
  state: {
    shopCartData: JSON.parse(window.localStorage.getItem('cartData')) || {}
  },
  mutations: {
    addCart(state, opt) {
      if (state.shopCartData[opt.id] == undefined) {
        // 没有 增加这个key
        // 为了让Vue可以观察到这个数据的改变 我们需要使用 Vue.set进行设置
        // Vue.set(obj, 'newProp', 123)
        Vue.set(state.shopCartData, opt.id, opt.buyCount);
      } else {
        // 有累加对象也支持 对象[属性名]
        state.shopCartData[opt.id] += opt.buyCount;
      }
    },
    // 修改购物车商品数据
    updateCart(state,opt){
      //使用新的数字覆盖原始的数字
      state.shopCartData[opt.id] = opt.newCount;
    },
    //删除id对应的数据
    delById(state,id){
      // 使用Vue.delete删除才能同步
      Vue.delete(state.shopCartData, id);
    }
  },
  // getters 类似于 Vue的计算属性
  getters: {
    cartGoodCount(state) {
      // 通过state 就可以访问到我们的数据
      // 遍历 累加
      let totalCount = 0;
      for (const key in state.shopCartData) {
        totalCount += state.shopCartData[key]
      }
      return totalCount;
    }
  }
})

new Vue({
  render: h => h(App),
  //挂在到vue实例
  router,
  //挂载到vue实例上方便所有子组件访问
  store
}).$mount('#app')

// 浏览器关闭事件
window.onbeforeunload = function () {
  // 保存
  window.localStorage.setItem('cartData', JSON.stringify(store.state.shopCartData))
}