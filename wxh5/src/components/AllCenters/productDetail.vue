<template>
  <div>
    <x-header title="商品详情" :left-options="{backText: ''}" class="header"></x-header>
    <div style="margin-top:47px">
      <swiper :list="imgList" loop auto :show-desc-mask="false" :aspect-ratio="300/700" :height="swiperheight"
              :interval="2000" :duration="800"
              class="Swiper01"></swiper>
    </div>
    <div class="infodiv">
      <div class="q_product_price" style="    padding-top: 2vw;">
             <span style="color:#ff0000;line-height:12vw;font-size:18px;">
                  ¥<span style="font-size:30px;font-weight:bold"> {{produstInfo.goodsPrice}}</span>
             </span>
        <span style="float:right;color:#acacac;font-size:13px;line-height:12vw;">{{produstInfo.orderNumber}} 人已付款</span>
      </div>
      <div class="q_product_price q_product_price2">
        {{sellGoodsTypeName}}
      </div>
      <div class="two_title">
        <div class="two_title_left">免费送货</div>
        <div class="two_title_right">卖家承诺发货时间 : <span style="color:#ff0000"> 1~{{parseInt(produstInfo.dailyCapacity)}}m²,{{parseInt(produstInfo.cycle)+1}}天内发货</span>
        </div>
      </div>
      <div class="two_title" style=";margin-top: 1vw">
        <div class="two_title_left two_title_left2">超时赔付</div>
        <div class="two_title_right">订单每超过 {{parseInt(produstInfo.dailyCapacity)}}m² ,发货时间顺延一天</div>
      </div>
    </div>
    <div class="cellBG" @click="lookPromise">
      <group>
        <cell-box :is-link="true">
          <span><img src="@/assets/img/peifu.png" class="ceellimg"></span> 幕饰网为您保障 : 超时未发货直接赔付
        </cell-box>
      </group>
    </div>
    <div class="cellBG cellBG2" @click="lookFee">
      <group>
        <cell-box :is-link="true">
          <span><img src="@/assets/img/peisong.png" class="ceellimg"></span>
          <span class="celltext">{{produstInfo.getType}} ( {{parseInt(produstInfo.area)}}km免费配送,基础运费为 :{{parseInt(produstInfo.baseCost)}}元,若超出免费配送距离每公里:{{parseInt(produstInfo.logistFee)}}元,若超过 {{parseInt(produstInfo.offsetradius)}} 的平方米的下单量,免基础运费.)</span>
        </cell-box>
      </group>
    </div>
    <div class="cellBG cellBG3" @click="buyProduct">
      <group>
        <cell-box>
          <span style="color:#acacac"> 规格:</span> &nbsp; 选择规格、尺寸、厚度
        </cell-box>
      </group>
    </div>
    <div class="q_shop_logo">
      <div class="q_shop_logo_main">
        <div class="q_shop_logo_main_left">
          <img :src="produstInfo.shopLogo" class="q_shop_logo_main_left_img">
          <h4 style="  font-size: 20px; line-height: 9vw;font-weight:bold">{{produstInfo.shopName}}</h4>
          <p style="font-size:15px;color:#696969">
            {{produstInfo.city}}{{produstInfo.county}}·距当前位置{{produstInfo.shopDistance}}km</p>

        </div>
        <div class="q_shop_logo_main_right">
          <h4 style="  font-size: 20px; line-height: 9vw;font-weight:bold">{{produstInfo.shopSellGoodsAmount}}</h4>
          <p style="font-size:16px;color:#a1a1a1">商品在售</p>
        </div>
      </div>
    </div>
    <div class="q_shop_detail_name">
      <img src="@/assets/img/spxq.png">
    </div>
    <div class="q_shop_pcimg" v-html="produstInfo.goodsInfoPC">
    </div>
    <popup v-model="popupshow">
      <div class="popup0" style="padding-bottom:0">
        <div class="popup0_box">
          <div class="popup0_box-top">配送信息查看</div>
          <div class="popup0_box_info">
            <!-- @click="exchangedistributionModel(1)"  style="  border-bottom: 1px solid #acacac; padding-bottom: 3vw;" -->
            <!-- <div class="popup0_box_info_right">
                 <icon type="success-no-circle"  v-show="product.distributionModel==1"></icon>
            </div> -->
            <h4>物流配送 ( 最低 <span style="color:#ff0000;font-weight:bold">¥ {{produstInfo.baseCost}}</span> )</h4>
            <p>一 基础运费为 :{{parseInt(produstInfo.baseCost)}}元,满{{parseInt(produstInfo.offsetradius)}}的平方米免基础运费.</p>
            <p>二 {{parseInt(produstInfo.area)}}km以内只收基础运费,若超过,每km收取 {{parseInt(produstInfo.logistFee)}}元 </p>
          </div>
          <div class="popup0_box_info" style="padding-bottom: 5vw;">
            <!-- @click="exchangedistributionModel(0)" -->
            <!-- <div class="popup0_box_info_right">
              <icon type="success-no-circle"  v-show="product.distributionModel==0"></icon>
         </div> -->
            <h4>到厂自提 ( <span style="color:#ff0000;font-weight:bold">¥ 0</span>)</h4>
            <p>一 联系人 : {{produstInfo.shopName}} <span style="color:#47c765">{{produstInfo.phone}}</span></p>
            <p>二 地址 : {{produstInfo.address}} </p>
          </div>

        </div>
        <div class="popup0_box_last">
          <x-button :gradients="['#1D62F0', '#19D5FD']" style="margin-top:0vw;width:90%" @click.native="popupshowHide">
            确定
          </x-button>
        </div>
      </div>
    </popup>
    <popup v-model="popupBuyShow" :hide-on-blur="false" :is-transparent="true">
      <div class="popup0 popupbuy" >
        <div class="nulldiv" > 
          <div class="popup1_box_header_img">
            <img :src="buyImg">
            <div class="popup1_box_header_img_mid">
              <h4 style="  font-size: 20px; line-height: 12vw;font-weight:400;color:#ff0000"> ¥
                {{sellPriceAlong}}</h4>
              <p style="font-size:12px;color:#696969">
                购买{{parseInt(produstInfo.dailyCapacity)}}㎡以内{{parseInt(produstInfo.cycle)+1}}天内发货</p>
            </div>
          </div>
          <div class="popup1_box_header_img_x" @click="popupBuyShowHideReal">
            <icon type="cancel" style="color:#333"></icon>
          </div>
        </div>
        <div class="popup1_box">
          <div class="popup1_box_list" v-for="(index,val) in explainInfo" :key="val">
            <p style="line-height:8vw">{{index.attName}} :</p>
            <ul>
              <li v-for="(item,kys) in index.list" :key="kys" :class="{itemActive:emptyarr.includes(`${val}${kys}`)}"
                  @click="chooseInfo(val,`${val}${kys}`,item)">
                {{item}}
              </li>
            </ul>
          </div>

        </div>
        <div class="popup0_box_last" style="    padding-top: 1.5vw;">
          <x-button :gradients="['#1D62F0', '#19D5FD']" style="margin-top:1vw;width:90%"
                    @click.native="popupBuyShowHide">去设计具体规格
          </x-button>
        </div>
      </div>
    </popup>
    <popup v-model="popupshow2">
      <div class="popup0 popup1">
        <div class="popup0_box">
          <div class="popup0_box-top popup0_box-top2">三大保障政策</div>
          <div class="popup0_box_info">
            <img src="@/assets/img/bz1.png" class="bzimg bzimg1">
          </div>
          <div class="popup0_box_info">
            <img src="@/assets/img/bz2.png" class="bzimg bzimg1">
          </div>
          <div class="popup0_box_info" style="margin-top:0">
            <img src="@/assets/img/bz3.png" class="bzimg bzimg1">
          </div>
        </div>
        <div class="popup0_box_last" style="margin-top:0">
          <x-button :gradients="['#FF5E3A', '#FF9500']" style="width:90%;margin-top:-0.3vw"
                    @click.native="popupshow2Hide">确定
          </x-button>
        </div>
      </div>
    </popup>
    <div v-transfer-dom>
      <loading :show="loads" text="加载中....."></loading>
    </div>
    <toast v-model="showToast " type="cancel" :time="1000">此商品信息并未录入</toast>
  </div>
</template>
<script>
  import {
    Swiper,
    Cell,
    CellBox,
    Group,
    SwiperItem,
    Popup,
    XButton,
    Icon,
    Loading,
    TransferDomDirective as TransferDom,
    XHeader,
    Toast
  } from 'vux';
  import qs from 'qs';
  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        goodFirstName: '',
        goodLastName: '',
        swiperheight: '70vw',
        sellGoodsTypeName: '',
        sellPriceAlong: '',
        spuId: '',
        shopId: '',
        options2: ['1', '2'],
        imgList: [],
        produstInfo: [],
        explainInfo: [],
        popupBuyShow: false,
        popupshow: false,
        popupshow2: false,
        buyImg: '', // 购买的头部图片
        product: {
          distributionModel: 0
        },
        emptyarr: [],
        skuStr: '', // 属性组合,
        loads: false,
        showToast: false,
        skuid: '',
        goodsTypeId: ''
      };
    },
    components: {
      Swiper,
      Cell,
      CellBox,
      Group,
      Loading,
      SwiperItem,
      Popup,
      Toast,
      XButton,
      XHeader,
      Icon
    },
    methods: {
      // 运费模板详情
      lookFee () {
        this.popupshow = true;
      },
      // 隐藏运费框
      popupshowHide () {
        this.popupshow = false;
      },
      // 保障模板
      lookPromise () {
        this.popupshow2 = true;
      },
      // 隐藏保障模板
      popupshow2Hide () {
        this.popupshow2 = false;
      },
      // 选择配送方式
      exchangedistributionModel (type) {
        this.product.distributionModel = type;
      },
      // 立即购买 隐藏
      popupBuyShowHideReal () {
        this.$store.commit('setPrudoctPopupShow', false);
      },
      // 立即购买
      popupBuyShowHide () {
        if (this.sellPriceAlong == '暂无录入此商品') {
          this.showToast = true;
        } else {
          this.$store.commit('setPrudoctPopupShow', false);
          this.$router.push({
            path: '/productdetailorder',
            query: {
              combination: this.skuStr,
              area: this.produstInfo.area,
              logistFee: this.produstInfo.logistFee,
              contentname: this.produstInfo.shopName,
              contentphone: this.produstInfo.phone,
              contentaddress: this.produstInfo.address,
              offsetradius: this.produstInfo.offsetradius,
              price: this.sellPriceAlong,
              goodsTypeId: this.goodsTypeId,
              skuid: this.skuid,
              goodLastName: this.goodLastName,
              goodFirstName: this.goodFirstName,
              spuId: this.spuId,
              shopId: this.shopId
            }
          });
        }
        //
      },
      // 选择尺寸
      buyProduct () {
        this.$store.commit('setPrudoctPopupShow', true);
      },
      getInfo () {
        let _data = {
          spuId: this.spuId,
          shopId: this.shopId
        };
        this.$http.post('/goodsdetails/info', qs.stringify(_data)).then(({data}) => {
          this.imgList = data.data[0].map((v, k) => {
            return {
              img: v
            };
          });
          this.produstInfo = data.data[1];
          this.explainInfo = data.data[2];

          this.sellGoodsTypeName = (data.data[1]).goodsName;
          this.goodLastName = this.explainInfo[0].goodsTypeName;
          this.goodFirstName = this.produstInfo.goodsName;
          this.goodsTypeId = this.produstInfo.goodsTypeId;
          let includesarr = [];  // 高亮处理数组
          let passsku = ''; // sku过度
          this.explainInfo.forEach((v, k) => {
            v.list.forEach((a, c) => {
              if (a == this.produstInfo.skuAttList[k].attValContent) {
                includesarr.push(`${k}${c}`);
              }
            });
          });
          this.produstInfo.skuAttList.forEach((v, i) => {
            passsku += `${v.attValContent}+`;
          });
          this.skuStr = passsku.substring(0, passsku.length - 1);
          this.emptyarr = includesarr;
          this.buyImg = this.imgList[0].img;
          // 价格显示
          this.sellPriceAlong = this.produstInfo.goodsPrice;
        });
      },
      // 修改尺寸
      chooseInfo (item, val, sku) {
        //  妈的 取这个sku的下标 不要太爽!!
        this.emptyarr.splice(item, 1, val);  // 下标替换!
        let passarr = this.skuStr.split('+'); // sku过度 [] 和上面保持一致  此处爸爸需要转成数组
        let passsku = '';// sku过度
        passarr.splice(item, 1, sku);
        passsku = passarr.join(',');
        this.skuStr = passsku.replace(/,/g, '+');
        let _data = {
          skuStr: this.skuStr,
          spuId: this.spuId
        };
        this.loads = true;
        this.$http.post('/goodsdetails/checkSku', qs.stringify(_data)).then((data) => {
          let res = data.data;
          this.loads = false;
          if (res.code == 204) {
            this.sellPriceAlong = '暂无录入此商品';
          } else if (res.code == 200) {
            // 此处应有数据 交互
            this.sellPriceAlong = parseInt(res.data.salePrice);

            this.skuid = res.data.skuId;
          }
        });
      },
      getSkuid () {
        let _data = {
          skuStr: this.skuStr,
          spuId: this.spuId
        };
        this.$http.post('/goodsdetails/checkSku', qs.stringify(_data)).then(({data}) => {
          this.skuid = data.data.skuId;
        });
      }

    },
    watch: {
      '$store.state.pruductBuyPopup': function () {
        this.popupBuyShow = this.$store.state.pruductBuyPopup;
      }
    },
    mounted () {
      this.shopId = this.$route.query.shopId;
      this.spuId = this.$route.query.spuId;
      this.getInfo();
      setTimeout(() => {
        this.getSkuid();
      }, 1000);
    },
    created () {
      this.$store.commit('setTabbar', false);
      this.$store.commit('setProdutTabbar', true);
    },
    destroyed () {
      this.$store.commit('setPrudoctPopupShow', false);
    }
  };
</script>
<style scoped>
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

  .itemActive {
    border: 1px solid #00b2ff !important;
    background: #00b2ff;
    color: #fff
  }

  .q_d_img {
    width: 100%;
    height: 70vw;
  }

  .infodiv {
    height: auto;
    width: 100%;
    background: #fff;
    padding-bottom: 2vw
  }

  .q_product_price {
    width: 94vw;
    margin: 0 auto;
    height: 12vw;
    line-height: 12vw;
    color: #666
  }

  .q_product_price2 {
    font-size: 22px;
    margin-top: 0vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 12vw;
    line-height: 10vw;
  }

  .two_title {
    width: 94vw;
    margin: 0 auto;
    height: 7vw;
    line-height: 7vw
  }

  .two_title_left {
    width: 20vw;
    height: 7vw;
    float: left;
    text-align: center;
    color: #fff;
    background: #e71818;
    font-size: 14px;
  }

  .two_title_left2 {
    background: #ff6407
  }

  .two_title_right {
    width: 72vw;
    height: 7vw;
    float: left;
    margin-left: 1vw;
    font-size: 12px;
    color: #999
  }

  .cellBG >>> .weui-cell_access.vux-cell-box {
    background: #bbeaff;
    color: #199ed8;
    font-size: 15px
  }

  .cellBG >>> .weui-cells {
    margin: 0 auto
  }

  .cellBG2 >>> .weui-cell_access.vux-cell-box {
    background: #eeeeee;
    color: #696969;
    font-size: 15px;
  }

  .cellBG3 >>> .weui-cell {;
    font-size: 15px;;
    color: #696969;
    padding: 4vw 4vw
  }

  .ceellimg {
    width: 6vw;
    height: 6vw;
    margin-right: 2vw;
    float: left
  }

  .celltext {
    width: 80vw;
    height: 6vw;
    line-height: 6vw;
    float: left;;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .q_shop_logo {
    height: 18vw;
    width: 100%;
    background: #fff;
    margin-top: 2vw;
    overflow: hidden;
  }

  .q_shop_logo_main {
    width: 96%;
    height: 16vw;
    margin: 1vw auto
  }

  .q_shop_logo_main_left {
    width: 80%;
    height: 16vw;
    border-right: 1px solid #818181;
    float: left;
  }

  .q_shop_logo_main_right {
    width: 19%;
    height: 16vw;
    float: right;
    text-align: center
  }

  .q_shop_logo_main_left_img {
    width: 16vw;
    height: 16vw;
    float: left;
    margin-right: 3vw;
  }

  .q_shop_pcimg {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .q_shop_detail_name {
    width: 100%;
    height: 10vw;
    background: #f7f7f7;
    text-align: center;
    line-height: 10vw
  }

  .q_shop_detail_name img {
    height: 6vw;
  }

  .popup0 {
    padding-bottom: 20px;
    height:auto;
    background: #fff
  }

  .popupbuy {;
    height: 110vw;
    position: relative;
    background: none;
    overflow: hidden;
  }

  .popup0_box {
    width: 80vw;
    margin: 0 auto;;
    line-height: 10vw;
    text-align: center;
    padding-top: 3vw;
    overflow: hidden;
  }

  .popup0_box-top {
    border-bottom: 1px solid #199ed8;
  }

  .popup0_box-top2 {
    border-bottom: 1px solid #fc9d2d;
  }

  .popup0_box_info {
    width: 80vw;
    margin-top: 3vw;
    text-align: left;
    overflow: hidden;;
    position: relative;
  }

  .popup0_box_info_right {
    position: absolute;
    right: 0vw;
    top: 5vw;
    width: 8vw;
    height: 9vw;
  }

  .popup0_box_info p {
    line-height: 6vw;
    font-size: 13px;
    color: #acacac
  }

  .popup0_box_last {
    width: 100%;
    height: 15vw;
    background: #fff;
    padding-top: 2.5vw;
    border-top: 1px solid #ccc;
  }

  .popup1 {
    height: 85vw;;
  }

  .bzimg {
    width: 100%;
    height: 15vw;
  }

  .bzimg1 {
    height: 18vw;
  }

  .popup1_box {
    max-height: 67vw;
    min-height: 67vw;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    background: #fff
  }

  /* .popup1_box_header{  height: 15vw;width: 96%;background: red;margin: 0 auto} */
  .popup1_box_header_img {
    width: 90vw;
    height: 25vw;
    margin: 0vw auto;
    position: absolute;
    top: -10vw;
    left: 2vw;
  }

  .popup1_box_header_img img {
    width: 25vw;
    height: 25vw;
    float: left;
    top: 25vw;
  }

  .nulldiv {
    width: 100vw;
    height: 16vw;
    margin: 0vw auto;
    background: #fff;
    margin-top: 17vw;
    position: relative;
  }

  .popup1_box_header_img_mid {
    width: 60vw;
    height: 15vw;
    float: left;
    margin-left: 3vw;
    margin-top: 9vw
  }

  .popup1_box_header_img_x {
    font-size: 25px;
    width: 8vw;
    height: 8vw;
    float: right;
  }

  .popup1_box_list {
    width: 96%;
    height: auto;
    margin: 1vw auto;;
    overflow: hidden;
  }

  .popup1_box_list ul li {
    padding: 2vw 3vw;
    border: 1px solid #acacac;
    float: left;
    margin-right: 2vw;
    margin-bottom: 2vw;
    font-size: 13px;
    border-radius: 10px
  }
</style>

