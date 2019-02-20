<template>
  <div class="Myorder">
    <x-header title="全部订单" :left-options="{backText: ''}" class="header"></x-header>
    <div class="Myorder_title">
      <ul>
        <li v-for="(index,val) in titleList" :class="{titleListactive:val==titleListIndex}" :key="val"
            @click="exhcangeOrderType(val,index.orderStatus)">{{index.name}}
        </li>
      </ul>
    </div>
    <div class="orederC">
      <scroller lock-x ref="scrollerBottom" @on-scroll-bottom="ajaxGet()" height="-104px" :scroll-bottom-offst="200">
        <div>
          <ul class="Ul">
            <li class="Li_list" v-for="(index,item) in orderList" :key="item">
              <router-link :to="{path:'/center/orderdetail',query:{orderNo:index.orderNo}}">
                <div class="Li_header">
                  <p style="font-size: 14px">商家店铺： {{index.shopName}}
                    <span style="color:#fe9005;float:right" v-if="orderStatus=='0'">待付款</span>
                    <span style="color:#fe9005;float:right" v-if="orderStatus=='1'">待发货</span>
                    <span style="color:#fe9005;float:right" v-if="orderStatus=='2'">待确认</span>
                    <span style="color:#fe9005;float:right" v-if="orderStatus=='3'">待评价</span>
                    <span style="color:#fe9005;float:right" v-if="orderStatus=='4'">交易关闭</span>
                    <span style="color:#fe9005;float:right" v-if="orderStatus=='5'">交易取消</span>
                    <span style="color:#fe9005;float:right" v-if="orderStatus=='6'">订单完成</span></p>
                  <p style="line-height: 10vw;;color:#686868">订单编号：{{index.orderNo}}
                    <span style="color:#ff0000;float:right">￥ {{index.totalMoney}}</span>
                  </p>
                </div>
                <div class="Li_header_img" v-for="(ind,vas) in index.myOrderGoods" :key="vas">
                  <div class="Li_header_img_left">
                    <img :src="ind.picUrl" alt="">
                  </div>
                  <div style="text-indent:2vw">
                    <h4 style="font-size:16px;line-height:10vw;overflow: hidden;"> {{ind.goodsName}}</h4>
                    <p style="color:#ff0000;font-size:13px;;line-height:6vw;"> ¥ {{ind.money}}/m²</p>
                    <p style="color:#666666;font-size:14px;line-height:6vw"> {{ind.combinate}}</p>
                  </div>
                </div>
                <div class="Li_header_phone">
                  <div class="borderss">
                    <a :href="`tel:${index.phone}`"><img src="@/assets/img/phone.png" alt="">工厂</a>
                  </div>
                  <div v-if="orderStatus=='0'" class="borderss fr" style="border:1px solid #ff0000;color:#ff0000" @click="pay(index.id)">去付款</div>
                  <div v-if="orderStatus=='1'" class="borderss fr" style="border:1px solid #ff0000;color:#ff0000">待发货</div>
                  <div v-if="orderStatus=='2'" class="borderss fr" style="border:1px solid #ff0000;color:#ff0000">待确认</div>
                  <div v-if="orderStatus=='3'" class="borderss fr" style="border:1px solid #ff0000;color:#ff0000">待评价</div>
                  <div v-if="orderStatus=='4'" class="borderss fr" style="border:1px solid #ff0000;color:#ff0000">交易关闭</div>
                  <div v-if="orderStatus=='5'" class="borderss fr" style="border:1px solid #ff0000;color:#ff0000">交易取消</div>
                  <div v-if="orderStatus=='6'" class="borderss fr" style="border:1px solid #ff0000;color:#ff0000">订单完成</div>
                </div>
              </router-link>
            </li>
          </ul>
          <divider>我是有底线的</divider>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import {XHeader, Scroller, LoadMore, Divider} from 'vux';
  import qs from 'qs';

  export default {
    name: 'Myorder',
    data () {
      return {
        titleList: [{name: '待付款', orderStatus: 0}, {name: '待发货', orderStatus: 1}, {
          name: '待收货',
          orderStatus: 2
        }, {name: '已完成', orderStatus: 6}, {name: '已关闭', orderStatus: 4}],
        titleListIndex: 0,
        pages: 1,
        ended: false,
        defualtPage: 1,
        clonePage: 1,
        onFetching: false,
        orderStatus: '0',
        orderList: [],
        pic: require('@/assets/img/Direction.png')
      };
    },
    methods: {
      exhcangeOrderType (index, type) {
        this.titleListIndex = index;
        this.clonePage = 1,
          this.orderStatus = type;
        this.getOrder(this.clonePage, type);
      },
      getOrder (e, type) {
        let _data = {page: e, orderStatus: type};
        this.$http.post('/order/myOrder', qs.stringify(_data)).then(res => {
          let resp = JSON.parse(res.request.response);
          if (resp.code == 200) {
            let passData = [];
            passData.push(resp.data);
            this.pages = Math.floor(resp.data.total / 5);
            this.orderList = passData[0];
            if (this.orderList.length == '0') {
              this.ended = false;
            } else {
              this.ended = true;
            }
          }
        });
      },
      // 敢不敢去付款
      pay (id) {
        let orderIds = [id];
        this.$http.post('/order/reqsn', orderIds, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then(res => {
          let resp = JSON.parse(res.request.response);
          if (resp.code == 200) {
            this.$router.push({path: '/sd/', query: {data: resp.data}});
          } else {
            alert(resp.message);
          }
        });
      },
      ajaxGet () {
        if (this.clonePage <= this.pages) {
          if (this.onFetching) {
            // 锤子的
          } else {
            this.onFetching = true;
            setTimeout(() => {
              let _data = {page: this.clonePage};
              this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({duration: 1, easing: 'ease'});
              });
              this.$http.post('/order/orderList', qs.stringify(_data)).then(res => {
                let resp = JSON.parse(res.request.response);
                if (resp.code == 200) {
                  this.orderList.list = this.orderList.list.concat(resp.data.list);
                  this.clonePage = this.clonePage + 1;
                }
              });
              this.onFetching = false;
            }, 800);
          }
        } else {
          this.ended = true;
        }
      }

    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.scrollerBottom.reset();
      });
      if (this.$route.query.orderStatus != undefined) {
        this.orderStatus = this.$route.query.orderStatus;
        this.titleListIndex = this.$route.query.index;
      };
      this.getOrder(this.clonePage, this.orderStatus);
    },
    components: {
      XHeader,
      Scroller,
      LoadMore,
      Divider
    }
  };

</script>

<style scoped>
  .Myorder {
    width: 100vw;
  }

  .Myorder_title {

    height: auto;
    overflow: hidden;
    width: 96vw;
    margin: 0 auto;
    margin-top: 47px;
  }

  .Li_header_phone {
    width: 100%;
    height: 6vw;
    line-height: 6vw;
    padding: 2vw 0
  }

  .Myorder_title ul li {
    height: 8vw;
    line-height: 7vw;
    padding: 1vw 0;
    float: left;
    width: 20%;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #f7f7f7
  }

  .titleListactive {
    border-bottom: 1px solid #ff0000 !important;
    color: #ff0000
  }

  .header {
    position: absolute;
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

  .orederC {
    width: 96vw;
    margin: 0 auto;
    font-size: 14px;
  }

  .Li_list {
    position: relative;
    top: 0;
    left: 0;
    margin: 5px 0;
    margin-bottom: 4vw;
    padding: 10px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px
  }

  .Li_header {
    overflow: hidden;
    line-height: 6vw
  }

  .Li_header_img {
    width: 100%;
    padding: 3vw 0;
    border-top: 1px solid #f1f1f1;
    overflow: hidden;
  }

  .Li_header_img_left {
    width: 25vw;
    height: 25vw;
    float: left;
  }

  .Li_header_img_left img {
    width: 25vw;
    height: 25vw;
  }

  .borderss {
    border: 1px solid #666666;
    margin-left: 1vw;
    text-align: center;
    padding: 1vw 3vw;
    border-radius: 3px;
    float: left
  }

  .fr {
    float: right;
  }

  .Li_header_L {
    float: left;
    width: 73%;
    line-height: 1.5em;
  }

  .Li_header_L p {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .Li_header_R {
    float: left;
    width: 27%;
    text-align: center;
    font-size: 18px;
  }

  .Li_header_R p {
    color: #fc592d;
    letter-spacing: 2px;
  }

  .Li_content {
    overflow: hidden;
    padding: 10px 0 3px;
  }

  .Li_content_header {
    height: 3.5vh;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
  }

  .Li_content_header img {
    height: 100%;
    width: auto;
  }

  .Li_content_header em {
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
  }


  .Li_content_ul {
    font-size: 14px;
  }

  .Li_content_ul li {
    margin: 5px 0;
  }

  .Li_content_ul_li_header {
    font-size: 16px;
    color: #999999;
  }

  .Li_content_ul li em {
    display: inline-block;
    text-align: center;
    width: 17%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 1px 0;
  }

  .Li_content_ul li em:first-child {
    width: 42%;
  }

  .Li_content_ul li em:last-child {
    width: 19%;
  }

</style>
