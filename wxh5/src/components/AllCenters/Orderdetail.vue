<template>
  <div class="Orderdetail">
    <x-header title="订单详情" :left-options="{backText: ''}" class="header"></x-header>
    <div class="Actionsheets">
        <ul>
            <li v-for="(item,index) in process" :key="index">
                <div class="Actionsheets_left">
                   <p style="color:#666666;font-size:15px">  {{item.oprateTime.split(' ')[0]}}
                   </p>
                   <p style="color:#686868;font-size:13px;line-height:8vw"> {{item.oprateTime.split(' ')[1]}}</p>
                    <div class="Actionsheets_left_cycle"></div>
                </div>
                <div class="Actionsheets_right">{{item.nodeDetail}}</div>
            </li>
        </ul>
    </div>
    <div class="q_localtion">
      <div class="q_localtion_left">
          <img src="@/assets/img/site.png" alt="">
      </div>
       <div >
         <h4 style="font-size:15px;line-height:8vw;overflow: hidden;" v-if="deliveryModeType==0" >
             <span style="color:#666666">自取地址: {{factoryInfoVoslocaltion.name}} {{factoryInfoVoslocaltion.phone}}</span>
             <p style=";font-size:14px;">{{factoryInfoVoslocaltion.address}}</p>
         </h4>
          <h4 style="font-size:15px;line-height:8vw;overflow: hidden;" v-else>
             <span style="color:#666666">物流地址: {{memInfoVoslocaltion.name}} {{memInfoVoslocaltion.phone}}</span>
             <p style=";font-size:14px;">{{memInfoVoslocaltion.address}}</p>
         </h4>
      </div>
    </div>
    <div class="lines">
        <img src="@/assets/img/borderIcon.png" >
    </div>
    <div class="order_type">
        <div class="order_type_header">
            <ul>
                <li>{{shopName}} ><span style="float:right" v-if="deliveryModeType==0">买家自取</span> <span style="float:right" v-else> 物流配送</span></li>
                <li style="font-size:13px"> 订单编号 : {{orderNumber}}
                     <span style="color:#ff0000;font-size:17px;float:right">合计 : ¥ {{totalMoney}}</span>
                </li>
                <li style="font-size:14px">
                    <div class="borderss">
                      <img src="@/assets/img/phone.png" alt=""><a :href="`tel:${factoryInfoVoslocaltion.phone}`">工厂</a>
                    </div>
                     <!-- <div class="borderss fr">
                       评论
                    </div>
                     <div class="borderss fr">
                      售后
                    </div> -->
                </li>
            </ul>
        </div>
    </div>
    <div class="order_img" v-for="(item,index) in productList" :key="index">
        <div class="order_img_h">
            <div class="order_img_h_l">
                <img :src="item.picUrl">
            </div>
             <div style="text-indent:2vw">
                 <h4 style="font-size:16px;line-height:10vw;overflow: hidden;" > {{item.goodsName}}</h4>
                 <p style="color:#ff0000;font-size:13px;;line-height:9vw;">  ¥ {{item.price}}</p>
                 <p  style="color:#666666;font-size:14px;line-height:6vw"> {{item.combinate}}</p>
             </div>
        </div>
        <div class="order_img_b">
            <ul style="    border-top: 1px solid #f1f1f1;  padding: 1vw 0;">
                <li>商品总价 <span style="float:right">{{item.chang}}mm * {{item.kuan}}mm = {{(item.chang*item.kuan/1000000).toFixed(2)}}m²</span></li>
                <li>工艺 ( 打孔{{item.hole}}元一个 挖角{{item.top}}元一个 ) <span style="float:right;color:#ff6407"> {{item.hole*item.holeNum+item.top*item.topNum}}</span></li>
                <li>图纸  <span style="float:right;color:#31a8d8" @click="lookImg(item.imgurl)">点击查看</span></li>
                <li>片数  <span style="float:right">{{item.amount}}</span></li>
                <li>总价  <span style="float:right;color:#ff0000">  ¥ {{item.money}}</span></li>
            </ul>
        </div>
    </div>

     <div class="order_las">
         <ul>
               <li>配送方式 <span class="fr" v-if="deliveryModeType==0">买家自取 <span style="color:#ff0000"> ¥ 0.00</span></span>
                       <span class="fr" v-else>物流配送 <span style="color:#ff0000"> ¥ {{deliveryModeMoney}}</span></span>
               </li>
               <li>
                   <span v-if="deliveryModeType==0">预计自提时间</span>
                   <span v-else>预计发货时间 </span>
                   <span class="fr"> {{postdate}}</span>
               </li>
               <li> <span style="float:right;font-size:16px;color:#ff0000">合计 : ¥ {{totalMoney}}</span></li>
         </ul>
     </div>

      <x-dialog v-model="showScrollBox" class="dialog-demo">
       <img :src="imgs"  class="showimgs">
        <div @click="showScrollBox=false">
          <span class="vux-close">x</span>
        </div>
      </x-dialog>

  </div>
</template>

<script>
  import {XHeader, XButton, XDialog} from 'vux';
  export default {
    name: 'Orderdetail',
    data () {
      return {
        pic: require('@/assets/img/Direction.png'),
        orderNumber: '',
        infoOrder: [],
        showScrollBox: false,
        deliveryModeType: '',
        deliveryModeMoney: '',
        shopName: '',
        infoUser: [],
        getData: '',
        postData: '',
        process: [],
        totalMoney: '',
        memInfoVoslocaltion: [],
        factoryInfoVoslocaltion: [],
        productList: [],
        imgs: '',
        postdate: ''
      };
    },
    components: {
      XHeader,
      XDialog,
      XButton
    },
    methods: {
      pay () {
        let orderIds = [this.infoUser.id];
        this.$http.post('/order/reqsn', orderIds, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then(res => {
          let resp = JSON.parse(res.request.response);
          if (resp.code == 200) {
            this.$router.push({path: '/sd/', query: {data: resp.data}});
          } else {
            alert(resp.message);
          }
        });
      },
      lookImg (e) {
        this.imgs = e;
        if (e == null || e == '') {
          alert('您并未添加图纸');
        } else {
          this.showScrollBox = true;
        }
      },
      getInfo () {
        this.$http.get('order/orderDetailV2?orderNo=' + this.orderNumber).then(res => {
          let resp = res.data.data;
          this.process = resp.recordVos;
          this.memInfoVoslocaltion = resp.memInfoVos;
          this.factoryInfoVoslocaltion = resp.factoryInfoVos;
          this.deliveryModeType = resp.deliveryMode;
          this.totalMoney = resp.totalMoney;
          this.deliveryModeMoney = resp.deliveryMoney;
          this.postdate = resp.postdata;
          this.shopName = resp.shopName;
          let arr = [];
          for (var key in resp.goodsListVos) {
            arr.push(resp.goodsListVos[key][0]);
          }
          this.productList = arr;
        });
      }
    },
    mounted () {
      this.orderNumber = this.$route.query.orderNo;
      this.getInfo();
    }
  };
</script>

<style scoped>
  .Orderdetail {
    width: 100vw;
    position: relative;
    top: 0;
    left: 0;
  }
.Actionsheets{ width: 90vw; height: auto ; margin: 0 auto;margin-top: 50px;padding: 5vw}
.Actionsheets ul li{ width: 90vw;height: 15vw;;margin-bottom: 1.8vw}
.Actionsheets_left{ width: 35vw;height: 15vw;float: left; border-right: 1px dashed #ff6407;position: relative;text-align: center}
.Actionsheets_left_cycle{position: absolute;width: 4vw;height: 4vw;border-radius: 50%;background:#ff6407;right:-2vw;;top:5vw; ;}
.Actionsheets_right{ text-indent: 5vw;font-size: 15px;color:#333}
.Actionsheets ul li:nth-last-child(1){ border-right:#fff !important; }
.q_localtion{ height: 15vw; width: 100vw;margin: 0 auto;padding: 3vw 0;background: #fff}
.q_localtion_left{ width: 20vw;line-height:15vw;float: left;vertical-align: middle;    text-align: center;}
.lines{width: 100%;height:6vw;margin-top: 2vw}
.lines img{ width: 100%;height: 6vw;}
.order_type{ width: 94vw;padding: 0 3vw;background: white;height: auto;overflow: hidden;;}
.order_type_header{ height: 24vw;width: 94vw;;padding: 2vw 0}
.order_type_header ul li{ width: 94vw;height: 6vw; line-height: 6vw;margin-bottom: 1.5vw;font-size: 15px;}
.borderss{ border:1px solid #666666;width: 13vw;margin-left: 1vw;text-align: center;padding: 1vw 3vw;border-radius: 3px;float: left}
.order_img{ width: 100vw;margin: 0 auto; background: #fff;border-top:1px solid #f1f1f1;}
.order_img_h{ height: 31vw;width: 100%;padding: 2vw 0}
.order_img_h_l{ height: 31vw;width: 31vw; float: left;margin-left: 2vw}
.order_img_h_l img{ height: 31vw;width: 31vw;}
.order_img_b{ width: 100vw;height: auto;}
.order_img_b ul li{ width: 94vw;margin: 0 auto; height: 7vw; line-height: 7vw;color:#616161;font-size: 14px}
.order_las{ width: 96vw;padding: 2vw 2vw;background: white;border-top: 1px solid #f1f1f1;padding-bottom: 5vw}
.order_las ul li{ width: 94vw;height: 7vw;line-height: 7vw;;color:#616161;font-size: 15px}
.fr{float: right;}
.showimgs{ width: 70vw;height: 80vw;    padding-top: 5vw;}
  .vux-close {
  width: 10vw;height: 10vw;margin: 1vw auto;line-height: 10vw;font-size: 20px
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

  .payo {
    width: 50vw;
    margin: 25px auto 0;
  }

  .vux-header >>> .vux-header-title {
    color: #333333;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .Content {

    width: 100vw;
  }

  .Content_header {
    background-color: #fff;
    overflow: hidden;
    margin: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
  }

  .Content_header_L {
    float: left;
    width: 73%;
    line-height: 1.5em;
    font-size: 16px;
  }

  .Content_header_R {
    float: left;
    width: 27%;
    text-align: center;
    font-size: 18px;
  }

  .Content_header_R p {
    color: #fc592d;
    letter-spacing: 2px;
  }

  .Content_list, .Content_list_footer, .Content_footer {
    background-color: #fff;
    overflow: hidden;
    margin: 5px 0;
    padding: 10px;
  }

  .Content_list_header {
    height: 3.5vh;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
  }

  .Content_list_header img {
    height: 100%;
    width: auto;
  }

  .Content_list_header em {
    display: inline-block;
    margin-left: 10px;
    font-weight: bold;
  }

  .Content_list_ul {
    font-size: 14px;
    padding: 5px 0;
  }

  .Content_list_ul li {
    margin: 5px 0;
  }

  .Content_list_ul_li_header {
    font-size: 16px;
    color: #999999;
  }

  .Content_list_ul li em {
    display: inline-block;
    text-align: center;
    width: 17%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 1px 0;
  }

  .Content_list_ul li em:first-child {
    width: 42%;
  }

  .Content_list_ul li em:last-child {
    width: 19%;
  }

  .Content_list_footer_L {
    float: left;
    width: 65%;
    text-align: left;
  }

  .Content_list_footer_R {
    float: left;
    width: 35%;
    text-align: right;
  }

  .myBottom {
    margin-bottom: 5px;
  }

  .Content_footer p {
    padding: 1px;
  }

  .Content_footer_div {
    overflow: hidden;
    margin: 5px 0;
  }

  .Content_footer_L {
    float: left;
    width: 24%;
  }

  .Content_footer_R {
    float: left;
    width: 68%;
  }
</style>
