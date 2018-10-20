<template>
    <div style="background-color: #eee;">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                <!-- 放大镜组件 -->
                                <ProductZoomer
                                    :base-images="images"
                                    :base-zoomer-options="zoomerOptions"
                                />
                            </div>
                            <!-- 商品信息 -->
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- element-ui的计数器组件 -->
                                                <el-input-number v-model="buyNum" @change="numChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <!-- 逻辑比较简单 直接写在标签内 点击之后切换 selectIndex的值
                                            是否有selected这个类名取决于 selectIndex的值
                                         -->
                                        <a @click="selectIndex=0" href="javascript:;" :class="{selected:selectIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectIndex=1" href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" style="display: block;" v-show="selectIndex==0"  v-html="goodsinfo.content" >
                                
                            </div>
                            <div class="tab-content" style="display: block;"
                            v-show="selectIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="message"         name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="subComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-show="comments.length!=0" v-for="item in comments" :key="item.id" >
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <!-- <span>2017/10/23 14:58:59</span> -->
                                                    <span>{{item.add_time | capitatimere('YYYY/MM/DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                         <!-- 使用iView的分页插件 -->
                                        <Page :current='pageIndex' @on-page-size-change="sizeChange" :total="totalcount" placement='top' :page-size-opts='[6,16,26,36]' @on-change="pageChange" :page-size=6 show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id" >
                                        <div class="img-box">
                                            
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>                               
                                            
                                        </div>
                                        <div class="txt-box">
                                            
                                            <router-link :to="'/detail/'+item.id">
                                            {{item.title}}
                                            </router-link>  
                                            
                                            <span>{{item.add_time | capitatime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//导入axios 迁移到全局
// import axios from "axios";

export default {
  name: "detail",
  data: function() {
    return {
      goodId: "",
      // 商品信息
      goodsinfo: {},
      // 图片列表
      imglist: [],
      // 热卖列表
      hotgoodslist: [],
      //选择数量
      buyNum: 1,
      // 标记tab栏显示哪个 0 :1
      selectIndex: 0,
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 6,
      // 总条数
      totalcount: 0,
      // 评论内容
      comments: [],
      // 发表的评论信息
      message: "",
      //放大镜数据
      images: {
        normal_size: [
          {
            id: 1,
            url:
              "http://img4.imgtn.bdimg.com/it/u=2131988536,2410504660&fm=11&gp=0.jpg"
          },
          {
            id: 2,
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539919185&di=db2e7162dcc8cf7d0763594b4c9c6fd9&imgtype=jpg&er=1&src=http%3A%2F%2Fimg77.ph.126.net%2F9bLTJ2JP7-qPNCGuZf-Ndw%3D%3D%2F3023885674804087701.jpg"
          }
        ]
      },
      //zoomer的选项
      zoomerOptions: {
        //放大倍数
        zoomFactor: 4,
        // 放大样式
        pane: "container-round",
        // 多久出来
        hoverDelay: 300,
        // 类前缀
        namespace: "inline-zoomer",
        // 点击移动
        move_by_click: true,
        // 滚动的图片张数
        scroll_items: 5
        // 选中的缩略图边框颜色
        // choosed_thumb_border_color: "＃blue",
      }
    };
  },
  //事件
  methods: {
    //购买数量改变触发
    numChange() {
      // console.log('防守打法');
    },

    // 根据id获取 商品数据的方法
    getGoodInfo() {
      // 调用接口获取数据
      //基地址已抽取main.js中
      // 原始数据赋值为空
      this.images.normal_size = [];
      this.$axios
        .get("/site/goods/getgoodsinfo/" + this.goodId)
        .then(response => {
          // console.log(response)
          // 商品信息
          this.goodsinfo = response.data.message.goodsinfo;
          // 图片列表
          this.imglist = response.data.message.imglist;
          // 热卖列表
          this.hotgoodslist = response.data.message.hotgoodslist;
          // 处理数据 把 imglist的值 赋值给 images
          let tem_normal_size = [];
          this.imglist.forEach(v => {
            tem_normal_size.push({
              id: v.id,
              url: v.thumb_path
            });
          });
          // 数据处理完毕
          this.images.normal_size = tem_normal_size;
        });
    },
    // 获取评论信息
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          //   console.log(response);
          //   保存数据
          this.totalcount = response.data.totalcount;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
          this.comments = response.data.message;
        });
    },
    // 页码改变
    pageChange(pageNum) {
      // console.log('页码改变');
      // console.log(pageNum);
      // 修改页码
      this.pageIndex = pageNum;
      // 重新发请求
      this.getComments();
    },
    // 页容量改变
    sizeChange(pageSize) {
      //   console.log(pageSize);
      // 修改变量
      // 重新获取数据
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.getComments();
    },
    // 提交评论
    subComment() {
      // 非空判断
      if (this.message == "") {
        // 提示
        this.$Message.warning("写点东西在提交");
        // 跳出
        return;
      }
      // 提交评论  传递参数
      this.$axios
        .post("site/validate/comment/post/goods/" + this.goodId, {
          commenttxt: this.message
        })
        .then(response => {
          // console.log(response);
          // 修改获取的页码为1
          this.pageIndex = 1;
          // 重新获取评论信息
          this.getComments();
          // 清空文本框的内容
          this.message = "";
          // 提示用户
          this.$Message.success("评论发表成功了");
        });
    }, 
    // 加入购物车
    addCart() {
      // 调用Vuex中的数据修改方法 提交载荷
      this.$store.commit("addCart", {
        id: this.goodId,
        buyCount: this.buyNum
      });
    }
  },

  // created中获取id 因为一会就要去调用接口
  created() {
    this.goodId = this.$route.params.goodId;
    this.getGoodInfo();
    // 获取 评论数据
    this.getComments();
  },

  // 观察路由数据改变
  watch: {
    $route(to) {
      // console.log(to);
      // 渲染页面
      this.goodId = to.params.goodId;
      // 重新获取数据
      this.getGoodInfo();
      // 重新获取评论
      this.getComments();
      // 把购买数量修改为1即可
      this.buyNum = 1;
    }
  }
};
</script>
<style>
/* 取消图片底部的 间隙 */
.tab-content img {
  /* 变块 */
  display: block;
}
/* 约束放大镜父盒子的高度 */
.pic-box {
  width: 395px;
  /* height: 320px; */
}

.inline-zoomer-hahaha-zoomer-box {
  width: 300px;
  height: 300px;
}
.preview-box img {
  height: 250px;
}
.control-box {
  height: 50px;
}
.control {
  margin: 0 auto;
}
.control-box > div {
  float: left;
  height: 50px;
}
.control-box .thumb-list img {
  width: 50px;
  height: 50px;
  float: left;
}

.thumb-list {
  width: 200px;
  height: 150px;
}
</style>

