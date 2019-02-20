<template>
  <div class="car">
    <x-header title="购物车" :left-options="{backText: ''}" class="header vux-1px-b">
      <p slot="right" style="color:#000;font-size: 15px;font-weight: bold" @click="setDelet">{{edTxt}}</p>
    </x-header>
    <div class="content" v-if="isClick">
      <!--vfor01-->
      <div class="shop_detail vux-1px-b" v-for="(item,index) in shopList" :key="index">
        <div class="shop_detail_H">
          <div class="car_list_R" @click="calcEndMoney" v-if="!selectIconShow">
            <check-icon :value.sync="item.upChecked"></check-icon>
          </div>
          <div class="car_list_L" style="font-weight: bold">
            <router-link :to="{path:'/shop/shopdetail',query:{'shopId':item.shopId}}">
              {{item.shopName}} <span style="color: #f00">></span>
            </router-link>
          </div>
        </div>
        <!--vfor02-->
        <div class="shop_detail_shop" v-for="(items,indexs) in item.goodsList" :key="indexs">
          <div class="shop_C_wrap">
            <div class="shop_C_H">
              <div class="shop_C_H_L">
                <img :src="items.goodsPicUrl" alt="">
              </div>
              <div class="shop_C_H_R">
                <div class="shop_C_H_R_H">
                  <div class="shop_C_H_R_H_L ellipsis">{{items.goodsName}}</div>
                  <span class="car_list_R_btn" @click="edCar(items,item.shopId)">编辑规格</span>
                </div>
                <div class="shop_C_H_R_C">￥{{items.goodsPrice}}/㎡</div>
                <div class="shop_C_H_R_F">{{items.combinate}}</div>
              </div>
            </div>
            <!--vfor03-->
            <div class="shop_C_C" v-for="(itemss,indexss) in items.goodsParamList" :key="indexss">
              <!--删除-->
              <div class="shop_C_C_L" v-if="selectIconShow">
                <check-icon :value.sync="itemss.delChecked" type="plain"></check-icon>
              </div>
              <div class="shop_C_C_R">
                <div class="shop_C_C_list">
                  <p>面积</p>
                  <p style="color: #f00">
                    {{itemss.length}}*{{itemss.width}}={{((itemss.length * itemss.width) / 1000000).toFixed(2)}}㎡
                  </p>
                </div>
                <div class="shop_C_C_list">
                  <p>工艺 <em
                    style="color: #fc9d2d;font-size: 11px">打孔{{itemss.holePrice}}元/个,挖角{{itemss.topPrice}}元/个</em></p>
                  <p style="color: #f00">￥{{itemss.holeAddTopPrice}}</p>
                </div>
                <div class="shop_C_C_list">
                  <p>片数</p>
                  <p @click="clickNumber(item.upChecked)">
                    <inline-x-number width="25px" class="inline_input" :fillable="true" :min="1"
                                     v-model="itemss.amount"></inline-x-number>
                  </p>
                </div>
                <div class="shop_C_C_list">
                  <div v-if="`${itemss.imgurl}`.includes('http')" class="shop_C_C_list_input"
                       style="background-color: #199ed8" @click="showIamge(index,indexs,indexss)">查看图纸
                  </div>
                  <div v-else class="shop_C_C_list_input" style="background-color: #fc9d2d"
                       @click="getSite(index,indexs,indexss)">
                    上传图纸
                    <upload-image @resData="returnData"></upload-image>
                  </div>
                  <p style="font-size: 16px;color: #f00">￥{{(itemss.countPrice*itemss.amount).toFixed(2)}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-else>
      <div style="width: 40%;margin: 10px auto 0">
        <img style="width: 100%" src="@/assets/img/carIcon.png" alt="">
      </div>
    </div>
    <!--btn-->
    <div class="btn_wrap vux-1px-t">
      <!--删除-->
      <div class="btn_wrap_show" v-if="selectIconShow">
        <div class="btn_L" @click="delAllChoose">
          <div v-if="delTurn">
            <icon type="success"></icon>
            不全选
          </div>
          <div v-else>
            <icon type="circle"></icon>全选
          </div>
        </div>
        <div class="btn_R">
          <span class="btn_R_delete" @click="delFun">删除</span>
        </div>
      </div>
      <!--结算-->
      <div class="btn_wrap_show" v-else>
        <div class="btn_L" @click="upAllChoose">
          <div v-if="upTurn">
            <icon type="circle"></icon>
            全选
          </div>
          <div v-else>
            <icon type="success"></icon>
            不全选
          </div>
        </div>
        <div class="btn_C">合计:<span style="color: #f00">￥{{endMoney}}</span></div>
        <div class="btn_R" style="background-color: #f00;" @click="submitData">去结算</div>
      </div>
    </div>
    <!--img-->
    <div v-if="imgShow" class="showIMG">
      <div class="imgClose" @click="imgShow=false">
        <img src="@/assets/img/addIcon.png" alt="">
      </div>
      <div class="imgDiv">
        <img style="width: 90%" :src="showIMGURL" alt="">
      </div>
      <div class="imgBtn">
        <div class="imgBtn_delete" style="color: #000000;background-color: #F8F8F8;" @click="deletIMG">删除</div>
        <div class="imgBtn_delete" style="background-color: #E64340;margin-top: 10px">重新上传
          <upload-image @resData="reData"></upload-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, CheckIcon, Popup, InlineXNumber, Icon} from 'vux';
  import UploadImage from './AllMenu/UploadImage.vue';
  import qs from 'qs';
  export default {
    name: 'Car',
    data () {
      return {
        isClick: true,
        shopList: [],
        edTxt: '删除',
        selectIconShow: false,
        site01: 0,
        site02: 0,
        site03: 0,
        imgSite01: 0,
        imgSite02: 0,
        imgSite03: 0,
        imgShow: false,
        showIMGURL: '',
        delTurn: false,
        upTurn: true,
        endMoney: 0
      };
    },
    components: {XHeader, XButton, CheckIcon, Popup, InlineXNumber, UploadImage, Icon},
    methods: {
      getCarInfo () {
        this.$http.get('/car/info').then(({data}) => {
          if (data.code == '200') {
            if (data.data.length > 0) {
              this.shopList = data.data.map((value, index, array) => {
                value.upChecked = false;// 购买
                value.goodsList.map((val, ind, arr) => {
                  val.goodsParamList.map((v, i, a) => {
                    v.delChecked = false;// 删除
                    return v;
                  });
                  return val;
                });
                return value;
              });
            } else {
              this.isClick = false;
            }
          }
        });
      }, // yes
      setDelet () {
        if (this.isClick) {
          if (this.selectIconShow) {
            this.selectIconShow = false;
            this.edTxt = '删除';
          } else {
            this.selectIconShow = true;
            this.edTxt = '完成';
          }
        } else {
          this.$vux.toast.text('购物车是空的', 'center');
        }
      }, // yes
      getSite (s01, s02, s03) {
        this.site01 = s01;
        this.site02 = s02;
        this.site03 = s03;
      }, // yes
      returnData (v) {
        let ONE = this.site01;
        let TWO = this.site02;
        let THREE = this.site03;
        this.shopList[ONE].goodsList[TWO].goodsParamList[THREE].imgurl = v;
      }, // yes
      showIamge (s01, s02, s03) {
        this.imgSite01 = s01;
        this.imgSite02 = s02;
        this.imgSite03 = s03;
        this.showIMGURL = this.shopList[s01].goodsList[s02].goodsParamList[s03].imgurl;
        this.imgShow = true;
      }, // yes
      deletIMG () {
        let ONE = this.imgSite01;
        let TWO = this.imgSite02;
        let THREE = this.imgSite03;
        this.shopList[ONE].goodsList[TWO].goodsParamList[THREE].imgurl = '';
        this.imgShow = false;
        this.$vux.toast.text('删除成功', 'center');
      }, // yes
      reData (v) {
        let ONE = this.imgSite01;
        let TWO = this.imgSite02;
        let THREE = this.imgSite03;
        this.shopList[ONE].goodsList[TWO].goodsParamList[THREE].imgurl = v;
        this.showIMGURL = v;
      }, // yes
      delAllChoose () {
        if (this.isClick) {
          if (this.delTurn) {
            this.shopList.map((value, index, array) => {
              value.goodsList.map((val, ind, arr) => {
                val.goodsParamList.map((v, i, a) => {
                  v.delChecked = false;// 删除
                  return v;
                });
                return val;
              });
              return value;
            });
            this.delTurn = false;
          } else {
            this.shopList.map((value, index, array) => {
              value.goodsList.map((val, ind, arr) => {
                val.goodsParamList.map((v, i, a) => {
                  v.delChecked = true;// 删除
                  return v;
                });
                return val;
              });
              return value;
            });
            this.delTurn = true;
          }
        } else {
          this.$vux.toast.text('购物车是空的', 'center');
        }
      }, // yes
      delFun () {
        let upData = [];
        this.shopList.map((value, index, array) => {
          value.goodsList.map((val, ind, arr) => {
            val.goodsParamList.map((v, i, a) => {
              if (v.delChecked) {
                upData.push(v.id);
              }
            });
          });
        });
        let _data = {list: upData.join(',')};
        this.$http.post('/car/delect', qs.stringify(_data)).then(({data}) => {
          if (data.code == 200) {
            this.$vux.toast.text('删除成功', 'center');
            this.getCarInfo();
            this.setDelet();
          } else {
            this.$vux.toast.text('删除失败', 'center');
          }
        });
      }, // yes
      upAllChoose () {
        if (this.isClick) {
          if (this.upTurn) {
            this.shopList.map((value, index, array) => {
              value.upChecked = true;// 购买
              return value;
            });
            this.upTurn = false;
          } else {
            this.shopList.map((value, index, array) => {
              value.upChecked = false;// 不购买
              return value;
            });
            this.upTurn = true;
          }
          this.calcEndMoney();
        } else {
          this.$vux.toast.text('购物车是空的', 'center');
        }
      }, // yes
      clickNumber (Bool) {
        if (Bool) {
          let THAT = this;
          setTimeout(function () {
            THAT.calcEndMoney();
          }, 10);
        }
      }, // yes
      calcEndMoney () {
        let moneyArr = [0];
        this.shopList.forEach((value, index, array) => {
          if (value.upChecked) {
            value.goodsList.forEach((val, ind, arr) => {
              val.goodsParamList.forEach((v, i, a) => {
                let m = (v.countPrice * v.amount);
                moneyArr.push(m);
              });
            });
          }
        });
        this.endMoney = moneyArr.reduce((preValue, curValue, index, array) => {
          return (Number(preValue) + Number(curValue)).toFixed(2);
        });
      }, // yes
      saveChange () {
        let hasID = [];
        let That = this;
        this.shopList.forEach((value, index, array) => {
          value.goodsList.forEach((val, ind, arr) => {
            val.goodsParamList.forEach((v, i, a) => {
              let pushData = {
                id: v.id,
                top: v.top,
                hole: v.hole,
                width: v.width,
                length: v.length,
                imgurl: v.imgurl,
                amount: v.amount,
                customNo: v.customNo
              };
              hasID.push(pushData);
            });
          });
        });
        return {editList: hasID, saveList: []};
      }, // yes
      edCar (value, ID) {
        let upData = this.saveChange();
        this.$http.post('/car/edit', upData, {headers: {'Content-Type': 'application/json'}}).then(({data}) => {
          if (data.code == 200) {
            let _data = {
              shopId: ID,
              goodsList: value
            };
            this.$store.commit('setcarEdData', _data);
            this.$router.push('/car/careditor');
          } else {
            this.$vux.toast.text('网络出错了', 'center');
          }
        });
      }, // yes
      submitData () {
        if (this.isClick) {
          let idArr = [];
          this.shopList.forEach((value, index, array) => {
            if (value.upChecked) {
              idArr.push(value.shopId);
            }
          });
          if (idArr.length > 0) {
            let upData = this.saveChange();
            this.$http.post('/car/edit', upData, {headers: {'Content-Type': 'application/json'}}).then(({data}) => {
              if (data.code == 200) {
                let _data = {addressId: '', list: idArr};
                this.$http.post('/order/wxConfirmOrderDir', _data, {headers: {'Content-Type': 'application/json'}}).then(({data}) => {
                  if (data.code == 200) {
                    let storeData = {
                      reUpData: _data,
                      backData: data.data
                    };
                    this.$store.commit('setcarConfirm', storeData);
                    this.$router.push('/car/carconfirm');
                  } else {
                    this.$vux.toast.text('网络出错了', 'center');
                  }
                });
              } else {
                this.$vux.toast.text('网络出错了', 'center');
              }
            });
          } else {
            this.$vux.toast.text('请选择商品', 'center');
          }
        } else {
          this.$vux.toast.text('购物车是空的', 'center');
        }
      }
    },
    computed: {},
    mounted () {
      this.getCarInfo();
    }
  };

</script>

<style scoped>
  .car {
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

  .content {
    margin: 48px 0;
    width: 100vw;
    font-size: 14px;
  }

  .shop_detail_shop {
    padding: 0 3px 10px;
  }

  .shop_C_wrap {
    margin-top: 10px;
  }

  .shop_detail_H {
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    background-color: #fff;
    padding: 0 5px;
  }

  .Content_footer p {
    padding: 1px;
  }

  .car_list_R_btn {
    display: inline-block;
    background-color: #ff6407;
    color: #fff;
    /*padding:5px 8px;*/
    padding: 2px 3px;
    font-weight: normal;
  }

  .car_list_L {
    display: inline-block;
    width: 60%;
    padding: 10px 0;
  }
  .car_list_R{
    display: inline-block;
    width: 10%;
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
    width: 75%;
  }

  .shop_C_H_R_H {
    font-weight: bold;
    font-size: 14px;
  }

  .shop_C_H_R_H_L {
    display: inline-block;
    width: 72%;
  }

  .shop_C_H_R_C {
    color: #f00;
    margin: 5px 0 10px 0;
    font-size: 13px;
  }

  .shop_C_H_R_F {
    font-size: 13px;
    color: #666;
  }

  .shop_C_C {
    background-color: #fff;
    padding: 10px 0;
    margin-top: 5px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shop_C_C p {
    display: inline-block;
  }

  .shop_C_C_L {
    display: inline-block;
    width: 9%;
  }

  .shop_C_C_R {
    display: inline-block;
    width: 95%;
    padding-right: 4px;
  }

  .shop_C_C_list {
    margin: 5px 0;
    overflow: hidden;
    height: 22px;
    line-height: 22px;
  }

  .shop_C_C_list p:first-child {
    float: left;
  }

  .shop_C_C_list p:nth-child(2) {
    float: right;
  }

  .shop_C_C_list_input {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    padding: 0 8px;
    color: #fff;
  }

  .shop_C_F_list p {
    display: inline-block;
  }

  .shop_C_F_list p:nth-child(2) {
    float: right;
  }

  .inline_input >>> .vux-number-selector-sub {
    padding: 0;
  }

  .inline_input >>> .vux-number-selector-plus {
    padding: 0;
  }

  .inline_input >>> .vux-number-input {
    padding: 0;
    height: 20px;
    line-height: 20px;
  }

  .vux-header >>> .vux-header-back {
    color: #000;
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

  .imgClose {
    margin-right: 3vw;
    height: 6vh;
    line-height: 6vh;
    text-align: right;
  }

  .imgClose img {
    height: 5vh;
    transform: rotate(45deg);
  }

  .imgDiv {
    text-align: center;
    width: 100%;
    height: 68vh;
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

  .btn_wrap {
    width: 100vw;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 56px;
    z-index: 1001;
    height: 45px;
    line-height: 45px;
    background-color: #fff;
  }

  .btn_wrap div {
    display: inline-block;
  }

  .btn_wrap_show {
    width: 100vw;
  }

  .btn_L {
    width: 24%;
    font-size: 13px;
  }

  .btn_C {
    width: 45.5%;
    font-size: 15px;
    font-weight: bold;
    text-align: right;
  }

  .btn_R {
    float: right;
    right: 0;
    width: 27%;
    text-align: center;
    color: #fff;
  }

  .btn_R_delete {
    border: 1px solid #cacaca;
    color: #333;
    border-radius: 15px;
    padding: 5px 12px;
  }
</style>
