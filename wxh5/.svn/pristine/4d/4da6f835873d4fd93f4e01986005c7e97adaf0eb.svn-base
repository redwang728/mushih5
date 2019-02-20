<template>
  <div class="menu">
    <x-header title="下单(2/3)" :left-options="{backText: '首页',preventGoBack:true}" @on-click-back="goIndex"
              class="header vux-1px-b"></x-header>
    <!--0-->
    <div class="select_H vux-1px-t" ref="SelectC">
      <div class="select_H_content">
        <p>{{Slist.join('-')}}</p>
        <p v-show="Sattr.length>0" style="margin-top: 5px">{{Sattr.join('+')}}</p>
      </div>
    </div>
    <div class="select" :style="upMtop">
      <!--1-->
      <div class="select_list vux-1px-b" v-for="(item,index) in Battr" :key="index">
        <p class="select_list_p">{{item.attName}}</p>
        <div class="box">
          <checker class="box_wrap" type="radio" default-item-class="default_style"
                   selected-item-class="selected_style" @on-change="addH()" radio-required v-model="Sattr[index]">
            <checker-item class="box_item" v-for="(items,indexs) in item.attValList" :value="items" :key="indexs"
            >{{items}}
            </checker-item>
          </checker>
        </div>
      </div>
      <!--<div style="margin-bottom: 65px"></div>-->
    </div>
    <div class="btn_tip" @click="tipShow" v-if="isTipShow">
      <div class="btn_tip_content">
        当前有<em style="color: #00b2ff">{{storeCount}}</em>家工厂参与比价
      </div>
      <div class="arrow_down"></div>
    </div>
    <!--btn-->
    <div class="btn_wrap vux-1px-t">
      <div class="btn_wrap_div">
        <x-button class="btn" @click.native="turnPage">选择规格<em style=" font-weight: bold;">>></em></x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Checker, CheckerItem,} from 'vux'

  export default {
    name: "Mattr",
    data() {
      return {
        Battr: [],
        Sattr: [undefined],
        goodsTypeId: '',
        goodsName: '',
        otherId: [],
        Slist: [],
        upMtop: {
          paddingTop: 76 + 'px',
        },
        storeCount: 0,
        isTipShow: true,
      }
    },
    components: {
      XHeader,
      XButton,
      Checker,
      CheckerItem,
    },
    methods: {
      tipShow() {
        if (this.isTipShow) {
          this.isTipShow = false
        } else {
          this.isTipShow = true
        }
      },
      addH() {
        let that = this;
        setTimeout(function () {
          that.upMtop.paddingTop = that.$refs.SelectC.clientHeight + 52 + 'px';
        }, 10);
        if (this.Sattr.length==this.Battr.length&&!this.Sattr.includes(undefined)) {
          this.$http.get('/store/getStoreCount', {params: {goodsTypeId: this.goodsTypeId, skuStr: this.Sattr.join('+')}}).then(
            ({data}) => {
              if (data.code == '200') {
                this.storeCount = data.data;
                if (data.data == '0'){
                  this.$vux.toast.show({
                    text: '<p>此类玻璃暂无</p><br/><p>商家进行售卖</p>',
                    position: 'center',
                    type: 'warn',
                    width: '9em',
                    time: '3000'
                  });
                }
              }
            })
        }
      },
      turnPage() {
        if (this.Sattr.length == this.Battr.length && !this.Sattr.includes(undefined)) {
          this.$vux.loading.show();
          let attrStr;
          if (this.Sattr.length > 1) {
            attrStr = this.Sattr.join('+')
          } else {
            attrStr = this.Sattr.join('')
          }
          //commit数据
          let commitData = {
            goodsParam: {
              skuStr: attrStr,
              goodsTypeId: this.goodsTypeId,
              goodsName: this.goodsName,
              otherId: this.otherId,
              otherName: this.Slist
            },
            list: [{
              length: '',
              width: '',
              hole: 0,
              top: 0,
              amount: 1,
              customno: '',
              imgurl: '',
              isChoose: false,
              isUpdata: 'xie'
            }]
          }
          this.$store.commit('setUpShopData', commitData);
          // console.log(this.$store.state.UpShopData)
          this.$router.push({name: 'Menu/Mspec', params: {type: 'forward'}});
        } else {
          this.$vux.toast.text('请选择所有属性', 'center')
        }
      },
      goIndex() {
        this.$router.replace('/index');
        this.$store.commit('setContentBC', '#f7f7f7');
      }
    },
    mounted() {
      this.$store.commit('setContentBC', '#fff');
      let ids = this.$route.params.id;
      if (ids != null && ids != undefined && ids != '') {
        this.goodsTypeId = this.$route.params.id;
        this.goodsName = this.$route.params.name;
        this.otherId = this.$route.params.others;
        this.Slist = this.$route.params.othersName;
        this.storeCount = this.$route.params.storeCount;
        setTimeout(() => {
          this.$vux.loading.hide();
        }, 400);
        this.$http.get('/goods/typeAtt?goodsTypeId=' + this.goodsTypeId).then(
          ({data}) => {
            if (data.code == '200') {
              this.Battr = data.data;
              this.addH();
            }
          })
      } else {
        this.$router.back(-1);
      }
    },
    destroy() {
      this.$store.commit('setContentBC', '#f7f7f7');
    }
  }
</script>

<style scoped>
  .menu {
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

  .select {
    width: 100vw;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 60px;
  }

  .select_H {
    position: absolute;
    top: 46px;
    left: 0;
    width: 100vw;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 11;
    font-size: 14px;
  }

  .select_H_content {
    background-color: #00b2ff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin: 0 auto;
    color: #fff;
    padding: 10px;
    box-shadow: 0px 2px 6px #8a9298;
  }

  .box {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 5px;
  }

  .box_item {
    background-color: #f2f2f2;
    display: inline-block;
    margin: 0 5px 8px 0;
    text-align: center;
    /*border-radius: 6px;*/
    padding: 5px 15px;
    color: #000;
    height: 20px;
    line-height: 20px;
  }

  .default_style {
    border: 1px solid #fff;
  }

  .selected_style {
    border: 1px solid #ff6407;
    color: #ff6407;
    background-color: #fff;
  }

  .select_list {
    padding: 10px;
    background-color: #fff;
  }

  .select_list_p {
    margin: 5px 0 10px;
    color: #666;
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

  .btn {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    letter-spacing: 3px;
    background-color: #00b2ff;
    color: #fff;
  }

  .btn_tip {
    position: absolute;
    right: 10px;
    bottom: 60px;
    box-sizing: border-box;
  }

  .btn_tip_content {
    background-color: #f2f2f2;
    color: #666;
    font-size: 15px;
    display: inline-block;
    padding: 13px 8px;
  }

  .arrow_down {
    margin-left: 80%;
    width: 0;
    height: 0;
    border-top: 10px solid #f2f2f2;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }

</style>
