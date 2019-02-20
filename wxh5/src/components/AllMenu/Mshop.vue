<template>
  <div class="shop">
    <x-header title="快速比价" :left-options="{backText: '首页',preventGoBack:true}" @on-click-back="goIndex"
              class="header vux-1px-b">
      <div slot="right" class="carIcon" @click="carTurn">
        <img src="@/assets/img/car01.png" alt="">
        <badge class="badgeShow" :text="carCount"></badge>
      </div>
    </x-header>
    <div class="shop_M" v-if="shopList.length>0">
      <div class="shop_tips">
        当前有<em style="color: red">{{shopList.length}}家工厂</em>参与比价
      </div>
      <!--header-->
      <div class="my_site" :style="{backgroundImage:'url('+require('@/assets/img/borderIcon.png')+')'}">
        <div class="my_site_L">
          <div class="my_site_L_wrap">
            <img src="@/assets/img/siteIcon.png" alt="">
          </div>
        </div>
        <div class="my_site_C" v-if="myAddress != null">
          <div style="margin-bottom: 5px;">
            <em style="color: #666">收货地址：</em>
            {{myAddress.userName}}
            <span style="color: #00b934"> {{myAddress.phone}}</span>
          </div>
          <div>{{myAddress.addressName}}&#12288;{{myAddress.address}}</div>
        </div>
        <div class="my_site_C" v-else style="text-align: center;font-weight: bold">
          <p>根据您当前位置为您推荐</p>
          <p style="margin-top: 5px">您可以点击右侧切换位置</p>
        </div>
        <div class="my_site_R" @click="changeSite">
          <p>更改地址 ></p>
        </div>
      </div>
      <!--body-->
      <!--vfor01-->
      <div class="shop_detail vux-1px-b" v-for="(item,index) in shopList" :key="index">
        <div class="shop_detail_H">
          <div class="car_list_L" @click="computeMoney">
            <check-icon :value.sync="item.checked"></check-icon>
          </div>
          <div class="car_list_R">{{item.shopStoreAddrDto.shopName}}</div>
        </div>
        <!--left-->
        <div class="shop_detail_shop">
          <!--vfor02-->
          <div class="shop_C_wrap" v-for="(items,indexs) in item.goodsSpuList" :key="indexs">
            <div class="shop_C_H">
              <div class="shop_C_H_L">
                <img :src="items.picUrl" alt="">
              </div>
              <div class="shop_C_H_R">
                <div class="shop_C_H_R_H ellipsis">{{items.goodsName}}</div>
                <div class="shop_C_H_R_C"> ￥{{items.goodsPrice}}/㎡</div>
                <div class="shop_C_H_R_F">{{items.skuStr}}</div>
              </div>
            </div>
            <!--vfor03-->
            <div class="shop_C_C" v-for="(itemss,indexss) in items.goodsFSParamList" :key="indexss">
              <div class="shop_C_C_list">
                <p>面积</p>
                <p style="color: #f00">
                  {{itemss.length}}mm*{{itemss.width}}mm={{computedArea(itemss.length,itemss.width)}}㎡</p>
              </div>
              <div class="shop_C_C_list">
                <p>工艺 <em style="color: #fc9d2d">打孔{{items.hole}}元/个,挖角{{items.top}}元/个</em></p>
                <p>￥{{computedSpec(items.top,items.hole,itemss.top,itemss.hole)}}</p>
              </div>
              <div class="shop_C_C_list">
                <p>数量</p>
                <p>{{itemss.amount}}</p>
              </div>
            </div>
            <div class="shop_C_C">
              <div class="shop_C_C_list">
                <p>小计</p>
                <p style="color: #f00;font-size: 16px">
                  ￥{{(parseFloat(items.totalPrice)+parseFloat(items.holeTotalPrice)+parseFloat(items.topTotalPrice)).toFixed(2)}}</p>
              </div>
              <div class="shop_C_C_list" style="height: 22px;line-height: 22px">
                <p>操作</p>
                <p class="GoCar" @click="addCar(items)">加入购物车</p>
              </div>
            </div>
          </div>
          <div class="shop_C_F">
            <div class="shop_C_F_list" @click="changeMode(item.shopStoreAddrDto,index,item.chooseIndex)">
              <p>配送方式</p>
              <p style="color: #f00;" v-if="item.chooseIndex=='0'">到厂自提￥0<em class="downAngle"></em></p>
              <p style="color: #f00;" v-else>工厂配送￥{{item.freight}} <em class="downAngle"></em></p>
            </div>
            <div class="shop_C_F_list">
              <p>预计发货日期</p>
              <p style="color: #f00;">{{item.deliveryDate}}前</p>
            </div>
            <div class="shop_C_F_list shop_C_F_final">
              <p>合计:</p>
              <p style="color: #f00;font-size: 16px" v-if="item.chooseIndex=='0'">
                ￥{{(parseFloat(item.price)-parseFloat(item.freight)).toFixed(2)}}</p>
              <p style="color: #f00;font-size: 16px" v-else>￥{{item.price}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shop_M" v-else>
      <p style="text-align: center;padding-top: 10px;font-size: 18px;">暂无匹配商家</p>
    </div>
    <div class="btn_wrap vux-1px-t" v-if="shopList.length>0">
      <div class="btn_wrap_div">
        <div class="btn_wrap_div_left"> 总计 :
          <span style="color:#ff0000;font-size:22px;font-weight: 400">{{(endMoney - 0 ).toFixed(2)}}元</span>
        </div>
        <div class="btn_wrap_div_right" @click.stop="submit">立即购买</div>
      </div>
    </div>
    <!--地址-->
    <div class="siteWrap">
      <popup v-model="siteShow" position="bottom" max-height="60%">
        <checklist v-if="siteOption.length>0" :max='1' :options="siteOption" v-model="site"></checklist>
        <p v-else style="text-align: center;font-size: 20px;padding:15px">
          <router-link :to="{path:'/center/addsite',query:''}" style="color: red;text-decoration: underline">点击添加收货地址
          </router-link>
        </p>
        <x-button style="background-color: #00b2ff;color: #fff" @click.native="siteConfirm">确认</x-button>
      </popup>
    </div>
    <!--选择配送方式-->
    <popup v-model="deliverModeShow" class="mode_wrap" :popup-style="PopupS" :hide-on-blur=false>
      <div class="mode_H">
        配送方式选择
      </div>
      <div class="mode_C vux-1px-tb">
        <div class="mode_C_list vux-1px-b" @click="chooseMode(1)">
          <div class="mode_C_list_H">
            <div class="mode_C_list_H_L">
              物流配送(最低<em style="color: #f00">￥{{modeInfo.baseCost}}</em>)
              <icon type="success-no-circle" class="mode_C_list_H_R" v-show="chooseIndex=='1'"></icon>
            </div>
          </div>
          <div class="mode_C_list_C">
            <p>1.基础运费{{modeInfo.baseCost}}元，满{{modeInfo.offsetradius}}平米抵消基础运费</p>
            <p>2.{{parseInt(modeInfo.area)}}公里内只收取基础运费，超过{{parseInt(modeInfo.area)}}公里，每公里收取{{modeInfo.logistFee}}元</p>
          </div>
        </div>
        <div class="mode_C_list" @click="chooseMode(0)">
          <div class="mode_C_list_H">
            <div class="mode_C_list_H_L">
              到厂自提(<em style="color: #f00">￥0.00</em>)
              <icon type="success-no-circle" class="mode_C_list_H_R" v-show="chooseIndex=='0'"></icon>
            </div>
          </div>
          <div class="mode_C_list_C">
            <p>联系人：{{shopInfo.legal}} <span style="color: #00b934"> {{shopInfo.phone}}</span></p>
            <p>{{shopInfo.province}}{{shopInfo.city}}{{shopInfo.county}} {{shopInfo.address}}</p>
          </div>
        </div>
      </div>
      <div class="mode_F">
        <x-button style="background-color: #00b2ff;color: #fff" @click.native="modeConfirm">确认</x-button>
      </div>
    </popup>
  </div>
</template>

<script>
  import {XHeader, CheckIcon, Badge, Popup, Checklist, XButton, Icon} from 'vux';
  import qs from 'qs';
  export default {
    name: 'Mshop',
    data () {
      return {
        myAddress: null,
        shopList: [],
        nowIndex: 0,
        endMoney: 0,
        pic: require('@/assets/img/Direction.png'),
        carCount: 0,
        siteShow: false,
        site: [],
        siteOption: [],
        shopInfo: '',
        modeInfo: '',
        modeIndex: 0,
        chooseIndex: 0,
        deliverModeShow: false,
        PopupS: {
          zIndex: 1002
        }
      };
    },
    components: {XHeader, CheckIcon, Badge, Popup, Checklist, XButton, Icon},
    methods: {
      addData (oldData) {
        this.shopList = oldData.shopList;
        this.myAddress = oldData.shippingAddress;
        this.shopList.forEach((v, i, a) => {
          v.chooseIndex = 0;
          return v;
        });
        this.computeMoney();
      }, // yes
      changeSite () {
        this.siteShow = true;
        this.$http.get('/user/address/addressInfo').then(
          ({data}) => {
            let res = data;
            if (res.code == 200) {
              // console.log(res.data)
              if (res.data.length > 0) {
                this.siteOption = res.data.map((value, index, arr) => {
                  let m = {key: '', value: ''};
                  m.key = value.id;
                  m.value = value.userName + '  ' + value.addressName + value.address + '  ' + value.phone;
                  return m;
                });
                let That = this;
                res.data.forEach((v, i, a) => {
                  if (v.isDefault == '1') {
                    That.site[0] = v.id;
                  }
                });
              } else {
                this.siteOption = res.data;
              }
            }
          }
        );
      }, // yes
      siteConfirm () {
        if (this.site.length > 0) {
          this.siteShow = false;
          this.Resubmit();
        } else {
          this.$vux.toast.text('请选择收货地址', 'center');
        }
      }, // yes
      Resubmit () {
        this.$vux.loading.show({text: '数据提交中'});
        let reData = this.$store.state.reUpData;
        reData.addressId = this.site[0];
        this.$http.post('/goods/tjShop', reData, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then(
          ({data}) => {
            if (data.code == 200) {
              this.$store.commit('setReUpData', reData);
              this.$store.commit('setGetShops', data.data);
              this.addData(data.data);// 调用
              this.$vux.toast.text('地址切换成功', 'center');
              this.$vux.loading.hide();
            } else {
              this.$vux.loading.hide();
              this.$vux.toast.text('数据提交失败', 'center');
            }
          }
        );
      }, // yes
      addCar (v) {
        let oldData = v.goodsFSParamList;
        let newData = oldData.map((value, index, array) => {
          value.goodsSKUId = v.skuId;
          value.goodsSPUId = v.spuId;
          value.shopId = v.shopId;
          value.goodsTypeId = v.goodsTypeId;
          value.combinate = v.skuStr;
          value.price = v.goodsPrice;
          value.customNo = value.customno;
          return value;
        });
        this.$http.post('/car/save', newData, {headers: {'Content-Type': 'application/json'}}).then(({data}) => {
          if (data.code == 200) {
            this.$vux.toast.text(`添加成功`, 'center');
            this.getCount();
          } else {
            this.$vux.toast.text(`数据发生错误`, 'center');
          }
        });
      }, // yes
      changeMode (info, index, chooseIndex) {
        this.$http.get('/store/deliveryInfo?shopId=' + info.id).then(({data}) => {
          if (data.code == 200) {
            this.modeInfo = data.data;
            this.shopInfo = info;
            this.modeIndex = index;
            this.chooseIndex = chooseIndex;
            this.deliverModeShow = true;
          } else {
            this.$vux.toast.text('切换失败', 'center');
          }
        });
      }, // yes
      chooseMode (type) {
        this.chooseIndex = type;
      }, // yes
      modeConfirm () {
        this.shopList[this.modeIndex].chooseIndex = this.chooseIndex;
        this.deliverModeShow = false;
        this.computeMoney();
      }, // yes
      computeMoney () {
        let priceArr = ['0'];
        this.shopList.forEach((value, index, array) => {
          if (value.checked) {
            let upData;
            if (value.chooseIndex == '0') { // 默认
              upData = parseFloat(value.price) - parseFloat(value.freight);// 自提
            } else {
              upData = parseFloat(value.price);// 配送
            }// 自提配送
            priceArr.push(upData);// 自提
          }
        });
        this.endMoney = priceArr.reduce((preValue, curValue, index, array) => {
          return (parseFloat(preValue) + parseFloat(curValue)).toFixed(2);
        });
      }, // yes
      mergeData () {
        let That = this;
        let allShop = this.shopList;
        let upData = [];// 接03
        allShop.forEach((value, index, array) => {
          if (value.checked) { // 3
            // console.log(value);
            let obj = {};// 装03
            obj.addressId = That.myAddress.id;
            obj.distributionModel = value.chooseIndex;// 自提配送
            obj.orderCategory = '1';
            obj.assemble = '0';
            obj.memId = That.myAddress.memid;
            obj.orderType = '0';
            obj.shopId = value.shopStoreAddrDto.id;
            obj.shops = [];// 接02
            let goodsList = value.goodsSpuList;
            goodsList.forEach((val, ind, arr) => { // 2
              let objShop = {};// 装02
              objShop.productspuid = val.spuId;
              objShop.productspus = [];// 接01
              let productList = val.goodsFSParamList;
              productList.forEach((v, i, a) => { // 1
                let specialRequire;
                if (v.top == '0' && v.hole == '0') {
                  specialRequire = '1';
                } else {
                  specialRequire = '0';
                }
                let products = {// 装01
                  amount: v.amount,
                  billStatus: '0',
                  chang: v.length,
                  combinate: `${val.goodsName} ${val.skuStr}`, // 向上一层
                  customno: v.customno,
                  distributionModel: value.chooseIndex, // 自提配送
                  hole: v.hole,
                  top: v.top,
                  imgurl: v.imgurl,
                  kuan: v.width,
                  memId: That.myAddress.memid,
                  productskuid: val.skuId, // 向上一层
                  productspuid: val.spuId, // 向上一层
                  shopid: val.shopId, // 向上一层
                  specialRequirements: specialRequire
                };
                objShop.productspus.push(products);// push 01
              });
              obj.shops.push(objShop);// push 02
            });
            upData.push(obj);
          }
        });
        return upData;
      }, // yes
      submit () {
        if (this.myAddress != null) {
          let _data = this.mergeData();
          if (_data.length > 0) {
            this.$http.post('/order/placeOrderByCar', _data, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then(({data}) => {
              // console.log(data);
              if (data.code == 200) {
                let orderIds = data.data.orderIdList;
                this.$http.post('/order/reqsn', orderIds, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then(({data}) => {
                  if (data.code == 200) {
                    this.$router.push({path: '/sd/', query: {data: data.data}});
                  } else {
                    this.$vux.toast.text(data.message, 'center');
                  }
                });
              } else {
                this.$vux.toast.text('网络错误…', 'center');
              }
            });
          } else {
            this.$vux.toast.show({
              text: '请选择商家',
              position: 'center',
              type: 'warn',
              width: '9em',
              time: '3000'
            });
          }
        } else {
          this.$vux.toast.show({
            text: '请选择收货地址',
            position: 'center',
            type: 'warn',
            width: '9em',
            time: '3000'
          });
        }
      }, // yes
      goIndex () {
        this.$router.replace('/index');
        this.$store.commit('setContentBC', '#f7f7f7');
      }, // yes
      getCount () {
        this.$http.get('/car/count').then(({data}) => {
          if (data.code == 200) {
            this.carCount = data.data;
          }
        });
      },
      carTurn () {
        this.$router.push('/car');
      }
    },
    computed: {
      computedArea () {
        return function (len, wid) {
          return ((Number(len) * Number(wid)) / 1000000).toFixed(2);
        };
      }, // yes
      computedSpec () {
        return function (topP, holeP, top, hole) {
          let tops = topP * top;
          let holes = holeP * hole;
          return (parseFloat(tops) + parseFloat(holes)).toFixed(2);
        };
      }// yes
    },
    mounted () {
      this.getCount();
    },
    created () {
      this.$store.commit('setContentBC', '#f7f7f7');
      let allShops = this.$store.state.GetShops;
      if (allShops != null && allShops != undefined && allShops != '') {
        this.addData(allShops);
      } else {
        this.$router.replace({path: '/index'});
      }
    }
  };
</script>

<style scoped>
  .shop {
    width: 100vw;
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

  .vux-header >>> .vux-header-back {
    color: #000;
  }

  .vux-header >>> .vux-header-right {
    top: 0;
  }

  .carIcon {
    position: relative;
    top: 0;
    left: 0;
    height: 46px;
  }

  .carIcon img {
    height: 60%;
    margin-top: 20%;
  }

  .badgeShow {
    position: relative;
    left: -25%;
    top: -13%;
  }

  .shop_M {
    margin-top: 48px;
    width: 100vw;
    font-size: 14px;
  }

  .shop_tips {
    background-color: #f7f7f7;
    padding: 8px 13px;
  }

  .my_site {
    padding: 15px 5px;
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    background-color: #fff;
    box-shadow: 0 2px 3px #cacaca;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom right;
  }

  .my_site_L {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my_site_L_wrap {
    width: 90%;
  }

  .my_site_L_wrap img {
    width: 100%;
    height: auto;
  }

  .my_site_C {
    display: inline-block;
    width: 70%;
    padding: 5px 2px;
  }

  .my_site_R {
    width: 25%;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .shop_detail {
    margin-top: 8px;
  }

  .shop_detail_shop {
    padding: 0 5px 10px;
  }

  .shop_C_wrap {
    margin-top: 10px;
  }

  .shop_detail_H {
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    background-color: #fff;
    padding: 5px;
  }

  .Content_footer p {
    padding: 1px;
  }

  .car_list_L {
    display: inline-block;
    width: 8%;
  }

  .car_list_R {
    display: inline-block;
    width: 80%;
    padding: 10px 5px;
  }

  .shop_C_H {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .shop_C_H_L {
    width: 25%;
  }

  .shop_C_H_L img {
    width: 90%;
    margin-left: 5%;
  }

  .shop_C_H_R {
    margin-left: 3%;
    width: 72%;
  }

  .shop_C_H_R_H {
    font-weight: bold;
    font-size: 16px;
  }

  .shop_C_H_R_C {
    color: #f00;
    margin: 5px 0 10px 0;
    font-size: 14px;
  }

  .shop_C_H_R_F {
    font-size: 13px;
    color: #666;
  }

  .shop_C_C {
    background-color: #fff;
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
  }

  .shop_C_C p {
    display: inline-block;
  }

  .shop_C_C_list {
    margin: 5px 0;
    overflow: hidden;
  }

  .shop_C_C_list p:first-child {
    float: left;
  }

  .shop_C_C_list p:nth-child(2) {
    float: right;
  }

  .shop_C_F {
    margin-top: 10px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
  }

  .shop_C_F_list p {
    display: inline-block;
  }

  .shop_C_F_list {
    overflow: hidden;
    margin: 5px;
  }

  .shop_C_F_list p:nth-child(2) {
    float: right;
  }

  .downAngle {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #999;
    margin-left: 3px
  }

  .shop_C_F_final {
    height: 26px;
    line-height: 26px;
    font-size: 16px;
  }

  .GoCar {
    height: 26px;
    color: #fff;
    background-color: #00b2ff;
    padding: 0 8px;
  }

  .Content_footer p {
    padding: 1px;
  }

  .btn_wrap {
    width: 100vw;
    text-align: center;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1001;
    height: 58px;
    line-height: 58px;
    background-color: #fff;
  }


  .btn_wrap_div_left {
    display: inline-block;
    width: 68%;
    float: left;
    font-weight: bold;
  }

  .btn_wrap_div_right {
    display: inline-block;
    width: 30%;
    color: #fff;
    float: right;
    background: #ff0000
  }

  .siteWrap >>> .vux-popup-dialog {
    z-index: 1002;
  }

  .mode_wrap {
    background-color: #fff;
  }

  .mode_H {
    position: relative;
    top: 0;
    left: 0;
    text-align: center;
    padding: 10px;
    font-size: 20px;
  }

  .mode_C {
    margin: 5px 0;
  }

  .mode_C_list {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
  }

  .mode_C_list_H {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    overflow: hidden;
  }

  .mode_C_list_H_L {
    height: 25px;
    line-height: 25px;
  }

  .mode_C_list_H_R {
    display: inline-block;
    margin-left: 10px;
    float: right;
  }


  .mode_C_list_C {
    text-align: left;
    font-size: 14px;
    color: #666;
    line-height: 18px;
  }


</style>
