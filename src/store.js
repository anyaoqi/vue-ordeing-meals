import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import qs from 'qs';
import Api from '@/api';
import common from '@/assets/js/common';
import MyVue  from './main';

// axios.defaults.headers  = {
//     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
// }
// axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(Vuex);
var clicktag = 0; 
var store = new Vuex.Store({
    state:{
        personInfo:{
            isLock:false,
            phone:'15830176782'
        },
        pageInfo:{
            // info:'abc',
            notice:'aaaaaaaaaaa',
            isShowPage:true,
            currentSelect:{
                id:'',
                title:'',
                deadlineTime:'',
                takeFoodTime:'',
                attentionItem:''
            },
            takeoutInfos:[
                // {
                //     id:'5545',
                //     title:'2019年第23次',
                //     deadlineTime:'2019-05-13',
                //     takeFoodTime:'2019-05-13 10:00:00-14:00:00',
                //     attentionItem:''
                // },
                // {
                //     id:'8411',
                //     title:'2019年第24次',
                //     deadlineTime:'2019-05-13',
                //     takeFoodTime:'2019-05-13 10:00:00-14:00:00',
                //     attentionItem:''
                // }
            ],
            orderInfo:{

            }
        },
        shopCart:{
            totalNumber:0,
            takeFoodTIme:'',   // 取餐时间
            orderFoodTime:'',  // 订餐时间
            foodList:[]
        },
        categoryList:[                    
            // {
            //     id:784512,
            //     typeName:'米饭',
            //     goodList:[
            //         {
            //             id:1,
            //             belongId:784512,
            //             goodsName:'米饭',
            //             price:'5',
            //             imgPath:'',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'碗',
            //             buyUnit:'碗',
            //             describe:'这是一份非常好吃的鸡排饭这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:2,
            //             belongId:784512,
            //             goodsName:'白馒头',
            //             price:'5',
            //             imgPath:'https://p0.meituan.net/210.0/wmproductdwm/cffb8e0bf193dcb3094b3992f1e538bb162457.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         }
            //     ]
            // },
            // {
            //     id:8445,
            //     typeName:'精品肉食',
            //     img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
            //     goodList:[
            //         {
            //             id:3,
            //             belongId:8445,
            //             goodsName:'酱大骨',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/wmproductdwm/cffb8e0bf193dcb3094b3992f1e538bb162457.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:3,
            //             belongId:8445,
            //             goodsName:'酱猪手',
            //             price:'16',
            //             imgPath:'https://p1.meituan.net/210.0/xianfudwm/b14dbd68beba64e01e4a81a5f2ce168697291.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:4,
            //             belongId:8445,
            //             goodsName:'小炒猪肝',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/xianfudwm/fa24e2f69b37c254754357025ef45b2d201086.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:5,
            //             belongId:8445,
            //             goodsName:'滑熘里脊',
            //             price:'16',
            //             imgPath:'https://p1.meituan.net/210.0/wmproductdwm/8207b025f9e2b255f227700e7d3a99ee92282.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:6,
            //             belongId:8445,
            //             goodsName:'蒜泥肘子',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/xianfudwm/5338929cb854f02386e4c09748302d58104922.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //     ]
            // },
            // {
            //     id:8446,
            //     typeName:'热菜',
            //     img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
            //     goodList:[
            //         {
            //             id:11,
            //             belongId:8446,
            //             goodsName:'酸辣土豆丝',
            //             price:'88',
            //             imgPath:'https://p1.meituan.net/210.0/wmproduct/08417ce19122fad722ffcb94864ba864389061.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:12,
            //             belongId:8446,
            //             goodsName:'小炒黄牛肉',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/wmproduct/c95b76bf310416657f0b0648847fdb29409576.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },{
            //             id:13,
            //             belongId:8446,
            //             goodsName:'蒜蓉粉丝虾',
            //             price:'16',
            //             imgPath:'https://p1.meituan.net/210.0/wmproduct/e5bc4352310fa26da5feb48110e55687391216.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },{
            //             id:14,
            //             belongId:8446,
            //             goodsName:'小炒猪肝',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/xianfudwm/fa24e2f69b37c254754357025ef45b2d201086.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },{
            //             id:14,
            //             belongId:8446,
            //             goodsName:'小炒猪肝',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/xianfudwm/fa24e2f69b37c254754357025ef45b2d201086.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         }
            //     ]
            // },
            // {
            //     id:8447,
            //     typeName:'烤官大串',
            //     img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
            //     goodList:[
            //         {
            //             id:21,
            //             belongId:8447,
            //             goodsName:'鱼豆腐（8串）/手',
            //             price:'88',
            //             imgPath:'https://p0.meituan.net/210.0/wmproductdwm/b43324b4f23171fcd9ec6e1e7c070f7c542078.png',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:22,
            //             belongId:8447,
            //             goodsName:'羊肉串(1串）',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/wmproductdwm/609afbcdf6650cb70706a2e7439fdb70575053.png',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },{
            //             id:23,
            //             belongId:8447,
            //             goodsName:'里脊肉（大）',
            //             price:'16',
            //             imgPath:'https://p1.meituan.net/210.0/wmproductdwm/4352f4613be42df493865cfff098833d121274.jpg',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         }
            //     ]
            // },
            // {
            //     id:8448,
            //     typeName:'特色菜',
            //     img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
            //     goodList:[
            //         {
            //             id:21,
            //             belongId:8448,
            //             goodsName:'鱼豆腐（8串）/手',
            //             price:'88',
            //             imgPath:'https://p0.meituan.net/210.0/wmproductdwm/b43324b4f23171fcd9ec6e1e7c070f7c542078.png',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:22,
            //             belongId:8448,
            //             goodsName:'羊肉串(1串）',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/wmproductdwm/609afbcdf6650cb70706a2e7439fdb70575053.png',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //     ]
            // },
            // {
            //     id:8448,
            //     typeName:'特色菜',
            //     img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
            //     goodList:[
            //         {
            //             id:21,
            //             belongId:8448,
            //             goodsName:'鱼豆腐（8串）/手',
            //             price:'88',
            //             imgPath:'https://p0.meituan.net/210.0/wmproductdwm/b43324b4f23171fcd9ec6e1e7c070f7c542078.png',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //         {
            //             id:22,
            //             belongId:8448,
            //             goodsName:'羊肉串(1串）',
            //             price:'16',
            //             imgPath:'https://p0.meituan.net/210.0/wmproductdwm/609afbcdf6650cb70706a2e7439fdb70575053.png',
            //             remainNum:52,
            //             goodsNum:0,
            //             valuationUnit:'份',
            //             buyUnit:'份',
            //             describe:'这是一份非常好吃的鸡排饭'
            //         },
            //     ]
            // }
        ],
    },
    getters:{
        categoryList:function (state) {
            var categorys = [];
            state.categoryList.forEach(function (category) {
                if (category.goodList.length>0) {
                    categorys.push(category)
                    // 商品和购物车数量保持一致
                    // category.goodList.forEach(function (foodItem,index) {
                    //     var isExist = false;
                    //     state.shopCart.foodList.forEach(function (cartFood,i) {
                    //         if (foodItem.id == cartFood.id) {
                    //             isExist = true
                    //             foodItem.goodsNum = cartFood.goodsNum
                    //             if (!cartFood.goodsNum) {
                    //                 foodItem.goodsNum = 0
                    //             }
                    //         }
                    //     })
                    //     if (!isExist) {
                    //         foodItem.goodsNum = 0;
                    //     }
                    // })
                }
               
            })
          
            return categorys;
        }
    }, 
    mutations:{
        /**
         * 修改购物车商品
         * @param {*} state state对象 
         * @param {*} params 传入的参数对象
         * @param {*} params.food 食物信息对象
         * @param {*} params.isAdd 是否添加   true为添加,false为减去
         */
        editShopCart(state,params){
            console.log(params)
            var oFood = params.food;
            var oFoodIndex = -1;  // 商品列表中是否存在要添加的商品
            var goodsNum = 0;
            if (params.isAdd) {  // 添加
                var isConformRule = common.judgeGroup(oFood);
                if (!isConformRule) {   // 判断是否符合套餐规则
                    // alert('规则不合法：'+oFood.mealRule)
                    MyVue.$layer.alert('<div style="height:42px;line-height:42px">此套餐只能'+ oFood.mealRule +'，您已购买其中1个</div>',{
                        icon:0,
                    },function (index) {
                        MyVue.$layer.close(index)
                    })
                    return
                }
                // 遍历购物车列表 判断购物车列表中是否已经再存要添加的商品
                state.shopCart.foodList.forEach(function(foodItem,index) {
                    // 如果已存在，就修改购物车中的商品信息，并且把index索引赋值给oFoodIndex
                    if (foodItem.id == oFood.id) {  
                        oFoodIndex = index;
                        foodItem.goodsNum++;  // 修改商品数量加1
                        goodsNum = foodItem.goodsNum;
                        // oFood.goodsNum = foodItem.goodsNum
                    }
                });
                state.categoryList.forEach(function (category) {
                    category.goodList.forEach(function (goods) {
                        if (goods.id == oFood.id) {
                             goods.goodsNum = goodsNum;
                        }
                    })
                })
                if (oFoodIndex==-1) {    // 如果购物车列表中没有就将商品添加到商品列表中
                    oFood.goodsNum = 1;
                    state.shopCart.foodList.push(oFood);
                }
                state.shopCart.totalNumber++;  // 修改商品总数量加1
                // state.shopCart.totalPrice+=Number(oFood.price); // 修改商品总价
            }else{  // 减去
                var oFoodId = oFood.id;
                var oFoodNumber = 0;  // 要删除的商品在购物车中的剩余数量
                // 遍历购物车列表 判断购物车列表中是否已经再存要添加的商品
                state.shopCart.foodList.forEach(function(foodItem,index) {
                    if (foodItem.id == oFoodId) {  // 如果存在就修改购物车中的商品信息的数量,并且把index索引赋值给oFoodIndex
                        oFoodIndex = index;
                        oFoodNumber = foodItem.goodsNum;
                    }
                });
                if (oFoodIndex != -1) {  // 判断购物车列表中是否存在要删除的商品
                    if (oFoodNumber<=0) {    // 判断剩余数量是否小于等于0，如果小于等于0就从商品列表中吧这个商品删除
                        oFood.goodsNum = 0;
                        state.shopCart.foodList.splice(oFoodIndex,1);
                    }else{ 
                        state.shopCart.foodList[oFoodIndex].goodsNum--;
                        goodsNum = state.shopCart.foodList[oFoodIndex].goodsNum;
                        // oFood.goodsNum = state.shopCart.foodList[oFoodIndex].goodsNum;
                        state.categoryList.forEach(function (category) {
                            category.goodList.forEach(function (goods) {
                                if (goods.id == oFood.id) {
                                    // goods.goodsNum--;  // 修改商品数量加1
                                    if (goodsNum<=0) {
                                        goods.goodsNum = 0
                                    }else{
                                        goods.goodsNum = goodsNum;
                                    }
                                }
                            })
                        })
                        if (!state.shopCart.foodList[oFoodIndex].goodsNum) {
                            state.shopCart.foodList.splice(oFoodIndex,1);
                        }
                    }
                    
                    state.shopCart.totalNumber--;
                    // state.shopCart.totalPrice-=oFood.price;
                }
            }
           
        },
        /**
         * 清空购物车
         * @param {*} state state对象 
         */
        emptyShopCart(state){
            // 清空商品中的数量
            console.log('a')
            state.shopCart.foodList.forEach(function (cartFood) {
                state.categoryList.forEach(function (category) {
                    if (cartFood.belongId == category.id) {
                        category.goodList.forEach(function (food) {
                            if (food.id == cartFood.id) {
                                food.goodsNum = 0
                            }
                        })
                    }
                })
            })
            // 清空购物车内容
            state.shopCart.foodList = [];
            state.shopCart.totalNumber = 0;
            // state.shopCart.totalPrice = 0;
        },
    },
    actions:{
        /**
         * 清空购物车
         * @param {*} context store 对象
         */
        emptyShopCart({ commit,state }){
			var data = {
				takeOutId:state.pageInfo.currentSelect.id
			}
            axios({
                method:'get',
                url:Api.clearCartUrl,
				data:qs.stringify(data)
            }).then(function (res) {
                console.error('清空购物车')
                console.log(res)
                var data = res.data;
                if (data.flag==1) {
                    commit('emptyShopCart')
                }
            }).catch(function (error) {
                console.error('清空购物车失败：'+error)
            })
        },
        /**
         * 获取购物车数据
         * @param {*} context 
         */
        loadCartData({commit, state}){
			var data = {
				takeOutId:state.pageInfo.currentSelect.id
			}
            axios({
                method:'get',
                url:Api.cartDataUrl,
				data:qs.stringify(data)
            }).then(function (res) {
                console.error('获取购物车数据')
                console.log(res)
                var data = res.data;
                if(data.flag==1 && data.goodsList){
                    state.shopCart.foodList = data.goodsList;
                    state.shopCart.totalNumber = state.shopCart.foodList.reduce(function (total,curFood) {
                        return total+Number(curFood.goodsNum)
                    },0)
                }
            }).catch(function (error) {
                console.error('获取购物车数据失败：'+error)
            })
        },
        /**
         * 修改购物车内容
         * @param {*} param 
         * @param {*} json 
         */
        editShopCart({commit,state},json){
            console.log(json.params)
            var params = json.params;
            var ogoods = params.food;

            var goodsNum = ogoods.goodsNum;  // 商品已购数量

            if (state.pageInfo.orderInfo.orderList) {
                var i=0; // 将订单中的数量和购物车里的数量相加
                state.pageInfo.orderInfo.orderList.forEach(function (order) {
                    if (order.id == ogoods.id && i<1) {
                        i++
                        goodsNum += order.goodsNum;
                    }
                })
            }
            // 判断是否超出限购数量
            if (ogoods.buyLimit==1 && goodsNum >= ogoods.buyNum && params.isAdd) {
                console.log(ogoods.buyNum,ogoods.goodsNum)
                MyVue.$layer.alert('<div style="height:42px;line-height:42px">此商品限购数量：'+ogoods.buyNum  + ogoods.buyUnit +',您的订单和购物车已购买'+ goodsNum +  ogoods.buyUnit +'</div>',{
                    icon:0,
                    area:'auto'
                },function (index) {
                    MyVue.$layer.close(index)
                })
                return
            }
           
            
            var data = {
                categoryId:ogoods.belongId,
                categoryName:ogoods.categoryName,
                takeOutId:state.pageInfo.currentSelect.id,
                goodsId:ogoods.id,
                goodsName:ogoods.goodsName,
                goodsNum:0,
                valuationUnit:ogoods.valuationUnit,
                buyUnit:ogoods.buyUnit,
                price:ogoods.price,
            }
            var successFn = function (res) {
                console.error('修改商品')
                console.log(params)
                ogoods.isLoading = false;
                if (res.data.flag==1) {
                    commit('editShopCart',params)
                }
            };

            if(params.isAdd){  // 添加商品
                data.goodsNum = 1;
            } else {  // 删除商品
                data.goodsNum = -1;
            }
            //  防止连续多次点击
            if (clicktag == 0) {
                clicktag = 1;
                setTimeout(function () {
                    clicktag = 0
                    axios({
                        method:'get',
                        url:Api.editCartUrl,
                        data:qs.stringify(data),
                    }).then(successFn)
                    .catch(function (error) {
                        console.error('修改商品信息失败：'+error)
                    })
                },1000)
            }else{
                ogoods.isLoading = true;
            }
        },
        /**
         * 获取用户是否被锁定
         * @param {*} param 
         */
        getIslock({state},json){
            state.personInfo.isLock = false
            axios({
                method:'get',
                url:Api.isLockUrl
            }).then(function (res) {
                console.error('获取用户是否被锁定')
                console.log(res)
                if (res.data.flag==1) {
                    var loseState = res.data.state;

                    var params = {
                        msg:res.data.msg,
                        icon:2
                    }
                    if (loseState==2) {  // 2表示未被锁定，有失信记录
                        loseState = 0
                        params.icon = 0
                        json.alertMsg(params)
                    }else if (loseState==1) {  // 1表示被锁定,
                        params.icon = 1
                        json.alertMsg(params)
                    }
                    state.personInfo.isLock = Number(loseState);
                }
            }).catch(function (err) {
                console.error('获取用户是否被锁定失败！')
                console.log(err)
            })
        },
        /**
         * 获取商品分类列表
         */
        getCategoryList({state,commit}){
            var currentSelectId = state.pageInfo.currentSelect.id;
            console.error('获取商品分类列表')
            axios({
                method:'get',
                url:Api.categoryListUrl,
                data:qs.stringify({
                    takeOutId:currentSelectId
                })
            }).then(function (res) {
                console.error('获取分类列表')
                console.log(res) 
                var data = res.data;
                if (data.flag==1) {
                    if (data.categoryList && data.categoryList.length>0) {
                        state.categoryList = data.categoryList;
                        state.pageInfo.isShowPage = true;
                        return false;
                    }
                }
                state.pageInfo.isShowPage = false
            }).catch(function (err) {
                console.error('获取分类列表失败！')
                console.log(err)
                state.pageInfo.isShowPage = false
            })
        },
        /**
         * 获取可订餐日期列表
         */
        getDateList({state,dispatch}){
            axios({
                method:'get',
                url:Api.takeoutListUrl,
            }).then(function (response) {
                console.error('获取可订餐日期列表')
                console.log(response)
                if (response.data.flag==1 && response.data.data && response.data.data.length>0) {
                    var data = response.data.data;
                    state.pageInfo.takeoutInfos = data;
                    state.pageInfo.currentSelect = data[0];
                    dispatch('getCategoryList')
					dispatch('loadCartData')
                } else {
                    state.pageInfo.isShowPage = false
                }
            }).catch(function (error) {
                console.error('获取getDateList，失败')
                console.log(error)
                state.pageInfo.isShowPage = false
            })
        },
        /**
         * 获取通知公告内容
         */
        getNotice({state}){
            axios({
                method:'get',
                url:Api.noticeUrl
            }).then(function (res) {
                console.error('获取通知公告内容')
                console.log(res)
                if (res.data.flag == 1) {
                    state.pageInfo.notice = res.data.notice||'暂无通知公告内容';
                }
            }).catch(function (err) {
                console.error('获取通知公告内容失败！')
                console.log(err)
            })
        },

        /**
         * 选择外卖
         * @param {*} state 
         * @param {*} dateValue 
         */
        editSelect({state,dispatch,commit},takeout){
            console.log(takeout)
            state.pageInfo.currentSelect = takeout;
            commit('emptyShopCart')
            dispatch('getCategoryList')
            dispatch('loadCartData')
            dispatch('getNotice')
        },
        /**
         * 立即下单
         */
        placeOrder({state,commit},params){
            var tmpFood;
            var cartgoodsInfo = [];
            state.shopCart.foodList.forEach(function (foodItem,index) {
                tmpFood = {
                    goodsId:foodItem.id,
                    goodsNum:foodItem.goodsNum,
                    goodsName:foodItem.goodsName,
                    buyUnit:foodItem.buyUnit,
                    valuationUnit:foodItem.valuationUnit,
                    price:foodItem.price,
                    categoryId:foodItem.belongId,
                    categoryName:foodItem.categoryName
                }
                cartgoodsInfo.push(tmpFood)
            })
            var data = {
                takeOutId:state.pageInfo.currentSelect.id,
                orderId:params.orderId,
                title:state.pageInfo.currentSelect.title,
                phone:params.phoneNum,
                cartgoodsInfo:JSON.stringify(cartgoodsInfo)
            }
            axios({
                method:'get',
                url:Api.placeOrderUrl,
                data:qs.stringify(data)
            }).then(function (res) {
                params.success ? params.success(res.data) : '';
            }).catch(function (error) {
                console.error('下单失败')
                console.log(params)
                var errJson = {
                    error:error,
                    text:'下单失败'
                }
                params.error ? params.error(errJson) : '';
            })
        },
        /**
         * 判断是否可下单
         */
        // judgePlaceOrder({state,commit},params){
        //     var tmpFood;
        //     var cartgoodsInfo = [];
        //     state.shopCart.foodList.forEach(function (foodItem,index) {
        //         tmpFood = {
        //             goodsId:foodItem.id,
        //             goodsNum:foodItem.goodsNum,
        //             goodsName:foodItem.goodsName,
        //         }
        //         cartgoodsInfo.push(tmpFood)
        //     })
        //     var data = {
        //         takeOutId:state.pageInfo.currentSelect.id,
        //         title:state.pageInfo.currentSelect.title,
        //         // phone:params.phoneNum,
        //         cartgoodsInfo:JSON.stringify(cartgoodsInfo)
        //     }
        //     axios({
        //         method:'get',
        //         url:Api.judgePlaceOrder,
        //         data:qs.stringify(data)
        //     }).then(function (res) {
        //         params.success ? params.success(res.data) : '';
        //     }).catch(function (error) {
        //         console.error('下单失败')
        //         console.log(error)
        //         var errJson = {
        //             error:error,
        //             text:'下单失败'
        //         }
        //         params.error ? params.error(errJson) : '';
        //     })
        // }

        juderAddOrder({state,commit},params){
            console.error('获取订单信息和手机号')
            console.log(state.pageInfo.currentSelect.id)
            var _this = this;
            var takeOutId = state.pageInfo.currentSelect.id;
            axios({
                url:Api.juderAddOrder,
                method:'get',
                data:qs.stringify({
                    takeOutId:takeOutId
                }),
            }).then(function (res) {
                   var data = res.data;
                if (data.flag==1) {
                    state.pageInfo.orderInfo = data.data;
                    params.success(data)
                    // 回填手机号码
                    // _this.phoneNumer = data.data.phone;
                    // if (data.data.orderId) {  // 如果之前下过订单就修改按钮文字
                    //     $('.btn-buy').text('追加订单')
                    //     _this.orderId = data.data.orderId;
                    // }else{
                    //     $('.btn-buy').text('立即下单')
                    // }
                }
            }).catch(function (error) {
                console.error('获取订单信息和手机号失败')
                console.log(error)
            })
        }
    }
})

export default store;