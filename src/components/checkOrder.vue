<template>
    <div>
        <div class="section">
        <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input v-model="ruleForm.accept_name" style="width:500px"></el-input>
                                </el-form-item> 
                                <el-form-item label="所属地区:" prop="area">
                                    <!-- 省市联动 -->
                                    <v-distpicker  @selected="areaChange"
                                    :province="ruleForm.area.province.value" 
                                    :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                </el-form-item> 
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="ruleForm.address" style="width:500px"></el-input>
                                </el-form-item> 
                                <el-form-item label="手机号码" prop="mobile">
                                    <el-input v-model="ruleForm.mobile" style="width:500px"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱" prop="email">
                                    <el-input v-model="ruleForm.email" style="width:500px"></el-input>
                                </el-form-item>
                                <el-form-item label="邮编" prop="post_code">
                                    <el-input v-model="ruleForm.post_code" style="width:500px"></el-input>
                                </el-form-item>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>&nbsp
                                    <span class="info">手续费：0.00元</span>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                     <el-radio @change="changeExpress(100)" v-model="ruleForm.express_id" label="1">顺丰</el-radio>&nbsp
                                    <span class="info">费用：100.00元</span>&nbsp
                                     <el-radio @change="changeExpress(50)" v-model="ruleForm.express_id" label="2">圆通</el-radio>&nbsp
                                    <span class="info">费用：50.00元</span>&nbsp
                                     <el-radio @change="changeExpress(20)" v-model="ruleForm.express_id" label="3">韵达</el-radio>&nbsp
                                    <span class="info">费用：20.00元</span>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <!-- 循环生成列表 -->
                                    <tr v-for="(item, index) in goodsList" :key="item.id" >
                                        <td width="68">
                                            <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url" class="img">
                                            </router-link>
                                            <!-- </a> -->
                                        </td>
                                        <td>
                                            <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                            <router-link :to="'/detail/'+item.id">
                                            {{item.title}}
                                              </router-link>
                                            <!-- </a> -->
                                        </td>
                                        <td>
                                            <span class="red">
                                               ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                               ￥{{item.buycount*item.sell_price}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="ruleForm.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}
                                        </label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{ruleForm.goodsAmount+ruleForm.expressMoment}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    name: "checkOrder",
    components: { VDistpicker },
  data: function() {
    //自定义手机验证
    var validateMobile = (rule, value, callback) => {
    // 正则判断
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      setTimeout(() => {
          if (value === "") {
            callback(new Error('请输入手机号'));
          } else if(reg.test(value) == false){
            callback(new Error("请输入正确的手机号"));
          }else{
            callback();
          }
        }, 1000);
    };
    //自定义邮箱验证
    var validateEmail = (rule, value, callback) => {
    // 正则判断
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      setTimeout(() => {
        if(reg.test(value) == false){
            callback(new Error("请输入正确的邮箱的地址"));
          }else{
            callback();
          }
        }, 1000);
    };
     //自定义邮编验证
    var validatePostCode = (rule, value, callback) => {
    // 正则判断
      let reg = /^[1-9]\d{5}(?!\d)$/;
      setTimeout(() => {
        if(reg.test(value) == false){
            callback(new Error("请输入正确的邮编的地址"));
          }else{
            callback();
          }
        }, 1000);
    };
    return {
      //表单数据
      ruleForm: {
        //收货人
        accept_name: "",
        //收货地址
        address: "",
        //手机号码
        mobile: "",
        //电子邮箱
        email:"",
        //邮编
        post_code:"",
        //省市区
        area:{
            province:{
                code:"",
                value:""
            },
             city:{
                code:"",
                value:""
            },
             area:{
                code:"",
                value:""
            },
        },
        //支付方式
        payment_id:"6",
        //运送方式
        express_id:"1",
        //商品id
        goodsids:"",
        // 购买商品对象
        cargoodsobj: {},
        // 运费
        expressMoment: 100,
         // 订单备注
        message: "太便宜了",
        // 商品总金额
        goodsAmount: 0
      },
      // 商品列表数据
      goodsList: [],
      //验证规则
      rules: {
        //名字验证
        accept_name: [
          { required: true, message: "请收件人姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        //地址验证
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, message: "请最少输入两个字符的地址", trigger: "change" }
        ],
        //手机号码验证
        mobile: [{ validator: validateMobile, trigger: "change" }],
        //电子邮箱验证
        email: [{ validator: validateEmail, trigger: "change" }],
        //邮编验证
        post_code: [{ validator: validatePostCode, trigger: "change" }],
      }
    };
  },
  //事件
  methods:{
      areaChange(data){
        //   console.log(data);
          this.ruleForm.area = data;
      },
      //改变运费
       changeExpress(newPrice){
        //    console.log(newPrice);
            // 修改运费
      this.ruleForm.expressMoment = newPrice;
       }
  },
  //计算属性
  computed:{
    //   总数
    totalCount() {
      // 遍历数组 累加 返回
      let num = 0;
      this.goodsList.forEach(v => {
        num += v.buycount;
      });
      return num;
    },
    // // 总价格 总价格 页面一打开 就知道了 所以迁移到 属性中
    // totalPrice(){
    //  let price = 0;
    //  this.goodsList.forEach(v=>{
    //      price+=(v.buycount*v.sell_price)
    //  })
    //  return price;
//  }
  },
  //生命周期函数
  created(){
      //通过路由对象获取id
    //   console.log(this.$route);
    //保存起来
    this.ruleForm.goodsids = this.$route.params.ids;
      //调用接口
      this.$axios.get(`site/validate/order/getgoodslist/${this.ruleForm.goodsids}`).then(response=>{
        //   console.log(response);
        //处理数据并保存
        // 准备一会要提交给服务器的数据
        let temData = {};
        response.data.message.forEach(v => {
            // 修改 buycount 通过vuex获取 购买数据
          v.buycount = this.$store.state.shopCartData[v.id];
          // 增加 属性名 跟 对应的数量
          temData[v.id] = v.buycount;
          // 累加 总金额即可
          this.ruleForm.goodsAmount += v.buycount * v.sell_price;
        });
        // 数据处理完毕 复制到data中即可
        this.goodsList = response.data.message;
        // 设置到 ruleForm中即可
        this.ruleForm.cargoodsobj = temData;     
      })
  },
  //判断用户是否登录
  checkOrder() {}
};
</script>
<style>
.info {
  color: #ccc;
}
</style>

