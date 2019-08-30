var Api = (function () {
    
    var url_dev = "";    // 开发环境
    var url_test = "http://192.168.90.135:8080";  // 测试环境
    var url_proxy = "/api";   // 本地环境 webpack.proxy跨域
    var url = url_proxy;
    
    var url_categoryList =  '/dist/data/getWmGoods.json'; // 获取商品列表
    var url_takeoutList = '/dist/data/getList.json';   // 获取可订餐的外卖列表
    var url_clearCart = '/dist/data/clearCart.json';  // 清空菜品接口
    var url_getCartData = '/dist/data/getCartData.json'; // 获取购物车数据
    var url_editCart = '/dist/data/addCart.json';  // 修改购物车信息
    var url_getNotice ='/dist/data/getLast.json';  // 获取最新一条通知公告内容
    var url_isLock = '/dist/data/getLoseState.json';  // 获取用户是否被锁定
    var url_placeOrder = '/dist/data/placeOrder.json';  // 下单接口
    var url_judgePlaceOrder = url + '/mypage/wmgl/index/order/judgePlaceOrder'; // 判断是否可下单
    var url_judgeAddOrder = '/dist/data/getOrderIdAndPhone.json';//判断是否已经下过订单，下过订单则追加订单

    function getTakeoutListUrl() {
        return  url_takeoutList;
    }
    function getClearCart() {
        return  url_clearCart;
    }
    function getCartData() {
        return  url_getCartData;
    }
    function getEditCart() {
        return  url_editCart;
    }
    function getNotice() {
        return  url_getNotice;
    }
    function getCategoryList() {
        return url_categoryList;
    }
    function getIsLock() {
        return url_isLock;
    }
    function getPlaceOrder(params) {
        return url_placeOrder;
    }
    function getJudgePlaceOrder(params) {
        return url_judgePlaceOrder;
    }
    function getJudgeAddOrder(params) {
        return url_judgeAddOrder;
    }
    return {
		url:url,
        takeoutListUrl:getTakeoutListUrl(),
        clearCartUrl:getClearCart(),
        cartDataUrl:getCartData(),
        editCartUrl:getEditCart(),
        noticeUrl:getNotice(),
        categoryListUrl:getCategoryList(),
        isLockUrl:getIsLock(),
        placeOrderUrl:getPlaceOrder(),
        judgePlaceOrder:getJudgePlaceOrder(),
        juderAddOrder:getJudgeAddOrder(),
    }
})()

export default Api