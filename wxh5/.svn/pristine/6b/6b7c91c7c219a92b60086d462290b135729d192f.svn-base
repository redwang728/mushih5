<template>
  <div class="mysbmit">
    <x-header title="确认订单" :left-options="{backText: ''}" class="header"></x-header>
    <div class="q_comfim_localtion">
      <div class="q_comfim_localtion_left ">
        <img src="@/assets/img/site.png" alt="">
      </div>
      <div class="q_comfim_localtion_mid ">
                      <span v-if="addAddress">
                           <h4
                             style="line-height: 10vw;">收货地址 : {{backLocaltion.userName}} {{backLocaltion.phone}} </h4>
                           <p style="font-size:12px;line-height: 4vw;">{{backLocaltion.addressName}} {{backLocaltion.address}}</p>
                      </span>
        <span v-else>您没有设置收货地址</span>
      </div>
      <div class="q_comfim_localtion_right ">
        <span v-if="addAddress" @click="selectLocaltion">选择收货地址 ></span>
        <span v-else @click="addAddressFn">添加收货地址></span>
      </div>
    </div>
    <div class="q_comfim_img">
      <div class="q_comfim_img_left">
        <img :src="$route.query.picUrl" alt="">
      </div>
      <div class="q_comfim_img_right">
        <h4 style="font-size: 18px;line-height: 10vw;height:10vw;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{$route.query.goodsName}}</h4>
        <p style=" font-size: 15px; line-height: 7vw; color: #ff0000;"> ¥ {{$route.query.price}}</p>
        <p style=" font-size: 14px; line-height: 5vw; ">{{$route.query.skuStr}}</p>
      </div>
    </div>
    <div class="q_comfim_info">
      <ul>
        <li> 面积 : <span style="float:right;color:#ff0000">{{$route.query.chang}}mm * {{$route.query.kuan}}mm = {{($route.query.kuan*$route.query.chang/1000000).toFixed(2)}}㎡</span>
        </li>
        <li> 工艺 : <span style="color:#ff721f;font-size:12px">打孔{{$route.query.holePrice}} 元/个 挖角{{$route.query.topPrice}} 元/个</span>
          <span style="float:right">¥{{$route.query.technologyPrice}}</span></li>
        <li> 数量 : <span style="float:right">{{$route.query.amount}}</span></li>
        <li style="height:auto"> 标注 : <span style="float:right">{{$route.query.custom}}</span></li>
        <li> 合计 : <span style="float:right">{{endPrice}}</span></li>
      </ul>
    </div>
    <div class="q_comfim_deliveryMode" @click="deliveryModeFn">
      配送方式选择 : <span style="float:right">{{deliveryModeName}} <span
      style="color:#ff0000"> ¥{{deliveryModeMoney}} </span> </span>
    </div>
    <x-button :gradients="['#1D62F0', '#19D5FD']" style="margin:3vw auto;width:80vw" @click.native="buyProduct">去付款
    </x-button>
    <!--添加收货地址-->
    <popup v-model="popipAdress">
      <div class="popup1">
        <group class="AllInput">
          <x-input placeholder="收货人" is-type :max="5" ref="name" required v-model="getData.userName"></x-input>
          <x-input placeholder="请输入手机号" mask="999 9999 9999" v-model="getData.phone" :max="13" is-type="china-mobile"
                   ref="mobile"
                   required></x-input>
          <x-address title="收货地址所在区:" v-model="getCity" :list="addressData" placeholder="请选择地址"
                     @on-shadow-change="addressChoose"></x-address>
          <x-input placeholder="详细地址" is-type ref="detailSite" required v-model="getData.address"></x-input>
        </group>
        <x-button class="submitBtn" :gradients="['#1D62F0', '#19D5FD']" @click.native="submitData">确认</x-button>
      </div>
    </popup>
    <!--选择收货地址-->
    <popup v-model="selectLocaltionPopup" class="popup6" :hide-on-blur="false">
      <popup-header
        title="请您选择收货地址"
        right-text="确认"
        left-text="取消"
        :show-bottom-border="false"
        @on-click-left="selectLocaltionPopupCance"
        @on-click-right="exchangeLocalFn"></popup-header>
      <group gutter="0">
        <radio :options="alllocaltion" v-model="loaclIndex"></radio>
      </group>
      <x-button :gradients="['#1D62F0', '#19D5FD']" style="margin:3vw auto;width:80vw" @click.native="contionaddFn"
                v-show="!contionadd"> 添加收货地址
      </x-button>
      <div v-show="contionadd" style="background:#fff">
        <x-input placeholder="收货人" is-type :max="5" ref="name" required v-model="getData.userName"></x-input>
        <x-input placeholder="请输入手机号" mask="999 9999 9999" v-model="getData.phone" :max="13" is-type="china-mobile"
                 ref="mobile"
                 required></x-input>
        <x-address title="收货地址所在区:" v-model="getCity" :list="addressData" placeholder="请选择地址"
                   @on-shadow-change="addressChoose"></x-address>
        <x-input placeholder="详细地址" is-type ref="detailSite" required v-model="getData.address"></x-input>
        <x-button class="submitBtn" :gradients="['#1D62F0', '#19D5FD']" @click.native="submitData(1)">确认</x-button>
      </div>
    </popup>
    <!--运费模板-->
    <popup v-model="popupshow">
      <div class="popup0 ">
        <div class="popup0_box">
          <div class="popup0_box-top">配送信息查看</div>
          <div class="popup0_box_info" @click="exchangedistributionModel(1)">
            <!-- @click="exchangedistributionModel(1)"  style="  border-bottom: 1px solid #acacac; padding-bottom: 3vw;" -->
            <div class="popup0_box_info_right" style="   padding-bottom: 3vw;">
              <icon type="success-no-circle" v-show="distributionModelType==1"></icon>
            </div>
            <h4>物流配送 ( <span style="color:#ff0000;font-weight:bold">¥ {{produstInfo.deliveryFee}}</span> )</h4>
            <p>一 基础运费为 :{{parseInt(produstInfo.baseCost)}}元,满{{parseInt(produstInfo.offsetradius)}}的平方米免基础运费.</p>
            <p>二 {{parseInt(produstInfo.area)}}km以内只收基础运费,若超过,每km收取 {{parseInt(produstInfo.logistFee)}}元 </p>
          </div>
          <div class="popup0_box_info" style="padding-bottom: 5vw;" @click="exchangedistributionModel(0)">
            <!--  -->
            <div class="popup0_box_info_right">
              <icon type="success-no-circle" v-show="distributionModelType==0"></icon>
            </div>
            <h4>到厂自提 ( <span style="color:#ff0000;font-weight:bold">¥ 0.00</span>)</h4>
            <p>一 联系人 : {{produstInfo.shopName}} <span style="color:#47c765">{{produstInfo.phone}}</span></p>
            <p>二 地址 : {{produstInfo.address}} </p>
          </div>

        </div>

      </div>
    </popup>
  </div>
</template>
<script>
  import {
    XHeader,
    Popup,
    XButton,
    XInput,
    Group,
    XAddress,
    ChinaAddressV4Data,
    XSwitch,
    Radio,
    PopupHeader,
    Icon
  } from 'vux';
  import qs from 'qs';
  export default {
    data () {
      return {
        contionadd: false,
        deliveryModeName: '买家自取',
        distributionModelType: 0,
        hasChanged: false,
        produstInfo: {
          address: this.$route.query.adress,
          area: this.$route.query.area,
          deliveryFee: 0,
          logistFee: this.$route.query.logistFee,
          offsetradius: this.$route.query.offsetradius,
          shopName: this.$route.query.shopName,
          baseCost: ''

        }, // 运费信息 和之前的保持同步
        deliveryModeMoney: '0.00',
        popupshow: false,
        endPrice: '',
        addAddress: true,
        popipAdress: false,
        newLoacl: [],
        choseLocal: [],
        selectLocaltionPopup: false,
        alllocaltion: [],
        backLocaltion: [],
        loaclIndex: 0,
        getData: {
          id: '',
          userName: '',
          phone: null,
          provinceId: '340000',
          cityId: '340100',
          countyid: '340102',
          address: '',
          isDefault: '1',
          addressName: '安徽省-合肥市-瑶海区'
        },
        getCity: [],
        addressData: ChinaAddressV4Data
      };
    },
    components: {
      XHeader,
      Popup,
      XButton,
      XInput,
      PopupHeader,
      Group,
      XAddress,
      Icon,
      ChinaAddressV4Data,
      Radio,
      XSwitch
    },
    methods: {
      contionaddFn () {
        // this.contionadd = true;
        this.$router.push('/center/addsite');
      },
      selectLocaltionPopupCance () {
        this.selectLocaltionPopup = false;
        this.contionadd = false;
      },
      // 运费模板popup
      deliveryModeFn () {
        let _data = {
          shopId: this.$route.query.shopId,
          addressId: this.backLocaltion.id,
          orderNumber: (this.$route.query.chang * this.$route.query.kuan)
        };
        this.popupshow = true;
        this.$http.post('/order/deliveryFee', qs.stringify(_data)).then((data) => {
          if (data.data.code == 200) {
            this.produstInfo.baseCost = data.data.data.baseCost;
            this.produstInfo.deliveryFee = data.data.data.deliveryFee;
          } else {
            alert('网络错误...');
          }
        });
      },
      exchangedistributionModel (type) {
        this.distributionModelType = type;
        this.hasChanged = true;
        if (type == 0) {
          this.deliveryModeName = '买家自取';
          this.deliveryModeMoney = 0;
          this.distributionModelType = 0;
          this.endPrice = (Number(this.$route.query.technologyPrice) + Number(this.$route.query.price * (this.$route.query.chang * this.$route.query.kuan) / 1000000 * this.$route.query.amount)).toFixed(2);
        } else {
          this.deliveryModeName = '商家配送';
          this.deliveryModeMoney = this.produstInfo.deliveryFee;
          this.endPrice = (Number(this.$route.query.technologyPrice) + Number(this.$route.query.price * (this.$route.query.chang * this.$route.query.kuan) / 1000000 * this.$route.query.amount) + Number(this.deliveryModeMoney)).toFixed(2);
        }
      },
      selectLocaltion () {
        if (this.hasChanged) {
          this.$vux.toast.show({text: '更换地址,运费模板重新计算', position: 'center', type: 'success', width: '9em'});
          this.selectLocaltionPopup = true;
        } else {
          this.selectLocaltionPopup = true;
        }
      },
      exchangeLocalFn () {
        if (this.hasChanged) {
          // 重新计算于 运算费用 && this.deliveryModeName == '商家配送'优化部分 // 伤脑子
          this.deliveryModeName = '买家自取';
          this.deliveryModeMoney = 0;
          this.distributionModelType = 0;
          this.endPrice = (Number(this.$route.query.technologyPrice) + Number(this.$route.query.price * (this.$route.query.chang * this.$route.query.kuan) / 1000000 * this.$route.query.amount)).toFixed(2);
          this.$http.post('/user/address/UpdateAddressInfo', qs.stringify(this.getData)).then(
            ({data}) => {
              if (data.code == 200) {
                this.backLocaltion = this.newLoacl;
                this.selectLocaltionPopup = false;
              } else {
                this.$vux.toast.show({
                  text: '修改失败',
                  position: 'center',
                  type: 'warn',
                  width: '9em',
                  time: '3000'
                });
              }
            }
          );
          this.$vux.toast.show({
            text: '默认自取,若需要配送,请更换',
            position: 'center',
            type: 'success',
            width: '10em'
          });
        } else {
          if (this.loaclIndex == 0) {
            this.selectLocaltionPopup = false;
          } else {
            let getData = {
              id: this.newLoacl.id,
              userName: this.newLoacl.userName,
              phone: this.newLoacl.phone,
              provinceId: this.newLoacl.provinceId,
              cityId: this.newLoacl.cityId,
              countyid: this.newLoacl.countyid,
              address: this.newLoacl.address,
              isDefault: 1,
              addressName: this.newLoacl.addressName
            };
            this.$http.post('/user/address/UpdateAddressInfo', qs.stringify(getData)).then(
              ({data}) => {
                if (data.code == 200) {
                  this.$vux.toast.show({
                    text: '修改成功',
                    position: 'center',
                    type: 'success',
                    width: '9em'
                  });
                  this.backLocaltion = this.newLoacl;
                  this.selectLocaltionPopup = false;
                } else {
                  this.$vux.toast.show({
                    text: '修改失败',
                    position: 'center',
                    type: 'warn',
                    width: '9em',
                    time: '3000'
                  });
                }
              }
            );
          }
        }
      },
      // 提交数据
      buyProduct () {
        if (this.backLocaltion.id) {
          let specialRequirement = 1;
          //  有无特殊要求
          if (this.$route.query.top >= 1 || this.$route.query.hode >= 1) {
            specialRequirement = 0;
          }
          let _data = [
            {
              addressId: this.backLocaltion.id,
              distributionModel: this.distributionModelType,
              orderCategory: 1,
              assemble: 0,
              shopId: this.$route.query.shopId,
              shops: [{
                productspuid: this.$route.query.spuId,
                productspus: [{
                  amount: this.$route.query.amount,
                  billStatus: '',
                  chang: this.$route.query.chang,
                  combinate: `${this.$route.query.goodsName} ${this.$route.query.skuStr}`,
                  customno: this.$route.query.custom,
                  distributionModel: this.distributionModelType,
                  hole: this.$route.query.hold,
                  kuan: this.$route.query.kuan,
                  imgurl: this.$route.query.imgurl,
                  productskuid: this.$route.query.skuid,
                  productspuid: this.$route.query.spuId,
                  shopid: this.$route.query.shopId,
                  top: this.$route.query.top,
                  specialRequirements: specialRequirement
                }]
              }]
            }
          ];
          this.$http.post('order/placeOrderByCar', _data, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then(({data}) => {
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


        // console.log(_data);
      },
      addressInfo () {
        this.$http.get('/user/address/addressInfo').then(({data}) => {
          if (data.data.length == 0) {
            this.addAddress = false;
          } else {
            this.addAddress = true;
            this.backLocaltion = data.data[0];
            this.choseLocal = data.data;

            let arr = [];
            data.data.map((item, index) => {
              arr.push({value: `${item.addressName}  ${item.address}`, key: index});
            });
            this.alllocaltion = arr;
          }
        });
      },
      addAddressFn () {
        this.popipAdress = true;
      },
      addressChoose (ids, names) {
        this.getData.provinceId = ids[0];
        this.getData.cityId = ids[1];
        this.getData.countyid = ids[2];
        this.getData.addressName = names.join('-');
      },
      submitData (qyq) {
        let nameValid = this.$refs.name.valid;
        let phoneValid = this.$refs.mobile.valid;
        let addressValid = this.$refs.detailSite.valid;
        if (nameValid) {
          if (phoneValid) {
            if (addressValid) {
              if (qyq == 1) {
                this.$http.post('/user/address/addAddress', qs.stringify(this.getData)).then(
                  ({data}) => {
                    if (data.code == 200) {
                      this.$vux.toast.show({
                        text: '添加成功',
                        position: 'center',
                        type: 'success',
                        width: '9em'
                      });
                      this.popipAdress = false;
                      this.contionadd = false;
                      this.addressInfo();
                    } else {
                      this.$vux.toast.show({
                        text: '添加失败',
                        position: 'center',
                        type: 'warn',
                        width: '9em',
                        time: '3000'
                      });
                    }
                  }
                );
              } else {
                this.$http.post('/user/address/addAddress', qs.stringify(this.getData)).then(
                  ({data}) => {
                    if (data.code == 200) {
                      this.$vux.toast.show({
                        text: '添加成功',
                        position: 'center',
                        type: 'success',
                        width: '9em'
                      });
                      this.popipAdress = false;
                      this.addressInfo();
                    } else {
                      this.$vux.toast.show({
                        text: '添加失败',
                        position: 'center',
                        type: 'warn',
                        width: '9em',
                        time: '3000'
                      });
                    }
                  }
                );
              }
            } else {
              this.$vux.toast.show({
                text: '请填写详细地址',
                position: 'center',
                type: 'warn',
                width: '9em'
              });
            }
          } else {
            this.$vux.toast.show({
              text: '请填写手机号',
              position: 'center',
              type: 'warn',
              width: '9em'
            });
          }
        } else {
          this.$vux.toast.show({
            text: '请填写收货人',
            position: 'center',
            type: 'warn',
            width: '9em'
          });
        }
      }
    },
    watch: {
      loaclIndex: function () {
        this.newLoacl = this.choseLocal[this.loaclIndex];
      }
    },
    mounted () {
      this.addressInfo();
      this.endPrice = (Number(this.$route.query.technologyPrice) + Number(this.$route.query.price * (Number(this.$route.query.chang) * Number(this.$route.query.kuan)) / 1000000 * Number(this.$route.query.amount))).toFixed(2);
    }
  };
</script>
<style scoped>
  .mysbmit {
    font-size: 14px;
    color: #686868
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

  .q_comfim_localtion {
    width: 96vw;
    margin: 0 auto;
    margin-top: 47px;
    height: auto;
    overflow: hidden;;
    background: #fff;
    padding: 0 2vw;;
    line-height: 6vw;
  }

  .q_comfim_localtion_left {
    width: 5vw;
    height: 15vw;
    text-align: center;
    float: left;;
    line-height: 15vw
  }

  .q_comfim_localtion_left img {
    width: 5vw;
    height: 6vw;
  }

  .q_comfim_localtion_mid {
    width: 60vw;
    height: auto;
    float: left;
    margin-left: 3vw;
    line-height: 15vw;
  }

  .margin_top3 {
    margin-top: 3vw
  }

  .q_comfim_localtion_right {
    width: 25vw;;
    height: 15vw;
    float: left;
    margin-left: 2vw;;
    font-size: 13px;
    text-align: right;
    line-height: 15vw
  }

  .popup1 {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 3vw 0;
  }

  .AllInput {
    width: 100vw;
    background-color: #fff;
    z-index: 9;
  }

  .submitBtn {
    width: 90%;
    margin-top: 11px;
  }

  .popup6 {
    padding: 3vw 0;
    height: auto;
    overflow: hidden;
  }

  .q_comfim_img {
    width: 94vw;
    height: 28vw;
    padding: 3vw 3vw;
    margin: 0 auto;
    margin-top: 3vw;
    overflow: hidden;
  }

  .q_comfim_img_left {
    width: 28vw;
    height: 28vw;
    float: left;
  }

  .q_comfim_img_right {
    width: 63vw;
    height: 28vw;
    float: left;
    margin-left: 3vw;
  }

  .q_comfim_img_left img {
    width: 28vw;
    height: 28vw;
  }

  .popup6 >>> .weui-check__label {
    font-size: 13px
  }

  .q_comfim_info {
    height: auto;
    width: 96vw;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    padding: 1vw 0;
    overflow: hidden;
  }

  .q_comfim_info ul li {
    height: 10vw;
    line-height: 10vw;
    padding: 0 2vw
  }

  .popup0 {
    height: auto;
    width: 100%;
    padding: 2vw 0vw;
    background: #fff
  }

  .q_comfim_deliveryMode {
    width: 92vw;
    margin: 2vw auto 0;
    border: 1px solid #ccc;
    height: 8vw;
    padding: 3VW 2vw;
    line-height: 8vw;
    border-radius: 5px;
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
</style>
