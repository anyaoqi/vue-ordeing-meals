<template>
    <div class="food-list-main">
        <div class="category" 
             v-for="(category,index) in categoryList" 
             :key="index" 
             :data-category-id="category.id" 
             :data-name="category.id">
            <div class="category-header">
                <h2 class="category-title">{{category.typeName}}</h2>
            </div>
            <ul class="food-list">
                <li class="col-sm-6 col-md-3 food" 
                    v-for="(food,i) in category.goodList" 
                    :style="{marginRight: (i+1)%4==0 && i!=0 ? '0px' : ''}"
                    :key="i" :data-name="food.goodsName" 
                    :data-id="food.id" 
                    :data-price="food.price">
                    <img  v-if="food.imgPath" :src="imgFilter(food.imgPath)"  alt="缩略图" class="food-img">
                    <img  v-if="!food.imgPath" src="../../assets/images/noFoodImg.png" alt="缩略图" class="food-img">
                    <div class="food-content">
                        <span class="name" :title="food.goodsName">{{food.goodsName}}</span>
                        <span class="price">¥ {{food.price}}<span class="unit">/{{food.valuationUnit}}</span></span>
                        <div class="modify-num" v-if="!isLock">
                            <div v-if="(food.amountLimit==1 && food.repertory > 0) || food.amountLimit!=1">
                                <span href="javascript:;" class="add-one iconfont icon-zengjia"  :class="{disabled:isLoading(food)}" @click="addFood(food)"></span>
                                <input type="text" :value="food.goodsNum" class="food-num" disabled>
                                <span href="javascript:;" class="del-one iconfont icon-jianqu" :class="{disabled:isLoading(food)}" @click="delFood(food)"></span>
                            </div>
                            <div v-if="food.repertory <= 0 && food.amountLimit==1">
                                <span>已售罄</span>
                            </div>
                        </div>
                        <span class="inventory" v-if="food.amountLimit==1 && food.repertory>0">{{repertory(food)}} </span>
                    </div>
                    <p class="desc" v-if="food.describe">
                        {{food.describe}}
                    </p>
                    <div class="combination" v-if="food.mealName">
                        <span class="cbt-text">{{food.mealName}}</span>
                    </div>
                    <div class="mask" v-if="isOptional(food)"></div>
                    <div class="mask loading" v-show="isLoading(food)">
                        <span> 商品添加中.....请稍候  </span>
                    </div>
                </li> 
            </ul>
        </div>
    </div>
</template>

<script>
import Api from '@/api'
import common from '@/assets/js/common';

export default {
  created () {
  },
  data() {
    return {
    }
  },
  computed: {
      isLock(){
			console.log(!this.$store.state.personInfo.isLock)
			console.log(Boolean(0))
          return this.$store.state.personInfo.isLock;
      },
      categoryList(){
          return this.$store.getters.categoryList;
      },
      repertory(){
          return function (food) {
              var repertory;
              if (food.repertory > 0) {
                  repertory = '库存:'+food.repertory+food.buyUnit;
              }else{
                  repertory =  '　'
              }
              return repertory;
          }
      },
      isOptional(){
          var _this = this;
          return function (food) {
              var isConformRule = common.judgeGroup(food);
              return !isConformRule
          }
      },
      isLoading(){
          var _this = this;
          return function (food) {
              var isLoading = food.isLoading;
              return isLoading;
          }
      }
  },
  methods: {
      addFood(food){
            // 判断是否超过当前库存，超过库存就停止执行，不再增加
            console.log(food.amountLimit,food.goodsNum,food.repertory)
            // if (food.amountLimit==1 && food.goodsNum >= food.repertory) {
            //     return
            // }
            var params = {
                food:food,
                isAdd:true
            }
            //   this.$store.commit('editShopCart',params)
            
            this.$store.dispatch('editShopCart',{ params:params })
        
      },
      delFood(food){
          // 判断是否小于等于0，如果小于等于0就停止执行   
          if (food.goodsNum<=0) {
                return
          }
          var params = {
              food:food,
              isAdd:false
          }
        //   this.$store.commit('editShopCart',params)
        this.$store.dispatch('editShopCart',{ params:params })
      },
	  imgFilter(imgPath){
        if(!imgPath) return
        if (imgPath.indexOf('http://') !=-1 && imgPath.indexOf('https://') !=-1) {
              imgPath = imgPath.replace(/\\/g,'/')
		      imgPath = Api.url +imgPath;
        }
		return imgPath;
	  }
  }
}
</script>

<style scoped>
* {
    margin:0;
    padding:0;
    border:0;
}
.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}
.food-list-main {
    width: 1296px;
    margin: auto;
    padding-bottom: 50px;
}
.food-list-main .category {
    margin-bottom: 50px;
}
.category .category-header {
    height: 55px;
    line-height: 55px;
    color: rgb(101, 55, 74)
}
.category-header .category-title {
    font-weight: 700;
    font-size: 22px;
}
.category-header .category-title::before {
    content: '';
    display:inline-block;
    width: 22px;
    height: 22px;
    margin-right: 15px;
    border-radius: 50%;
    background: rgb(101, 55, 74);
    vertical-align: top;
}
.category .food-list {
    display: inline-block;
    width: 100%;
}
.food-list li {
    position: relative;
    width: 300px;
    height: 240px;
    margin-right: 32px;
    margin-bottom: 25px;
    border:2px solid rgb(101, 55, 74);
    border-radius: 6px;
    overflow: hidden;
}
.food-list li:last-child {
    margin-right: 0;
}
.food-list li:hover .desc{
    top: 0px;
}
.food-list .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #cccccc;
    filter:alpha(opacity=60);  
    -moz-opacity:0.6;  
    -khtml-opacity: 0.6;  
    opacity: 0.6;  
}
.food-list .food-img {
    width: 100%;
    height: 100%;
}
.food-list .food-content {
    position: absolute;
    bottom: 0px;
    padding:3px 10px;
    padding-top: 8px;
    width: 100%;
    /* height: 40px; */
    /* line-height: 30px; */
    color: #ffffff;
    font-size: 16px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background: rgba(0, 0, 0, 0.5);
}
.food-content .name {
    display: inline-block;
    width: 120px;
    height: 22px;
    overflow: hidden;
}
.food-list li .desc {
    position: absolute;
    top:-100%;
    width: 100%;
    padding:5px;
    line-height: 24px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    overflow-wrap: break-word;
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    z-index: 10
}
.food-list .price {
    /* margin-left: 32px; */
    position: absolute;
    right: 110px;
}
/* .food-list .price::before{
    content: '￥'
} */
.food-list .modify-num {
    float:right;
    width: 28%;
    margin-left: 10px;
}
.modify-num .del-one,.modify-num .add-one{
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    /* margin: 6px 0; */
    width: 18px;
    height: 18px;
    line-height: 15px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #fff;
}

.modify-num .food-num {
    width: 28px;
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
.modify-num .food-num:focus {
    outline: none;
}
.food-list .inventory {
    display: block;
    font-size: 12px;
}

.combination {
   display: inline-block;
    position: absolute;
    top: 5px;
    right: 7px;
    padding: 0px 2px;
    color: #ffffff;
    border-radius: 3px;
    background: #65374a;
}
/* 兼容IE修改 */
.icon-jianqu::before {
    content:'-'
}
.icon-zengjia::before {
    content:'+'
}

.food-list .loading {
    background: rgb(252, 224, 196);
    text-align: center;
    padding: 88px 0;
    font-size: 24px;
    color: #65374a
}
</style>
