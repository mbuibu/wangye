<template>
    <div style="background-color: #eee;">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 分类 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <!-- 循环生成分类区域 -->
                                <li v-for="item in catelist" :key="item.id" >
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="it in item.subcates" :key="it.id" >
                                                {{it.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="it in item.subcates" :key="it.id" href="/goods/43.html">{{it.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片 轮播图-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                 <!-- element-ui的封装好的组件 -->
                                <el-carousel height="341px">
                                    <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                        <a href="#">
                                            <img style="display:back;height:100%" :src="item.img_url" alt="">
                                        </a>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>  
                        </div>
                    </div>
                    <!--/幻灯片 热卖-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id" >
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <!-- <label>{{item.is_hot}}</label> -->
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- <span>2017-09-26</span> -->
                                    <span>{{item.add_time | capitatime}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 循环生成区域  -->
        <div class="section" v-for="item in orderlist" :key="item.catetitle" >
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="it in item.level2catelist" :key="it.level1cateid" href="/goods/43.html">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="it in item.datas" :key="it.artID" >
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                            <router-link :to="'/detail/'+it.artID">
                                <div class="img-box">
                                    <img v-lazy="it.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{it.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{it.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{it.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{it.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                            <!-- </a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//导入axios
// import axios from "axios";
//发请求 获取数据 moment迁移到全局
// import moment from "moment";

export default {
  name: "index",
  data: function() {
    return {
      //分类列表
      catelist: [],
      //轮播图
      sliderlist: [],
      //热卖列表
      toplist: [],
      //分类列表
      orderlist: []
    };
  },

  // 过滤器 迁移到全局
  // filters: {
  // capitatime: function (value) {
  //     // return value.charAt(0).toUpperCase() + value.slice(1)
  //     //格式化时间日期
  //     return moment(value).format('YYYY年MM月DD日');
  //     }
  // },

  //生命周期函数
  //创建之前
  beforeCreate() {},
  //创建之后
  created() {
    //顶部数据
    this.$axios
      .get("/site/goods/gettopdata/goods")
      .then(response => {
        // console.log(response);
        // 可以处理数据中的日期格式 再赋值(moment.js)
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
      });
    //下面部分数据
    this.$axios
      .get("/site/goods/getgoodsgroup")
      .then(response => {
        // console.log(response);
        this.orderlist = response.data.message;
      });
  }
};
</script>
