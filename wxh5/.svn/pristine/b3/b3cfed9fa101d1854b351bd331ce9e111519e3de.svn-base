<template>
  <div class="menu">
    <x-header title="开始下单" :left-options="{backText: '首页',preventGoBack:true}" @on-click-back="goIndex"
              class="header vux-1px-b"></x-header>
    <div v-if="Slist.length>0" class="select_H vux-1px-t" ref="SelectC">
      <div class="select_H_content">
        <p>{{Slist.join('-')}}</p>
      </div>
    </div>
    <div class="select" :style="upMtop">
      <!--1-->
      <div class="select_list vux-1px-b">
        <p class="select_list_p">选择一级分类</p>
        <div class="box">
          <checker class="box_wrap" type="radio" default-item-class="default_style"
                   selected-item-class="selected_style" v-model="Scategory" radio-required>
            <checker-item :value="item.id" class="box_item" v-for="(item,index) in Bcategory" :key="index"
                          @on-item-click="getType(item.id,item.goodsTypeName)">{{item.goodsTypeName}}
            </checker-item>
          </checker>
        </div>
      </div>
      <!--2-->
      <div class="select_list vux-1px-b">
        <p class="select_list_p">选择二级分类</p>
        <div class="box">
          <checker class="box_wrap" type="radio" default-item-class="default_style"
                   selected-item-class="selected_style" v-model="Stype" radio-required>
            <checker-item :value="item.id" class="box_item" v-for="(item,index) in Btype" :key="index"
                          @on-item-click="getLayer(item.id,item.goodsTypeName)">{{item.goodsTypeName}}
            </checker-item>
          </checker>
        </div>
      </div>
      <!--3-->
      <div class="select_list vux-1px-b">
        <p class="select_list_p">选择三级分类</p>
        <div class="box">
          <checker class="box_wrap" type="radio" default-item-class="default_style"
                   selected-item-class="selected_style" v-model="Slayer" radio-required>
            <checker-item :value="item.id" class="box_item" v-for="(item,index) in Blayer"
                          @on-item-click="getName(item.goodsTypeName,item.id)" :key="index">
              {{item.goodsTypeName}}
            </checker-item>
          </checker>
        </div>
      </div>
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
        <!--<x-button class="btn">选择型号<em style=" font-weight: bold;">>></em></x-button>-->
        <x-button class="btn" @click.native="turnPage">选择型号<em style=" font-weight: bold;">>></em></x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Checker, CheckerItem} from 'vux'

  export default {
    name: "Menu",
    data() {
      return {
        Bcategory: [],
        Scategory: '',
        Btype: [],
        Stype: '',
        Blayer: [],
        Slayer: "", //层数
        SlayerName: '',
        arr: [],
        getData: '',
        Slist: [],//显示选择
        upMtop: {
          paddingTop: 48 + 'px',
        },
        isTipShow: true,
        storeCount: 0
      }
    },
    components: {
      XHeader,
      XButton,
      Checker,
      CheckerItem,
    },
    methods: {
      getCategory() {
        this.$http.get('/goods/type').then(
          ({data}) => {
            if (data.code == '200') {
              this.Bcategory = data.data.list;
              this.storeCount = data.data.storeCount;
              let type = this.$route.params.type;
              this.getType(data.data.list[0].id);
              this.Scategory = '';
            }
          })
      },
      getType(itemId, itemValue) {
        if (itemValue != undefined) {
          this.Slist = [];
          this.Slist[0] = itemValue;
          this.addH()
        }
        this.$http.get('/goods/type?parentId=' + itemId).then(
          ({data}) => {
            if (data.code == '200') {
              this.Btype = data.data.list;
              this.getLayer(data.data.list[0].id);
              this.Stype = '';
            }
          })
      },
      getLayer(itemId, itemValue) {
        if (itemValue != undefined) {
          this.Slist[1] = itemValue;
          this.Slist.splice(2, 1);
          this.addH()
        }
        this.$http.get('/goods/type?parentId=' + itemId).then(
          ({data}) => {
            if (data.code == '200') {
              this.Blayer = data.data.list;
              this.Slayer = '';
            }
          })
      },
      getName(v,identify) {
        this.SlayerName = v;
        this.Slist[2] = v;
        this.addH();
        this.getStoreCount(identify)
      },
      getStoreCount(id){
        // this.storeCount
        this.$http.get('/store/getStoreCount?goodsTypeId='+ id).then(
          ({data}) => {
            if (data.code == '200') {
              this.storeCount = data.data
            }
          })
      },
      addH() {
        let that = this;
        setTimeout(function () {
          that.upMtop.paddingTop = that.$refs.SelectC.clientHeight + 52 + 'px';
        }, 10);
      },
      tipShow() {
        if (this.isTipShow) {
          this.isTipShow = false
        } else {
          this.isTipShow = true
        }
      },
      turnPage() {
        let otherId = [this.Scategory, this.Stype];
        let pushData = {
          'id': this.Slayer,
          'name': this.SlayerName,
          'others': otherId,
          'othersName': this.Slist,
          'storeCount': this.storeCount
        };
        if (this.Scategory != '' && this.Stype != '' && this.Slayer != '') {
          this.$vux.loading.show();
          this.$router.push({name: 'Menu/Mattr', params: pushData});
        } else {
          this.$vux.toast.text('请选择所有分类', 'center')
        }
      },
      goIndex() {
        this.$router.replace('/index');
        this.$store.commit('setContentBC', '#f7f7f7');
      }
    },
    computed: {},
    mounted() {
      this.$store.commit('setContentBC', '#fff');
      // this.$store.state.UpShopData
      let TYPE = this.$route.params.type;
      let dataExit = this.$store.state.UpShopData.length;
      if (dataExit != '0' && TYPE != 'back') {
        // this.getCategory()
        this.$router.push({name: 'Menu/Mspec', params: {type: 'forward'}});
      } else {
        this.getCategory()
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
    /*border-radius: 5px;*/
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
  }

  .select_list_p {
    margin: 5px 0 10px;
    color: #666;
  }

  .btn_wrap {
    width: 100vw;
    text-align: center;
    overflow: hidden;
    /*background-color: #efefef;*/
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1001;
    height: 58px;
    line-height: 58px;
    background-color: #fff;
  }

  .btn_wrap_div {
    /*margin-top: 10px;*/
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
    /*display: inline-block;*/
    margin-left: 80%;
    width: 0;
    height: 0;
    border-top: 10px solid #f2f2f2;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
</style>
