<template>
    <div class="shop-cart" id="shop-cart" v-if="this.$store.state.categoryList.length>0 && !isLock">
        <div class="shopcart-header">
            <span class="header-left">购物车</span>
            <span class="info-close iconfont icon-zhankai" @click="toggleShopCart"></span>
            <button class="btn header-right" @click="emptyShopCart" :disabled="!this.$store.state.shopCart.totalNumber">清空菜品</button>
        </div>
        <div class="shopcart-info">
            <p class="text">取餐时间:</p>
            <p class="text">{{takeFoodTime}}</p>
            <p class="text">最晚预定时间:{{orderFoodTime}}</p>
            <hr>
            <label for="phoneNum" class="phoneNum">
                请输入取餐人联系方式：<input type="text" name="phoneNum" id="phoneClass" v-model="phoneNumer">
            </label>
        </div>
    
        <ul class="shopcart-list">
            <li class="shopcart-item" v-for="(food,index) in shopcartList" :key="index">
                <div class="food-name" :title="food.goodsName">{{food.goodsName}}</div>
                <div class="modify-num">
                    <span href="javascript:;" class="add-one iconfont icon-zengjia" @click="addFood(food)" ></span>
                    <input type="text" :value="food.goodsNum" class="food-num" disabled>
                    <span href="javascript:;" class="del-one iconfont icon-jianqu" @click="delFood(food)"></span>
                </div>
                <!-- <span class="food-price">{{food.price}}</span> -->
                <span class="food-unit"> {{food.buyUnit}}</span>
            </li>
        </ul>
        <div class="shopcart-bottom">
            <p class="food-total">
                共计 <span class="food-total-count" id="food-total-count">{{totalNumber}}</span> 份
                <!-- 总计 <span class="food-total-price" id="food-total-price">{{totalPrice}}</span> 元 -->
            </p>
            <button class="btn btn-success btn-buy" @click="placeOrder" :disabled="!this.$store.state.shopCart.totalNumber">立即下单</button>
        </div>
    </div>
</template>

<script>
import Api from '@/api';
import qs from 'qs';

export default {
  data() {
    return {
        _height:0,
        phoneNumer:0,
        orderId:'', // 订单id
    }
  },
  created () {
      this.juderAddOrder()
  },
  computed: {
      shopcartList(){
          return this.$store.state.shopCart.foodList;
      },
      totalNumber(){
          return this.$store.state.shopCart.totalNumber;
      },
      totalPrice(){
          return this.$store.state.shopCart.totalPrice;
      },
      isLock(){
		  var _isLock = this.$store.state.personInfo.isLock;
		  var _this = this;
		//   if(_isLock){
		// 	_this.$layer.alert('<div style="height:42px;line-height:42px">你被锁定了</div>',{
        //         icon:1,
        //     },function (index) {
        //         _this.$layer.close(index)
        //     })
		//   }
          return _isLock;
      },
      takeFoodTime(){
          this.juderAddOrder()  // 获取订单和手机号
          return this.$store.state.pageInfo.currentSelect.takeFoodTime;
      },
      orderFoodTime(){
           return this.$store.state.pageInfo.currentSelect.deadlineTime;
      }
  },
  methods: {
      addFood(food){
          var params = {
              food:food,
              isAdd:true
          }
          this.$store.dispatch('editShopCart',{ params:params })
      },
      delFood(food){
          var params = {
              food:food,
              isAdd:false
          }
          this.$store.dispatch('editShopCart',{ params:params })
      },
      emptyShopCart(){
          this.$store.dispatch('emptyShopCart')
      },
      placeOrder(){
         var _this = this;
         var phoneNum=this.phoneNumer;;
         var alertMsg = function (params) {
            _this.$layer.alert('<div style="height:42px;line-height:42px">'+ params.msg +'</div>',{
                icon:params.icon,
                shadeClose: false,//点击遮罩是否关闭
                shade: false,//是否显示遮罩
            },function (index) {
                if (params.flag==1) { // 下单成功
                    // _this.$store.dispatch('placeOrder',{ phoneNum:phoneNum});
                }
                _this.$layer.close(index)
            })
         }
        
         var poSuccessFn = function (data) {
                var jsonData =  {
                    msg :data.msg,
                    flag:data.flag,
                    icon:0,
                }
                if (data.flag == 1) {
                    jsonData.icon = 2,
                    jsonData.msg = '下单成功',
                    $('#phoneClass').val('')
                    _this.$store.dispatch('emptyShopCart');
                    _this.$store.dispatch('getCategoryList');
                    if (data.orderId) {
                        $('.btn-buy').text('追加订单')
                        _this.orderId = data.orderId;
                    }else{
                        $('.btn-buy').text('立即下单')
                    }
                    _this.juderAddOrder();
                }
                alertMsg(jsonData)
         }
        // 未校验手机号
        // //手机号正则
        var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        //电话
        phoneNum = $.trim(phoneNum);
        if (!phoneReg.test(phoneNum)) {
                var msgData =  {
                msg :'请输入有效的手机号码！',
                flag:0,
                icon:0,
            }
            alertMsg(msgData)
            return false;
        }
        this.$store.dispatch('placeOrder',{ phoneNum:phoneNum, orderId:this.orderId, success:poSuccessFn});   
      },
      toggleShopCart(){
          var _this = this;
          if ($('.shop-cart').css('bottom') != '0px') {  // 展开
                $('.shop-cart').animate({
                    'bottom':0,
                    // 'right':0
                },function () {
                    $('.shopcart-list').css({
                        'height':'auto'
                    })
                })
          }else{  // 收起
                _this._height = $('.shopcart-list').height()
                $('.shopcart-list').animate({
                    'height':0
                },function () {
                    $('.shop-cart').animate({
                        'bottom':'-18%',
                        // 'right':'-7%'
                    })
                })
          }
      },
      juderAddOrder(){
            var _this = this;
            var params = {
                success:function (data) {
                     // 回填手机号码
                    _this.phoneNumer = data.data.phone;
                    if (data.data.orderId) {  // 如果之前下过订单就修改按钮文字
                        _this.orderId = data.data.orderId;
                        $('.btn-buy').text('追加订单')
                    }else{
                        _this.orderId = '';
                        $('.btn-buy').text('立即下单')
                    }
                }
            }
            this.$store.dispatch('juderAddOrder',params);
      }
  }
}
</script>

<style scoped>
* {
    margin: 0;
    padding:0;
    /* border: 0; */
}
.shop-cart {
    z-index: 99;
    width: 280px;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    right: 0px;
    border: 1px solid #cccccc;
    border-top-left-radius: 15px;
    box-shadow: 0 3px 10px 0 rgba(0,0,0,0.06);
    transition:all 0.2s linear; 
}
.shop-cart .shopcart-header {
   position: relative;
   padding-left: 15px;
   height: 70px;
   line-height: 70px;
   font-size: 16px;
   letter-spacing: 2px;
   color: #FFFFFF;
   border-top-left-radius: 15px;
   background: rgb(196,138,79);
}
.shop-cart .shopcart-info {
    padding:2px 20px;
    text-align: center;
    color: #FFFFFF;
    font-weight: 700;
    border-top: 1px solid #dddddd;
    background: rgb(196,138,79);
}
.shopcart-header .header-left {
   font-weight: 600;
}
.shopcart-header .header-right {
   position: absolute;
   right: 35px;
   top: 0;
   bottom: 0;
   color: #FFFFFF;
   background: none;
   outline: none;
}
.shopcart-header .info-close {
    /* float: left; */
    padding:0 5px;
    cursor: pointer;
}

.shop-cart .shopcart-list {
    overflow: auto;
    max-height: 480px;
    background:rgb(252, 224, 196)
}
.shop-cart .shopcart-list .shopcart-item {
    padding:15px 10px; 
    border-bottom: 1px solid rgb(196,138,79);
    box-sizing: border-box;
}
.shopcart-item .food-name {
    display: inline-block;
    width: 130px;
    overflow-wrap: break-word
}
.shopcart-item .modify-num {
    display: inline-block;
    /* width: 100px; */
    height: 10px;  
    margin-left: 10px; 
}
.modify-num .del-one,.modify-num .add-one{
    color: rgb(196,138,79);
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    /* margin: 6px 0; */
    width: 18px;
    height: 18px;
    line-height: 15px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid rgb(196,138,79);
}
.food-num {
    width: 25px;
    display: inline-block;
    height: 16px;
    _height: 17px;
    padding: 0 3px;
    line-height: 16px;
    border-left: 0;
    border-right: 0;
    border-color: #E5E5E5;
    text-align: center;
    background: none;
}
.food-num:focus {
    outline: none;
}
.shopcart-item .food-price,.shopcart-item .food-unit {
    display: inline-block;
    width: 10%;
}
.shopcart-item .food-price::before{
    content: '￥'
}
.shopcart-bottom {
    padding:15px;
    background: rgb(252, 224, 196)
}
.shopcart-bottom .btn-buy {
    display: block;
    width:230px;
    padding:3px 0;
    margin:5px auto;
    border: 1px solid rgb(196,138,79);
    background: rgb(223, 176, 129);
}
.shopcart-bottom .food-total-count {
    font-size: 16px;
    font-weight: 700;
    color: #337ab7;
}
.shopcart-bottom .food-total-price {
    font-size: 22px;
    font-weight: 700;
    color: red;
}

.vl-notice-phoneClass {
    background: #337ab7;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 5px #ccc;
}

.icon-jianqu::before {
    content:'-'
}
.icon-zengjia::before {
    content:'+'
}

.phoneNum {
    font-size: 16px;
}
.phoneNum input {
   color: #000;
   text-align: center
}
</style>
