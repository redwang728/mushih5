<template>
  <div class="shop">
    <x-header title="确认订单" :left-options="{backText: ''}" class="header vux-1px-b"></x-header>
    <div class="shop_M">
      <!--header-->
      <div class="my_site" :style="{backgroundImage:'url('+require('@/assets/img/borderIcon.png')+')'}">
        <div class="my_site_L">
          <div class="my_site_L_wrap">
            <img src="@/assets/img/siteIcon.png" alt="">
          </div>
        </div>
        <div class="my_site_C" v-if="hasSite">
          <div style="margin-bottom: 5px;">
            <em style="color: #666">收货地址：</em>
            {{myAddress.userName}}
            <span style="color: #00b934">{{myAddress.phone}}</span>
          </div>
          <div>{{myAddress.addressName}}&#12288;{{myAddress.address}}</div>
        </div>
        <div class="my_site_C" v-else style="text-align: center;font-weight: bold">
          <p>您尚未选择收货地址</p>
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
          <div class="car_list_R">{{item.shopName}}</div>
          <div class="car_list_L" v-if="item.chooseIndex=='0'">到厂自提</div>
          <div class="car_list_L" v-else>物流配送</div>
        </div>
        <!--left-->
        <div class="shop_detail_shop">
          <!--vfor02-->
          <div class="shop_C_wrap" v-for="(items,indexs) in item.goodsList" :key="indexs">
            <div class="shop_C_H">
              <div class="shop_C_H_L">
                <img :src="items.goodsPicUrl" alt="">
              </div>
              <div class="shop_C_H_R">
                <div class="shop_C_H_R_H ellipsis">{{items.goodsName}}</div>
                <div class="shop_C_H_R_C"> ￥{{items.goodsPrice}}/㎡</div>
                <div class="shop_C_H_R_F">{{items.combinate}}</div>
              </div>
            </div>
            <!--vfor03-->
            <div class="shop_C_C" v-for="(itemss,indexss) in items.goodsParamList" :key="indexss">
              <div class="shop_C_C_list">
                <p>面积</p>
                <p style="color: #f00">
                  {{itemss.length}}mm*{{itemss.width}}mm={{computedArea(itemss.length,itemss.width)}}㎡</p>
              </div>
              <div class="shop_C_C_list">
                <p>工艺 <em style="color: #fc9d2d">打孔{{itemss.hole}}元/个,挖角{{itemss.top}}元/个</em></p>
                <p>￥{{computedSpec(itemss.topPrice,itemss.holePrice,itemss.top,itemss.hole)}}</p>
              </div>
              <div class="shop_C_C_list">
                <p>数量</p>
                <p>{{itemss.amount}}</p>
              </div>
              <div class="shop_C_C_list">
                <div v-if="`${itemss.imgurl}`.includes('http')" class="shop_C_C_list_input"
                     style="background-color: #199ed8" @click="showIamge(index,indexs,indexss)">查看图纸
                </div>
                <div v-else style="display: inline-block;">小计</div>
                <p style="color: #f00;font-size: 16px">￥{{itemss.countPrice}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="shop_C_F vux-1px-b">
          <div class="shop_C_F_list" @click="changeMode(item,index,item.chooseIndex)">
            <p>配送方式</p>
            <p style="color: #f00;" v-if="item.chooseIndex=='0'">到厂自提￥0<em class="downAngle"></em></p>
            <p style="color: #f00;" v-else>物流配送￥{{item.freight}} <em class="downAngle"></em></p>
          </div>
          <div class="shop_C_F_list">
            <p>预计发货日期</p>
            <p style="color: #f00;">{{item.deliveryDate}}前</p>
          </div>
        </div>
        <div class="shop_C_F">
          <div style="margin: 8px 5px">
            <p style="color: #f00;text-align: right" v-if="item.chooseIndex=='0'">物流：￥0.00</p>
            <p style="color: #f00;text-align: right" v-else>物流：￥{{item.freight}}</p>
          </div>
          <div style="margin: 8px 5px">
            <p style="color: #f00;text-align: right" v-if="item.chooseIndex=='0'">总价：￥{{shopMoney(item)}}</p>
            <p style="color: #f00;text-align: right" v-else>
              总价：￥{{(Number(shopMoney(item))+Number(item.freight)).toFixed(2)}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--footer-->
    <div class="btn_wrap vux-1px-t">
      <div class="btn_wrap_div">
        <div class="btn_wrap_div_left">
          <div class="btn_wrap_div_left_wrap">
            <div>总计:<span style="color:#ff0000;font-size:22px;font-weight: 400">{{endMoney}}元</span></div>
            <div v-if="isMode=='0'" class="btn_wrap_div_left_tips">配送方式：到厂自提</div>
            <div v-else-if="isMode=='1'" class="btn_wrap_div_left_tips">配送方式：物流配送</div>
            <div v-else-if="isMode=='2'" class="btn_wrap_div_left_tips">配送方式：物流配送、到厂自提</div>
          </div>
        </div>
        <div class="btn_wrap_div_right" @click="submit">立即购买</div>
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
            <p>联系人：{{shopInfo.legal}}<span style="color: #00b934"> {{shopInfo.phone}}</span></p>
            <p>{{shopInfo.province}}{{shopInfo.city}}{{shopInfo.county}} {{shopInfo.address}}</p>
          </div>
        </div>
      </div>
      <div class="mode_F">
        <x-button style="background-color: #00b2ff;color: #fff" @click.native="modeConfirm">确认</x-button>
      </div>
    </popup>
    <!--img-->
    <div v-if="imgShow" class="showIMG">
      <div class="imgDiv">
        <img style="width: 90%" :src="showIMGURL" alt="">
      </div>
      <div class="imgBtn">
        <div class="imgBtn_delete" style="color: #000000;background-color: #F00;" @click="imgShow=false">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Popup, XButton, Checklist, Icon} from 'vux';

  export default {
    name: 'CarConfirm',
    data () {
      return {
        shopList: [],
        reUpData: '',
        myAddress: '',
        modeInfo: '',
        shopInfo: '',
        endMoney: 0,
        deliverModeShow: false,
        siteShow: false,
        imgShow: false,
        showIMGURL: '',
        site: [],
        siteOption: [],
        PopupS: {
          zIndex: 1002
        },
        hasSite: false,
        siteList: [],
        modeIndex: 0,
        chooseIndex: 0,
        isMode: 0
      };
    },
    components: {XHeader, Popup, XButton, Checklist, Icon},
    methods: {
      changeSite () {
        this.siteShow = true;
        this.$http.get('/user/address/addressInfo').then(
          ({data}) => {
            let res = data;
            if (res.code == 200) {
              // console.log(res.data)
              this.siteList = res.data;
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
      chooseSite () {
        let That = this;
        let backData = this.siteList.filter((value, index, array) => {
          if (value.id == That.site[0]) {
            return true;
          }
        });
        this.myAddress = backData[0];
      }, // yes
      Resubmit () {
        this.$vux.loading.show({text: '数据提交中'});
        this.reUpData.addressId = this.site[0];
        this.$http.post('/order/wxConfirmOrderDir', this.reUpData, {headers: {'Content-Type': 'application/json'}}).then(({data}) => {
          if (data.code == 200) {
            this.shopList = data.data;
            this.shopList.forEach((v, i, a) => {
              v.chooseIndex = 1;
              return v;
            });
            this.chooseSite();
            this.computeMoney();// 总价
            this.hasSite = true;
            this.$vux.toast.text('地址切换成功', 'center');
            this.$vux.loading.hide();
          } else {
            this.$vux.loading.hide();
            this.$vux.toast.text('网络出错了', 'center');
          }
        });
      }, // yes
      showIamge (s01, s02, s03) {
        this.showIMGURL = this.shopList[s01].goodsList[s02].goodsParamList[s03].imgurl;
        this.imgShow = true;
      }, // yes
      changeMode (item, index, chooseIndex) {
        if (item.freight != null) {
          this.$http.get('/store/deliveryInfo?shopId=' + item.shopId).then(({data}) => {
            if (data.code == 200) {
              this.modeInfo = data.data;
              this.shopInfo = data.data.shopStoreAddrDto;
              this.modeIndex = index;
              this.chooseIndex = chooseIndex;
              this.deliverModeShow = true;
            } else {
              this.$vux.toast.text('切换失败', 'center');
            }
          });
        } else {
          this.$vux.toast.show({
            text: '请先选择收货地址',
            position: 'center',
            type: 'warn',
            width: '11em',
            time: '3000'
          });
        }
      }, // yes
      chooseMode (type) {
        this.chooseIndex = type;
      }, // yes
      modeConfirm () {
        this.shopList[this.modeIndex].chooseIndex = this.chooseIndex;
        this.deliverModeShow = false;
        this.computeMoney();// 总价
      }, // yes
      computeMoney () {
        let priceArr = ['0'];
        let getMode = [];
        this.shopList.forEach((value, index, array) => {
          if (value.chooseIndex == '1') {
            priceArr.push(value.freight);
          }
          ;
          getMode.push(value.chooseIndex);
          value.goodsList.forEach((value1, index1, array1) => {
            value1.goodsParamList.forEach((value2, index2, array2) => {
              priceArr.push(value2.countPrice);
            });
          });
        });
        this.endMoney = priceArr.reduce((preValue, curValue, index, array) => {
          return (Number(preValue) + Number(curValue)).toFixed(2);
        });
        let allMode = getMode.join('');
        if (`${allMode}`.includes('0')) {
          if (`${allMode}`.includes('1')) {
            this.isMode = 2;
          } else {
            this.isMode = 0;
          }
        } else {
          this.isMode = 1;
        }
      }, // yes
      mergeData () {
        let That = this;
        let allShop = this.shopList;
        let upData = [];// 接03
        allShop.forEach((value, index, array) => { // 3
          let isAddress;
          if (this.isMode == '0') {
            isAddress = {id: '', memid: ''};
          } else {
            isAddress = That.myAddress;
          }
          let obj = {};// 装03
          obj.addressId = isAddress.id;
          obj.distributionModel = value.chooseIndex;// 自提配送
          obj.orderCategory = '1';
          obj.assemble = '0';
          obj.memId = isAddress.memid;
          obj.orderType = '0';
          obj.shopId = value.shopId;
          obj.shops = [];// 接02
          value.goodsList.forEach((val, ind, arr) => { // 2
            let objShop = {};// 装02
            objShop.productspuid = val.spuId;
            objShop.productspus = [];// 接01
            val.goodsParamList.forEach((v, i, a) => { // 1
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
                combinate: `${val.goodsName} ${val.combinate}`, // 向上一层
                customno: v.customNo,
                distributionModel: value.chooseIndex, // 自提配送
                hole: v.hole,
                top: v.top,
                imgurl: v.imgurl,
                kuan: v.width,
                memId: isAddress.memid,
                productskuid: val.goodsSKUId, // 向上一层
                productspuid: val.spuId, // 向上一层
                shopid: value.shopId, // 向上二层
                specialRequirements: specialRequire
              };
              objShop.productspus.push(products);// push 01
            });
            obj.shops.push(objShop);// push 02
          });
          upData.push(obj);
        });
        return upData;
      }, // yes
      submit () {
        if (this.isMode == '0') {
          this.relSubmit();
        } else {
          if (this.myAddress != null) {
            this.relSubmit();
          } else {
            this.$vux.toast.show({
              text: '请选择收货地址',
              position: 'center',
              type: 'warn',
              width: '9em',
              time: '3000'
            });
          }
        }
      }, // yes
      relSubmit () {
        let _data = this.mergeData();
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
      }, // yes
      shopMoney () {
        return function (valList) {
          let getData = ['0'];
          valList.goodsList.forEach((value, index, array) => {
            value.goodsParamList.forEach((val, ind, arr) => {
              getData.push(val.countPrice);
            });
          });
          let _data = getData.reduce((preVal, curVal, index, array) => {
            return (Number(preVal) + Number(curVal)).toFixed(2);
          });
          return _data;
        };
      }
    },
    mounted () {
      let _data = this.$store.state.carConfirm;
      if (_data != null && _data != undefined && _data != '') {
        this.shopList = _data.backData;
        this.reUpData = _data.reUpData;
        this.shopList.forEach((v, i, a) => {
          v.chooseIndex = 0;
          return v;
        });
        this.computeMoney();
      } else {
        this.$router.back(-1);
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
    width: 70%;
    padding: 10px 5px;
  }

  .car_list_L {
    display: inline-block;
    width: 28%;
    font-weight: bold;
    text-align: right;
    padding-right: 5px;
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
    overflow: hidden;
    border-radius: 5px;
    margin: 5px;
  }

  .shop_C_F_list p {
    display: inline-block;
  }

  .shop_C_F_list {
    overflow: hidden;
    margin: 8px 5px;
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
    background-color: #fff;
  }


  .btn_wrap_div_left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 68%;
    float: left;
    font-weight: bold;
    height: 58px;
  }

  .btn_wrap_div_left_tips {
    font-size: 10px;
    font-weight: normal;
    color: #fe8f00;
    margin-top: 3px;
  }

  .btn_wrap_div_right {
    display: inline-block;
    width: 30%;
    color: #fff;
    float: right;
    background: #ff0000;
    height: 58px;
    line-height: 58px;
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


  .mode_C_list_C {
    text-align: left;
    font-size: 14px;
    color: #666;
    line-height: 18px;
  }

  .shop_C_C_list_input {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    padding: 3px 8px;
    color: #fff;
  }

  .showIMG {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
    width: 100vw;
    height: 100vh;
    z-index: 1002;
    overflow: hidden;
  }

  .imgClose img {
    height: 5vh;
    transform: rotate(45deg);
  }

  .imgDiv {
    text-align: center;
    width: 100%;
    height: 75vh;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgBtn {
    position: absolute;
    bottom: 6vh;
    width: 80%;
    left: 10%;
  }

  .imgBtn_delete {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 2.33333333;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
  }


</style>
