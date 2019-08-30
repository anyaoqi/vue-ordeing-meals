<template>
    <div class="header">
        <span class="line"></span>
        <img src="../../assets/images/logo.png" alt="Logo" class="logo">
        <div class="category-wrapper" id="hd-category">
            <ul class="category-list" :style="categoryStyle">
                <li v-for="(category,index) in categoryList" :key="index" ><a :href="'#'+category.id" @click="initScroll">{{category.typeName}}</a></li>
            </ul>
            <span class="btn-all" v-if="categoryList.length>5" @click="toggleCategory" >
                <span class="all-icon"></span> 全部
            </span>
        </div>
       
        <div class="header-right">
            <div class="selecte-date" v-if="takeoutValue">
                <span>选择外卖：</span>
                <input type="text" class="date-text" :value="takeoutValue.title" placeholder="请选择" readonly  @click="isShowSd=true">
            </div>
            <button class="btn btn-primary btn-myorder" @click="myOrder">我的订单</button>
        </div>
        <div class="date-wrapper" v-show="isShowSd" @mouseleave="isShowSd=false" v-if="takeoutInfos && takeoutInfos.length>0">
            <div class="radio" v-for="(takeout,index) in takeoutInfos" :key="index">
                <label>
                    <input type="radio" 
                            name="optionsRadios" 
                            id="optionsRadios1" 
                            :value="takeout.id" 
                            :checked="takeoutValue.id == takeout.id"
                            @click="selectDate(takeout)">
                    {{takeout.title}}
                </label>
            </div>
        </div>
    </div>
</template>

<script>
// import scrollFix from 'assets/lib/jquery.scrollfix/scrollfix';
import Api from '@/api';
import qs from 'qs';
import myOrder from "components/myOrder/myOrder";
export default {
  props: ['initScroll'],
  data() {
    return {
        isShowSd:false,
        categoryStyle:{
            height:'80px'
        }
    }
  },
  computed: {
    categoryList(){
        return this.$store.getters.categoryList;
    },  
    takeoutValue(){
        return this.$store.state.pageInfo.currentSelect;
    },
    takeoutInfos(){
        return this.$store.state.pageInfo.takeoutInfos;
    }
  },
  components: {
      myOrder
  },
  created () {
      var _this = this;
      var alertMsg = function (params) {
          _this.$layer.alert('<div style="height:42px;line-height:42px">'+ params.msg +'</div>',{
                icon:params.icon,
                shadeClose: false,//点击遮罩是否关闭
                shade: false,//是否显示遮罩
            },function (index) {
                // _this.$store.dispatch('emptyShopCart');
                _this.$layer.close(index)

            })
      }
      var paramsJson = {
          alertMsg:alertMsg
      }
      this.$store.dispatch('getIslock',paramsJson)
  },
  mounted () {
    this._initScrollFix()  
    this.getDateList();
  },
  methods:{
      selectDate(takeout){
          this.$store.dispatch('editSelect',takeout)
          this.isShowSd = false
      },
      myOrder() {
        var _this = this;
        this.$layer.open({
            type: 2,
            maxmin:true,
            // zIndex:1900,//layer默认19891014 	dialog默认值为1976
            content: {
                content: myOrder, //传递的组件对象
                parent: this,//当前的vue对象
                data:{}//props
            },
            area: ["90%", "90%"],
            title: '我的订单',
            cancel:function () {
                _this.juderAddOrder();
            }
        });
      },
       _initScrollFix(){
        //   $("#hd-category").scrollFix({
        //       startTop:'100px',
        //       left:100,
        //       'zIndex':99,
        //       baseClassName:'categoryfixed'
        //    });
        $(window).on('scroll',function (ev) {
            var _scrollTop = $(document).scrollTop();
            // console.log(_scrollTop,_scrollTop>=582,$("#hd-category").hasClass(':hidden'))
            if (_scrollTop>=582 && !$("#hd-category").hasClass('categoryfixed')) {
                $("#hd-category").addClass('categoryfixed');
            }else if (_scrollTop<582 && $("#hd-category").hasClass('categoryfixed')) {
                 $("#hd-category").removeClass('categoryfixed');
            }
        })
      },
      toggleCategory(flag){
          var _this = this;
          if (flag == 'show') {
            $('#hd-category .category-list').animate({
                height:'auto'
            },function () {
                _this.categoryStyle.height = 'auto';
            })
          }else if (flag =='hide') {
            $('#hd-category .category-list').animate({
                height:'80px'
            },function () {
                _this.categoryStyle.height = '80px';
            })
          }else{
            if (this.categoryStyle.height=='auto') {
                this.toggleCategory('hide');
            }else{
                this.toggleCategory('show');
            }
          }
      },
      getDateList(){
          this.$store.dispatch('getDateList')
      },
      goScroll(){
        var _this = this;
        console.log($('.category-list a'))
        console.log('点击了')
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash) || this.hash;
            $target = $target.length && $target || $('[data-name=' + this.hash.slice(1) + ']');
            if (!$target) {
                $target = $('[data-name=' + this.hash.slice(1) + ']')
            }
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset-90
                }, 500);
                if (_this.categoryStyle.height=='auto') {
                    _this.toggleCategory()
                }
                return false;
            }
        }else{  // 兼容 IE
            var _target = $('[data-name=' + this.hash.slice(1) + ']')
            $('html,body').animate({
                scrollTop: Math.floor(_target.offset().top)-90
            }, 500);
            if (_this.categoryStyle.height=='auto') {
                _this.toggleCategory()
            }
            return false
        }
    
      },
      juderAddOrder(){
            var _this = this;
            var params = {
                success:function (data) {
                    if (data.data.orderId) {  // 如果之前下过订单就修改按钮文字
                        $('.btn-buy').text('追加订单')
                    } else {
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
    margin:0;
    padding:0;
    border:0;
    font-family:'Microsoft YaHei'
}
a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #ffffff;
    text-decoration: none;

}
.header {
    position: fixed;
    top: 0;
    z-index: 99;
    /* width: 1920px; */
    width: 100%;
    height: 80px;
    line-height: 80px;
    align-items: center;
    border-bottom: 1px solid #ffffff;
    font-size: 16px;
    color:#ffffff;
    box-shadow: 0 3px 10px 0 rgba(0,0,0,0.06);
    background-color: #1c1b1b;
    opacity: 1;
    /* overflow: hidden; */
}
.header .line {
    position: absolute;
    top:80px;
    width: 100%;
    /* border-top: 1px solid #ffffff; */
}
.header .logo {
    width: 73px;
    height: 73px;
    margin: 5px 42px;
    /* padding:0 5px; */
    /* border: 1px solid #ccc; */
    border-radius: 50%;
    background: #1c1b1b;
}
.header .category-wrapper {
    display: none;
    vertical-align: top;
    width: 800px;
    height: 80px;
}
.header .categoryfixed {
    display: inline-block;
    margin-left: 150px;
}
.header .btn-all {
    display: inline-block;
    width: 100px;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
}
.header .all-category {
    background: #1c1b1b;
}
.header .category-list {
    /* display: none; */
    display: inline-block;
    position: relative;
    top: -1px;
    width: 650px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
}
.category-list li {
    float: left;
    width: 130px;
    text-align: center;
    cursor: pointer;
    letter-spacing: 2px;
    border-bottom: 1px solid #ffffff;
}
.header .header-right {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 20px;
    padding-right: 20px;
}
.header-right .selecte-date  {
    display: inline-block;
    vertical-align: top;
}
.selecte-date .date-text {
    display: inline-block;
    width: 230px;
    height: 25px;
    padding:0 10px;
    line-height: 22px;
    color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    background: #1c1b1b;
}
.header-right .btn-myorder {
    margin:0 30px;
    padding: 2px 10px;
    font-size: 16px;
    background: none;
}
.header .date-wrapper {
    position: fixed;
    top: 80px;
    right: 185px;
    width: 235px;
    padding:15px;
    line-height: 24px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #1c1b1b;
}
.date-wrapper .radio {
    margin-bottom: 10px;
}
.date-wrapper .radio:last-child {
    margin-bottom: 0px;
}

@media only screen and (max-width: 1600px) { 
    /* .header {
        width: 1600px;
    } */
}

</style>
