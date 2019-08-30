<template>
    <div class="myOrder">
        <h1>我的订单页面</h1>
        <!-- <iframe src="/modules/mypage/wmgl/index/myOrderList.html" frameborder="0" id="myOrderIframe"></iframe> -->
    </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted () {
      $('.vl-notify-content').css('height','100%')
  },
}
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
}
.myOrder, #myOrderIframe {
    width: 100%;
    height: 100%;
}
</style>
