<template>
  <div class="pay" v-show="show">
    <x-header title="确认付款" :left-options="{backText: ''}" class="header"></x-header>
    <div class="pay_info">
      <div v-for="(index,item) in payDate" :key="item" style="margin-bottom:10px;background:#fff;padding:10px 0">
        <ul>
          <li>店铺名称 : {{index.shopName}}</li>
          <li>
            <div class="li_left">商品名称 :</div>
            <div class="li_right ellipsis">
              <ul>
                <li v-for="(val,key) in index.combinates.split(',')">{{val}}</li>
              </ul>
            </div>
          </li>
          <li>订单编号：{{orderId}}</li>
          <li>预计送货时间：<span style="color:#ff0000">{{index.latestPostDate}}</span></li>
          <li>支付金额：<span style="color:#ff0000">{{index.totalMoney}}元</span></li>
        </ul>
      </div>
    </div>
    <div class="pay_submit">
      <div class="pay_main">
        <div class="pay_main_left">支付总金额</div>
        <div class="pay_main_right">{{allPrice}}元</div>
      </div>
    </div>
    <div class="submit">
      <x-button class="submitBtn" type="primary" @click.native="payMoney" :disabled="payUsed">{{payMsg}}</x-button>
    </div>
    <div>
      <x-dialog v-model="loads" class="dialog-demo">
        <div style="padding:15px;">
          <inline-loading></inline-loading>
          数据加载中.....
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import {XHeader, XButton, XDialog, InlineLoading, Toast} from 'vux';
  import qs from 'qs';
  import {setInterval, clearInterval} from 'timers';

  export default {
    data () {
      return {
        orderId: '',
        payDate: [],
        allPrice: '',
        ids: [],
        show: false,
        loads: false,
        payUsed: false,
        payMsg: '立即支付'
      };
    },
    methods: {
      getReqsn () {
        let _data = {
          reqsn: this.orderId
        };
        this.$http.post('/order/confirmOrderInfo?', qs.stringify(_data)).then(res => {
          let resp = JSON.parse(res.request.response);
          this.payDate = resp.data;
          let arr = [];
          let arr1 = [];
          this.payDate.forEach((a, c) => {
            arr.push(a.totalMoney);
            arr1.push(a.orderId);
          });
          this.ids = arr1;
          this.allPrice = arr.reduce(function (preValue, curValue, index, array) {
            return preValue + curValue;
          });
          this.allPrice = this.allPrice.toFixed(2);
        });
      },
      //开启支付
      payMoney () {
        this.payUsed = true;
        this.payMsg = '支付等待中';
        let _data = {
          'reqsn': this.orderId,
          'payType': 'W02',
          'orderIds': this.ids
        };
        this.$http.post('/order/pay', _data, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then(res => {
          let resp = JSON.parse(res.request.response);
          if (resp.code == 200) {
            let response = JSON.parse(resp.data);
            if (typeof WeixinJSBridge === 'undefined') {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(response), false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(response));
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(response));
              }
            } else {
              this.onBridgeReady(response);
            }
          } else {
            this.$vux.toast.text('出错啦，稍后重试:(');
          }
        });
      },
      //调用微信JSSDK
      onBridgeReady (response) {
        let THAT = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': response.appId,     // 公众号名称，由商户传入
            'timeStamp': response.timeStamp,         // 时间戳，自1970年以来的秒数
            'nonceStr': response.nonceStr, // 随机串
            'package': response.package,
            'signType': response.signType,         // 微信签名方式：
            'paySign': response.paySign // 微信签名
          },
          function (res) {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              THAT.getPayInfo();// 获取支付信息
            } else if (res.err_msg == 'get_brand_wcpay_request:fail' || res.err_msg == 'get_brand_wcpay_request:cancel') {
              THAT.$vux.toast.show({
                text: '支付已取消',
                position: 'center',
                type: 'warn',
                width: '9em',
                time: '3000'
              });
              THAT.payUsed = false;
              THAT.payMsg = '立即支付';
              // THAT.$router.push('/');
            }
          }
        );
      },
      //验证支付
      getPayInfo () {
        this.$http.get('/order/checkPaySuccess/?reqsn=' + this.orderId, {timeout: 15000}).then(({data}) => {
          if (data.code == 200) {
            // clearTimeout(timer);
            this.$vux.toast.show({
              text: '支付成功',
              position: 'center',
              type: 'success',
              width: '9em',
              time: '3000'
            });
            this.payUsed = false;
            this.payMsg = '立即支付';
            this.$router.push('/payok');
          } else {
            this.getPayError();
          }
        }).catch(() => {
          this.getPayError();
        });
      },
      //捕获异常
      getPayError () {
        this.$vux.toast.show({
          text: '支付异常',
          position: 'center',
          type: 'warn',
          width: '9em',
          time: '3000'
        });
        this.payUsed = false;
        this.payMsg = '立即支付';
        this.$router.push('/');
      }
    },
    mounted () {
      this.orderId = this.$route.query.data;
      // alert(this.orderId)
      if (`${window.location.href}`.includes('data')) {
        let isreLoad = sessionStorage.getItem('reLoad');
        if (isreLoad == null || isreLoad == undefined) {
          sessionStorage.setItem('reLoad', 'true');
        }
        if (sessionStorage.getItem('reLoad') == 'true') {
          let Nav = window.navigator.userAgent.toLowerCase();
          // let isAndroid = `${Nav}`.includes('android');
          let isIphone = `${Nav}`.includes('iphone');
          if (isIphone) {
            window.location.reload();
            // alert(window.location)
          }
          // this.$router.back(0);
          sessionStorage.setItem('reLoad', 'false');
        }
        this.getReqsn();
        this.show = true;
      } else {
        this.$router.replace({path: '/index'});
      }
    },
    destroyed () {
      sessionStorage.removeItem('reLoad');
    },
    components: {
      XHeader,
      XButton,
      XDialog,
      InlineLoading,
      Toast
    }
  };

</script>

<style scoped>
  .pay_info {
    width: 98vw;
    border-bottom: 1px solid #f4f4f4;
    margin: 0 auto;
    margin-top: 55px;
  }

  .li_left {
    width: 21vw;
    float: left;
  }

  .li_right {
    width: 72vw;
    float: left;
    background: #fff;
    height: auto;
  }

  .li_right ul li {
    line-height: 5vw;
    color: #199ed8;
  }

  .submit {
    width: 60vw;
    margin: 20px auto;
  }

  .pay_info ul li {
    line-height: 7vw;
    text-indent: 3vw;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
  }

  .pay_submit {
    height: 12vw;
    width: 100vw;

    background: #fff;
    margin-top: 20px
  }

  .pay_main {
    width: 90vw;
    height: 12vw;
    margin: 0 auto;
  }

  .pay_main_left {
    float: left;
    width: 40vw;
    height: 12vw;
    font-size: 15px;
    line-height: 12vw;
    font-weight: bold;
  }

  .pay_main_right {
    float: right;
    color: #ff0000;
    width: 40vw;
    text-align: right;
    height: 12vw;
    line-height: 12vw
  }

  .pay {
    width: 100vw;
    position: relative;
    top: 0;
    left: 0;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
  }

  .vux-header {
    background-color: #fff;
  }

  .vux-header >>> .vux-header-title {
    color: #333333;
    font-weight: bold;
    letter-spacing: 1px;
  }

</style>
