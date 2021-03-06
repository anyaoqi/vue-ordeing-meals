import Vue from 'vue';
import store from '@/store';

export default {
    /**
     * 判断购物车内是否有同组的商品
     * @params commodity 商品对象
     * @return true/fasle  true为符合套餐规则;false不符合套餐规则
     */
    judgeGroup:(commodity)=> {
        let buyNumber = 0;  // 已购套餐（0为未购，其他数字为已购）
        let mealId = commodity.mealId; // 套餐id
        let commodityId = commodity.id;
        let mealOptNum = commodity.mealOptNum;  // 套餐内商品可选数目
        if (!mealId) {  // 如果不是套餐就直接返回true
            return true
        } 
        store.state.shopCart.foodList.forEach(food => {
            if (food.mealId == mealId && food.id != commodityId) {
                buyNumber++
            }
        });
        if (store.state.pageInfo.orderInfo.orderList) {
            store.state.pageInfo.orderInfo.orderList.forEach(order => {
                if (order.mealId == mealId && order.id != commodityId) {
                    buyNumber++
                }
            });
        }
        
        return buyNumber<mealOptNum;
    }
}