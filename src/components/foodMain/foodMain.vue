<template>
    <div class="food-main">
        <div class="food-category swiper-container" :style="{background:!isShowPage ? '#fff' : ''}">
            <span class="category-title" v-if="isShowPage">菜单分类</span>
            <img src="../../assets/images/noFood.png" alt="暂无可预订外卖" v-if="!isShowPage">
            <div class="category-list" id="swiper-container" v-if="isShowPage" :style="swiperStyle">
                <ul class="swiper-wrapper">
                    <li v-for="(category,index) in categoryList" :key="index" class="swiper-slide">
                        <a :href="'#'+category.id" @click="initScroll">
                            <!-- <img :src="category.img" alt="背景图" class="category-img"> -->
                            <span class="category-bg"></span>
                            <span class="category-name">{{category.typeName}}</span>
                        </a>
                    </li>
                </ul>
                <!-- Add Arrows -->
                <div class="swiper-button-next" v-if="categoryList.length>5"></div>
                <div class="swiper-button-prev" v-if="categoryList.length>5"></div>
            </div>
        </div>
        <div class="food-wrapper" id="food-wrapper" v-if="isShowPage">
            <div class="notice">
                <span class="notice-title"></span>
                <marquee class="notice-content">
                    <span class="notice-text">{{notice}}</span>
                </marquee>
            </div>
            <FoodList />
        </div>
        <div class="info-wrapper" v-if="isShowPage" :style="infoStyle">
            <div class="info-header">
                <h3 class="info-title">注意事项</h3>
                <span class="info-close" @click="toggleInfo">✖</span>
            </div>
            <div class="info-content">
                {{info}}
            </div>
            <div class="info-bar" v-show="infoStyle.left!=0">
                <span class="bar-text">注意事项</span>
                <span class="bar-icon swiper-button-next" @click="toggleInfo"></span>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import FoodList from "../foodList/foodList";
import Api from '@/api'
export default {
  props: ['initScroll'],
  data() {
    return {
        infoStyle:{
            left:0
        },
        mySwiper:false,
    }
  },
  computed: {
      categoryList(){
          return this.$store.getters.categoryList;
      },
      swiperStyle(){
        return {  'width':this.filterWidth }
      },
      filterWidth(){
          var categoryList = this.$store.getters.categoryList;
          return (categoryList.length*200)+((categoryList.length-1)*75)+'px';
      },
      info(){
          return this.$store.state.pageInfo.currentSelect.attentionItem||'暂无注意事项';
      },
      isShowPage(){
          return this.$store.state.pageInfo.isShowPage;
      },
      notice(){
          return this.$store.state.pageInfo.notice;
      },
  },
  components: {
      FoodList
  },
  created () {
      this.getNotice();
  },
  mounted () {
    this.$nextTick(function () {
        this._initSwiper()  
    })  
  },
  watch:{
      'swiperStyle':function (newQuestion,oldQuestion) {
          this.$nextTick(function () {
            console.log('初始化_initSwiper')
            this._initSwiper()  
          })
      }
  },
  methods: {
      _initSwiper(){
        var _this = this;
        if (this.mySwiper) {
            this.mySwiper.slideTo(0)
            this.mySwiper.destroy()
        }
        this.mySwiper = new Swiper('#swiper-container', {
            slidesPerView:_this.categoryList.length>=5 ? 5 : _this.categoryList.length,
            spaceBetween: 74,
            slidesPerGroup:_this.categoryList.length>=5 ? 5 : _this.categoryList.length,
            simulateTouch:false,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
      },
      toggleInfo(){
          if (this.infoStyle.left==0) {
              this.infoStyle.left = '-210px'
          }else{
              this.infoStyle.left=0
          }
      },
      getNotice(){
          this.$store.dispatch('getNotice')
      }
  } 
}
</script>

<style scoped>
.food-main {
    margin-top: 70px;
}
.food-main .food-category {
    /* height: 400px; */
    padding-bottom: 25px;
    text-align: center;
    background: rgb(252, 224, 196);
    box-sizing: border-box;
}
.food-category .category-title {
    display: block;
    width: 312px;
    height: 75px;
    line-height: 75px;
    margin:40px auto;
    padding-top: 18px;
    font-size: 18px;
    font-weight: 700;
    color: rgb(101, 55, 74);   
    background: url('../../assets/images/menu-bg.png')
}
.food-category .category-list {
    width: 1296px;
    display: inline-block;
    max-width: 1296px;
    height: 240px;
    margin: 45px auto;
    color: #ffffff;
    overflow: hidden;
}
.category-list li {
    position: relative;
    width: 200px;
    height: 240px;
    border-radius: 8px;
    cursor: pointer;
}
.category-list li:last-child{
    margin-right: 0px;
}
.category-list .swiper-button-prev {
    top:60%;
    left: 10%;
    outline: none
}
.category-list .swiper-button-next {
    top:60%;
    right: 10%;
    outline: none
}
.category-list a{
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #ffffff;
}
.category-list .category-img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
.category-list .category-name {
   position: absolute;
   top:0;
   bottom:0;
   left:0;
   right: 0;
   margin: auto;
   height: 75px;
   line-height: 75px;
   font-size: 18px;
   font-weight: 700;
   letter-spacing: 2px;
   border-top: 1px solid #ffffff;
   border-bottom: 1px solid #ffffff;
   background: rgba(101, 55, 74,0.7);
   transition: all 0.2s linear;
}
.category-list li:hover .category-name {
   height: 100%;
   line-height: 240px;
   font-size: 24px;
}
.category-list .category-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(101, 55, 74,0.5);
    border-radius: 8px;
}

.food-wrapper {
    background: url('../../assets/images/container-bg.png') rgb(252, 244, 225);
}
.food-wrapper .notice {
    width: 1296px;
    margin: auto;
    padding:25px 0;
    font-size: 0;
}
.notice .notice-title {
    float: left;
    width: 135px;
    height: 38px;
    font-size: 14px;
    background: url('../../assets/images/notice.png') no-repeat center;
}
.notice .notice-content {
    position: relative;
    width: calc(100% - 135px);
    height: 38px;
    line-height: 38px;
    padding-left: 110px;
    font-size: 14px;
    color: rgb(101, 55, 74); 
    box-sizing:border-box;
    overflow: hidden;
} 
.notice-content .notice-text {
    display: inline-block;
    white-space: nowrap;
    transition: all 0.1s;
}
.notice .notice-content li {
    display: inline-block;
}
.notice-content .notic-icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border-radius: 50%;
    background: rgb(101, 55, 74); 
}

.info-wrapper {
    position: relative;
    z-index: 10;
    position: fixed;
    top:450px;
    left: -210px;
    width: 210px;
    min-height: 320px;
    padding: 15px;
    color: #ffffff;
    border:2px solid rgb(196,138,79);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 1px 2px 10px #000;
    background: rgb(196,138,79);
    transition: all 0.2s linear;
}
.info-wrapper .info-header {
    padding-bottom:10px;
    border-bottom: 1px solid rgb(252, 224, 196);
    /* background: rgb(252, 224, 196); */
}
.info-header  .info-title {
    margin:0;
    display: inline-block;
}
.info-header  .info-close {
    float: right;
    padding:0 5px;
    cursor: pointer;
}
.info-wrapper .info-content {
    max-height: 420px;
    padding:15px 0;
    overflow-y: auto;
    overflow-wrap: break-word;
    white-space: pre-line;
    word-break: break-all;
    word-wrap: break-word;
    background: rgb(196,138,79);
}
.info-wrapper .info-bar {
    position: absolute;
    top: 0;
    right: -58px;
    padding:15px;
    font-size: 18px;
    letter-spacing: 5px;
    border:2px solid rgb(101, 55, 74);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: rgb(196,138,79);
    transition: all 0.2s linear;
}
.info-bar .bar-text {
    writing-mode:vertical-lr;
    -webkit-writing-mode: vertical-lr;
    -ms-writing-mode: vertical-lr;
    /* 文字垂直 兼容IE */
    writing-mode: tb-rl;
    overflow: hidden;
    width: 16px;
    line-height: 20px;
    font-size: 16px;
    letter-spacing: 2px;
}
.info-bar .bar-icon {
    /*width: 22px;
    height: 28px;*/
    right: -27px;
    opacity:1 !important;
    cursor:pointer !important;
    pointer-events:auto !important
}




@media only screen and (max-width: 1600px) {
    .category-list .swiper-button-prev {
        left: 5%;
    }
    .category-list .swiper-button-next {
        right: 5%;
    }
}

</style>
