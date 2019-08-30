<template>
  <div id="app">
    <Header ref="headerChild" :initScroll="_initScroll"></Header>
    <FoodMain :initScroll="_initScroll"></FoodMain>
    <ShopCart></ShopCart>
  </div>
</template>

<script>
import Header from 'components/header/header';
import FoodMain  from 'components/foodMain/foodMain';
import ShopCart from 'components/shopCart/shopCart'
export default {
  name: 'app',
  data () {
    return { 
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Header,
    FoodMain,
    ShopCart
  },
  methods: {
    _initScroll(ev){
        var _target = ev.currentTarget;
        var _this = this;
        if (location.pathname.replace(/^\//, '') == _target.pathname.replace(/^\//, '') && location.hostname == _target.hostname) {
            var $target = $(_target.hash) || _target.hash;
            $target = $target.length && $target || $('[data-name=' + _target.hash.slice(1) + ']');
            if (!$target) {
                $target = $('[data-name=' + _target.hash.slice(1) + ']')
            }
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset-90
                }, 500);
                if (_this.$refs.headerChild.categoryStyle.height=='auto') {
                    _this.$refs.headerChild.toggleCategory()
                }
                return false;
            }
        }else{  // 兼容 IE
            var _target = $('[data-name=' + _target.hash.slice(1) + ']')
            $('html,body').animate({
                scrollTop: Math.floor(_target.offset().top)-90
            }, 500);
            if (_this.$refs.headerChild.categoryStyle.height=='auto') {
                _this.$refs.headerChild.toggleCategory()
            }
            return false
        }
    }
  }
}
</script>

<style>

* {
    margin: 0;
    padding:0;
    border: 0;
}
body {
    background: url(/dist/imgs/container-bg.png?c2a0dd9811fc2c99410078a2da39f81e) rgb(252, 244, 225);
    -ms-overflow-style:scrollbar;
}
li {
    list-style: none;
}
a,a:hover,a:active {
    color: #000000;
    text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* 解决layer弹出框模糊问题 */
.vl-notify.vl-notify-main {
    padding-bottom: 0px !important;
}
</style>
