import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import qs from 'qs';
import Api from '@/api';
Vue.use(Vuex);

var store = new Vuex.Store({
    state:{
        personInfo:{
            isLock:false
        },
        pageInfo:{
            // info:'abc',
            notice:'aaaaaaaaaaa',
            isShowPage:true,
            currentSelect:{
                id:'5545',
                title:'2019年第23次',
                deadlineTime:'2019-05-13',
                takeFoodTime:'2019-05-13 10:00:00-14:00:00',
                attentionItem:'Abcdef'
            },
            takeoutInfos:[
                {
                    id:'5545',
                    title:'2019年第23次',
                    deadlineTime:'2019-05-13',
                    takeFoodTime:'2019-05-13 10:00:00-14:00:00',
                    attentionItem:''
                },
                {
                    id:'8411',
                    title:'2019年第24次',
                    deadlineTime:'2019-05-13',
                    takeFoodTime:'2019-05-13 10:00:00-14:00:00',
                    attentionItem:''
                }
            ]
        },
        shopCart:{
            totalNumber:0,
            takeFoodTIme:'',   // 取餐时间
            orderFoodTime:'',  // 订餐时间
            foodList:[]
        },
        categoryList:[                    
            {
                id:784512,
                typeName:'米饭',
                goodList:[
                    {
                        id:1,
                        belongId:784512,
                        goodsName:'米饭',
                        price:'5',
                        imgPath:'',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'碗',
                        buyUnit:'碗',
                        describe:'这是一份非常好吃的鸡排饭这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:2,
                        belongId:784512,
                        goodsName:'白馒头',
                        price:'5',
                        imgPath:'https://p0.meituan.net/210.0/wmproductdwm/cffb8e0bf193dcb3094b3992f1e538bb162457.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    }
                ]
            },
            {
                id:8445,
                typeName:'精品肉食',
                img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
                goodList:[
                    {
                        id:3,
                        belongId:8445,
                        goodsName:'酱大骨',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/wmproductdwm/cffb8e0bf193dcb3094b3992f1e538bb162457.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:3,
                        belongId:8445,
                        goodsName:'酱猪手',
                        price:'16',
                        imgPath:'https://p1.meituan.net/210.0/xianfudwm/b14dbd68beba64e01e4a81a5f2ce168697291.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:4,
                        belongId:8445,
                        goodsName:'小炒猪肝',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/xianfudwm/fa24e2f69b37c254754357025ef45b2d201086.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:5,
                        belongId:8445,
                        goodsName:'滑熘里脊',
                        price:'16',
                        imgPath:'https://p1.meituan.net/210.0/wmproductdwm/8207b025f9e2b255f227700e7d3a99ee92282.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:6,
                        belongId:8445,
                        goodsName:'蒜泥肘子',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/xianfudwm/5338929cb854f02386e4c09748302d58104922.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                ]
            },
            {
                id:8446,
                typeName:'热菜',
                img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
                goodList:[
                    {
                        id:11,
                        belongId:8446,
                        goodsName:'酸辣土豆丝',
                        price:'88',
                        imgPath:'https://p1.meituan.net/210.0/wmproduct/08417ce19122fad722ffcb94864ba864389061.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:12,
                        belongId:8446,
                        goodsName:'小炒黄牛肉',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/wmproduct/c95b76bf310416657f0b0648847fdb29409576.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },{
                        id:13,
                        belongId:8446,
                        goodsName:'蒜蓉粉丝虾',
                        price:'16',
                        imgPath:'https://p1.meituan.net/210.0/wmproduct/e5bc4352310fa26da5feb48110e55687391216.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },{
                        id:14,
                        belongId:8446,
                        goodsName:'小炒猪肝',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/xianfudwm/fa24e2f69b37c254754357025ef45b2d201086.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },{
                        id:14,
                        belongId:8446,
                        goodsName:'小炒猪肝',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/xianfudwm/fa24e2f69b37c254754357025ef45b2d201086.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    }
                ]
            },
            {
                id:8447,
                typeName:'烤官大串',
                img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
                goodList:[
                    {
                        id:21,
                        belongId:8447,
                        goodsName:'鱼豆腐（8串）/手',
                        price:'88',
                        imgPath:'https://p0.meituan.net/210.0/wmproductdwm/b43324b4f23171fcd9ec6e1e7c070f7c542078.png',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:22,
                        belongId:8447,
                        goodsName:'羊肉串(1串）',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/wmproductdwm/609afbcdf6650cb70706a2e7439fdb70575053.png',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },{
                        id:23,
                        belongId:8447,
                        goodsName:'里脊肉（大）',
                        price:'16',
                        imgPath:'https://p1.meituan.net/210.0/wmproductdwm/4352f4613be42df493865cfff098833d121274.jpg',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    }
                ]
            },
            {
                id:8448,
                typeName:'特色菜',
                img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
                goodList:[
                    {
                        id:21,
                        belongId:8448,
                        goodsName:'鱼豆腐（8串）/手',
                        price:'88',
                        imgPath:'https://p0.meituan.net/210.0/wmproductdwm/b43324b4f23171fcd9ec6e1e7c070f7c542078.png',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:22,
                        belongId:8448,
                        goodsName:'羊肉串(1串）',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/wmproductdwm/609afbcdf6650cb70706a2e7439fdb70575053.png',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                ]
            },
            {
                id:8448,
                typeName:'特色菜',
                img:'gttps://p0.meituan.net/210.0/xianfudwm/2aeeb89865aa012229361cdd7eb6331077555.jpg',
                goodList:[
                    {
                        id:21,
                        belongId:8448,
                        goodsName:'鱼豆腐（8串）/手',
                        price:'88',
                        imgPath:'https://p0.meituan.net/210.0/wmproductdwm/b43324b4f23171fcd9ec6e1e7c070f7c542078.png',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                    {
                        id:22,
                        belongId:8448,
                        goodsName:'羊肉串(1串）',
                        price:'16',
                        imgPath:'https://p0.meituan.net/210.0/wmproductdwm/609afbcdf6650cb70706a2e7439fdb70575053.png',
                        remainNum:52,
                        goodsNum:0,
                        valuationUnit:'份',
                        buyUnit:'份',
                        describe:'这是一份非常好吃的鸡排饭'
                    },
                ]
            }
        ],
    },
    getters:{
        categoryList:function (state) {
            var categorys = [];
            state.categoryList.forEach(function (category) {
                if (category.goodList.length>0) {
                    categorys.push(category)
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
            if (params.isAdd) {  // 添加
                // 遍历购物车列表 判断购物车列表中是否已经再存要添加的商品
                state.shopCart.foodList.forEach(function(foodItem,index) {
                    // 如果已存在，就修改购物车中的商品信息，并且把index索引赋值给oFoodIndex
                    if (foodItem.id == oFood.id) {  
                        oFoodIndex = index;
                        foodItem.goodsNum++;  // 修改商品数量加1
                    }
                });
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
                        state.shopCart.foodList.splice(oFoodIndex,1);
                    }else{ 
                        state.shopCart.foodList[oFoodIndex].goodsNum--;
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
        emptyShopCart({ commit }){
            commit('emptyShopCart')
            // axios({
            //     method:'post',
            //     url:Api.clearCartUrl
            // }).then(function (res) {
            //     console.error('清空购物车')
            //     console.log(res)
            //     var data = res.data;
            //     if (data.flag==1) {
            //         commit('emptyShopCart')
            //     }
            // }).catch(function (error) {
            //     console.error('清空购物车失败：'+error)
            // })
        },
        /**
         * 获取购物车数据
         * @param {*} context 
         */
        loadCartData({state}){
            // axios({
            //     method:'post',
            //     url:Api.cartDataUrl,
            // }).then(function (res) {
            //     console.error('获取购物车数据')
            //     console.log(res)
            //     var data = res.data;
            //     if(data.flag==1 && data.goodsList){
            //         state.shopCart.foodList = data.goodsList;
            //     }
            // }).catch(function (error) {
            //     console.error('获取购物车数据失败：'+error)
            // })
        },
        /**
         * 修改购物车内容
         * @param {*} param 
         * @param {*} json 
         */
        editShopCart({commit,state},json){
            console.log(json.params)
            var params = json.params;
            commit('editShopCart',params)
            // var data = {
            //     categoryId:params.food.belongId,
            //     categoryName:params.food.categoryName,
            //     takeOutId:state.pageInfo.currentSelect.id,
            //     goodsId:params.food.id,
            //     goodsName:params.food.goodsName,
            //     goodsNum:0,
            //     valuationUnit:params.food.valuationUnit,
            //     buyUnit:params.food.buyUnit,
            //     price:params.food.price
            // }
            // var successFn = function (res) {
            //     console.error('修改商品')
            //     console.log(params)
           
            //     if (res.data.flag==1) {
            //         commit('editShopCart',params)
            //     }
            // };

            // if(params.isAdd){  // 添加商品
            //     data.goodsNum = 1;
            // } else {  // 删除商品
            //     data.goodsNum = -1;
            // }

            // axios({
            //     method:'post',
            //     url:Api.editCartUrl,
            //     data:qs.stringify(data),
            // }).then(successFn)
            // .catch(function (error) {
            //     console.error('修改商品信息失败：'+error)
            // })
        },
        /**
         * 获取用户是否被锁定
         * @param {*} param 
         */
        getIslock({state}){
            state.personInfo.isLock = false
            // axios({
            //     method:'post',
            //     url:Api.isLockUrl
            // }).then(function (res) {
            //     console.error('获取用户是否被锁定')
            //     console.log(res)
            //     if (res.data.flag==1) {
                 
            //         state.personInfo.isLock = Number(res.data.state);
            //     }
            // }).catch(function (err) {
            //     console.error('获取用户是否被锁定失败！')
            //     console.log(err)
            // })
        },
        /**
         * 获取商品分类列表
         */
        getCategoryList({state,commit}){
            var currentSelectId = state.pageInfo.currentSelect.id;
            console.error('获取商品分类列表')
            // axios({
            //     method:'post',
            //     url:Api.categoryListUrl,
            //     data:qs.stringify({
            //         takeOutId:currentSelectId
            //     })
            // }).then(function (res) {
            //     console.error('获取分类列表')
            //     console.log(res) 
            //     var data = res.data;
            //     if (data.flag==1) {
            //         if (data.categoryList && data.categoryList.length>0) {
            //             state.categoryList = data.categoryList;
            //             state.pageInfo.isShowPage = true;
            //             return false;
            //         }
            //     }
            //     state.pageInfo.isShowPage = false
            // }).catch(function (err) {
            //     console.error('获取分类列表失败！')
            //     console.log(err)
            //     state.pageInfo.isShowPage = false
            // })
        },
        /**
         * 获取可订餐日期列表
         */
        getDateList({state,dispatch}){
            // axios({
            //     method:'post',
            //     url:Api.takeoutListUrl,
            // }).then(function (response) {
            //     console.error('获取可订餐日期列表')
            //     console.log(response)
            //     if (response.data.flag==1 && response.data.data && response.data.data.length>0) {
            //         var data = response.data.data;
            //         state.pageInfo.takeoutInfos = data;
            //         state.pageInfo.currentSelect = data[0];
            //         dispatch('getCategoryList')
            //     }else{
            //         state.pageInfo.isShowPage = false
            //     }
            // }).catch(function (error) {
            //     console.error('获取getDateList，失败')
            //     console.log(error)
            //     state.pageInfo.isShowPage = false
            // })
        },
        /**
         * 获取通知公告内容
         */
        getNotice({state}){
            // axios({
            //     method:'post',
            //     url:Api.noticeUrl
            // }).then(function (res) {
            //     console.error('获取通知公告内容')
            //     console.log(res)
            //     if (res.data.flag == 1) {
            //         state.pageInfo.notice = res.data.notice;
            //     }
            // }).catch(function (err) {
            //     console.error('获取通知公告内容失败！')
            //     console.log(err)
            // })
        },

        /**
         * 选择外卖
         * @param {*} state 
         * @param {*} dateValue 
         */
        editSelect({state,dispatch,commit},takeout){
            // console.log(takeout)
            // state.pageInfo.currentSelect = takeout;
            commit('emptyShopCart')
            // dispatch('getCategoryList')
        },
        /**
         * 立即下单
         */
        placeOrder({state,commit},successFn,errorFn){
            successFn()

            var data = {
                takeOutId:state.pageInfo.currentSelect.id,
                title:state.pageInfo.currentSelect.title
            }
            // axios({
            //     method:'post',
            //     url:Api.placeOrderUrl,
            //     data:qs.stringify(data)
            // }).then(function (res) {
            //     console.log(res)
            //     successFn(res.data)
            //     if (res.data.flag == 1) {
            //         successFn(res.data)
            //     } else {
            //         errorFn(error)
            //     }
            // }).catch(function (error) {
            //     console.error('下单失败')
            //     errorFn(error)
            // })
        }
    }
})

export default store;