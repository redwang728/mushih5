<template>
  <div class="paySuccess">
    <x-header title="付款成功" :left-options="{backText: ''}" class="header"></x-header>
    <div class="payok">
      <div class="payimg">
        <img src="@/assets/img/payok.png" alt="">
      <p>支付成功</p>
      <p style="  line-height: 5vw;">  您的订单已提交至工厂</p>
      </div>
      <div class="gotoindex">
        <x-button class="submitBtn" type="primary" @click.native="goindex">查看订单</x-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .paySuccess {
    width: 98vw;
    border-bottom: 1px solid #f4f4f4;
    margin: 0 auto;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
  }

  .payok {
    margin-top: 50px;
    background: #fff;
    width: 100vw;
    height: 100vw;
    overflow: hidden;
  }

  .payimg {
    height: 40vw;
    margin: 10vw auto;
    line-height: 10vw;
    text-align: center;
    font-weight: bold;
    font-size:15px;
  }

  .payimg img {
    width: 24vw;
    height: 28vw;
  }

  .vux-header {
    background-color: #fff;
  }

  .gotoindex {
    width: 50vw;
    margin: 0 auto;
    margin: 0 auto;
  }

  .vux-header >>> .vux-header-title {
    color: #333333;
    font-weight: bold;
    letter-spacing: 1px;
  }
</style>

<script>
  import {
    XHeader,
    XButton
  } from 'vux';

  export default {
    data () {
      return {};
    },
    methods: {
      goindex () {
        this.$router.push({path: '/center/myorder', query: {orderStatus: 1, index: 1}});
        // :to="{path:'/center/myorder',query:{orderStatus:1,index:1}}
      }
    },
    mounted () {

    },
    components: {
      XHeader,
      XButton
    }
  };

</script>

