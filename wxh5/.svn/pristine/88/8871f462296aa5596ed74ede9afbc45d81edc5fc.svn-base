<template>
  <div class='q_box'>
    <div class="q_header">
      <flexbox>
        <flexbox-item :span="10">
          <div class="q_header_demo q_header_demoborder">
            <div class="q_header_seach" @click="search()">
              <icon type="search" style="font-size:22px;line-height: 6vw;"></icon>
            </div>
            <div class="q_header_input">
              <input type="text" v-model.trim="seachName"  @keyup.13="search()">
            </div>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="q_header_demo q_header_demo_img">
            <!-- 若后台有推送消息! 图片更换-->
            <router-link to="/center/mymessage">   <img src="@/assets/img/message.png" style="height: 7vw;  width: 8vw;"></router-link>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="q_nav" id="searchBar">
      <scroller lock-y :scrollbar-x=false>
        <div class="box1" :style="{width: dataSize + 'px'}">
          <!-- ,left:dataLeft+'px' -->
          <!-- ,left:'-100px' lightArr.includes(index.goodsTypeName) -->
          <div class="box1-item nav_box" v-for="(index,val) in allGoodsType" :key="val"
               :class="{allGoodsTypeActive:lightArr.includes(index.goodsTypeName)}"
               @click="selectAllGoodsType(index.goodsTypeName,index.id,index.goodsTypeName)"><span>{{index.goodsTypeName}}</span>
          </div>
        </div>
        <div class="q_nav_more" @click="showMoreInfo">
          <img src="@/assets/img/three.png">
        </div>
      </scroller>
    </div>
    <swiper :list="imgData" loop auto :show-desc-mask="false" :aspect-ratio="300/700" :interval="2000" :duration="800"
            class="Swiper01"></swiper>
    <flexbox :gutter="2" class="banner" style="text-align:center">
      <flexbox-item v-for="(item,index) in bannerIMG" :key="index">
        <img :src="item.img" class="bannerStyle">
      </flexbox-item>
    </flexbox>
    <div class="Factories">
      <div class="Fheader">
        <p>
          合肥·为您推荐
        </p>
      </div>
      <ul class="Fcontent">
        <li v-for="(item,index) in reCommendList" :key="index">
          <div @click="turnPage(item.id,item.shopId)">
            <div class="Fcontent_top">
              <img :src="item.picUrl" alt="">
            </div>
            <div class="Fcontent_name">
              <span class="Fcontent_name_span" v-if="item.ordered==1">买过</span>
              {{item.goodsName}}
            </div>
            <div class="Fcontent_name">
              <span style="color:#ff0000;font-size:18px">  ¥  {{parseInt(item.salePrice)}}</span>
              <span style="font-size:12px;color:#acacac;margin-left:10px" v-if="item.orderAmount===null">0人购买</span>
              <span style="font-size:12px;color:#acacac;margin-left:10px" v-else>{{item.orderAmount}} 人已付款</span>
            </div>
            <div class="Fcontent_name Fcontent_name2">
              <span class="Fcontent_name_cycle">{{parseInt(item.cycle)+1}}天内发货</span>
              <span class="Fcontent_name_cycle Fcontent_name_distance">{{item.distance}}km</span>
            </div>
            <div class="Fcontent_name Fcontent_name2" style="color:#acacac;font-size:13px">
              {{item.shopName}} >
            </div>
          </div>
        </li>
        <x-button style="width:97%" :gradients="['#1D62F0', '#19D5FD']" @click.native="lookMoreGlass"
                  v-if="pageIndex<=allPageIndex">查看更多
          <loading :show="loadingShow" :text="loadingShowText"></loading>
        </x-button>
      </ul>
    </div>
    <divider v-if="pageIndex>=allPageIndex">我是有底线的</divider>
    <div class="popus" v-show="meunModal">
      <div class="popus_left">
        <div class="popus_left_first">所有分类</div>
        <div class="popus_left_list">
          <ul>
            <li v-for="(index,val) in glassName" :key="val" :class="{glassNameActive:val==glassNameIndex}"
                @click="exchangeIndex(val)">{{index.goodsTypeName}}
            </li>
          </ul>
        </div>
      </div>
      <div class="popus_right">
        <div class="popus_right_top" @click="meunModalHide">
          x
        </div>
        <div class="popus_right_lsit">
          <ul>
            <li v-for="(ind,val) in glassNameDetail" :key="val"
                :class="{popus_right_lsit_active:val==glassNameDetailIndex}"
                @click="exchangeGlassDetail(val,ind.goodsTypeName,ind.id,ind.goodsTypeName)">{{ind.goodsTypeName}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-link to="/menu">
      <div class="btn_wrap">
        <div class="btn_wrap_L">
          <img src="@/assets/img/feng.png" alt="">
          <p style="display: inline-block">直接下单,快速比价</p>
        </div>
        <div class="btn_wrap_R">
          去下单 >
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import {
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    PopupRadio,
    Divider,
    Icon,
    XButton,
    Scroller,
    Loading
  } from 'vux';
  import wx from 'weixin-js-sdk';
  import qs from 'qs';
  export default {
    name: 'Index',
    data () {
      return {
        imgData: [],
        loadingShow: false,
        loadingShowText: '数据加载中....',
        lightArr: ['推荐'],
        childId: false, // 判断是不是要走分类的按钮
        childIdType: '', // 获取子分类id
        searchId: false,
        dataSize: 10000,
        // dataLeft: 0,
        pageIndex: 1,
        allPageIndex: '',
        allGoodsType: [],
        allGoodsTypeIndex: 0,
        glassNameIndex: 0,
        meunModal: false,
        glassName: [],
        glassNameDetail: [],
        glassNameDetailIndex: -1,
        seachName: '',
        GGimg: require('@/assets/img/adIMG.png'),
        bannerIMG: [{
          img: require('@/assets/img/bannerL.png')
        },
        {
          img: require('@/assets/img/bannerM.png')
        },
        {
          img: require('@/assets/img/bannerR.png')
        }
        ],
        FData: [{
          img: require('@/assets/img/Logo.png')
        },
        {
          img: require('@/assets/img/Logo.png')
        }
        ],
        reCommendList: []
      };
    },
    components: {
      Swiper,
      SwiperItem,
      Flexbox,
      FlexboxItem,
      Divider,
      Icon,
      PopupRadio,
      Scroller,
      XButton,
      Loading
    },
    methods: {
      search (page = 1) {
        this.searchId = true;
        this.$http.get('/goodsType/goodsList?searchParam=' + this.seachName + '&lng=116.481499&lat=39.990475' + '&page=' + page).then(({data}) => {
          //  this.reCommendList = []
          this.reCommendList = (data.data.list);
          this.allPageIndex = data.data.pages;
          console.log(this.reCommendList);
        });
      },
      getallGoodsType () {
        this.$http.get('/goodsType/childGoodsType').then(({data}) => {
          this.dataSize = Number(data.data.length + 1) * 75;
          this.allGoodsType = data.data;
        });
      },
      selectAllGoodsType (e, id, name) {
        // 高亮处理
        this.reCommendList = [];
        this.searchId = false;
        this.pageIndex = 1;
        this.childIdType = id;
        if (this.lightArr.length == 0) {
          this.lightArr.push(e);
        } else {
          this.lightArr.splice(0, 1, e);
        }
        // 数据处理
        if (name == '推荐') {
          this.childId = false;
          this.getRecommend(1, 1);
        } else {
          this.childId = true;
          this.getRecommend(this.pageIndex, 2, id);
        }
      },
      // 详细菜单点击事件
      exchangeGlassDetail (e, v, id, name) {
        this.glassNameDetailIndex = e;
        if (this.lightArr.length == 0) {
          this.lightArr.push(v);
        } else {
          this.lightArr.splice(0, 1, v);
        }
        this.meunModal = false;
        this.searchId = false;
        this.selectAllGoodsType(v, id, name);
      },
      exchangeIndex (e) {
        this.glassNameIndex = e;
        this.glassNameDetailIndex = -1; // 回到初始状态
        this.glassNameDetail = this.glassName[e].goodsChildTypeVos;
      },
      showMoreInfo () {
        this.meunModal = true;
        this.$http.get('/goodsType/allGoodsType').then((data) => {
          this.glassName = data.data.data;
          this.glassNameDetail = data.data.data[0].goodsChildTypeVos;
        });
      },
      meunModalHide () {
        this.meunModal = false;
        this.glassNameIndex = 0;
        this.glassNameDetailIndex = -1;
      },
      getRecommend (e, v, id, name) {
        if (v == 2) {
          // 选择子分类后的分页事件
          this.$http.get('/goodsType/goodsList?id=' + id + '&page=' + e + '&lng=116.481499&lat=39.990475').then(({data}) => {
            this.reCommendList = this.reCommendList.concat(data.data.list);
            this.allPageIndex = data.data.pages;
            this.pageIndex = this.pageIndex + 1;
          });
        } else if (v == 1) {
          // 此处是刚进来的 分页 事件
          this.loadingShow = true;
          this.pageIndex = this.pageIndex + 1;
          let _data = {
            page: e
          };
          this.$http.post('/home/recommendGoods', qs.stringify(_data)).then(
            ({data}) => {
              let res = data;
              if (res.code == 200) {
                this.loadingShow = false;
                this.reCommendList = this.reCommendList.concat(data.data.list);
                this.allPageIndex = data.data.pages;
                this.pageIndex = this.pageIndex + 1;
              }
            }
          );
        } else if (v == 3) {
          this.search(this.pageIndex);
        }
      },
      lookMoreGlass () {
        if (this.childId) {
          // 走分类的接口
          this.getRecommend(this.pageIndex, 2, this.childIdType);
        } else if (this.searchId) {
          this.getRecommend(this.pageIndex, 3, '', this.seachName);
        } else {
          // 走推荐的接口
          this.getRecommend(this.pageIndex, 1);
        }
      },
      getImg () {
        this.$http.get('/home/pic').then(
          ({data}) => {
            let res = data;
            if (res.code == 200) {
              this.GGimg = res.data.GG[0].picUrl;
              this.imgData = res.data.LB.map((value, index, arr) => {
                return {
                  img: value.picUrl
                };
              });
            }
          }
        );
      },
      getLocation () {
        let THAT = this;
        let URL = {'url': window.location.href};
        this.$http.post('/valida/getJsTicket', qs.stringify(URL)).then(({data}) => {
          if (data.code == '200') {
            wx.config({
              debug: false, // 开启调试模式,
              appId: data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
              timestamp: data.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
              signature: data.data.signature, // 必填，签名，见附录1
              jsApiList: ['getLocation', 'openLocation']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
              wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  sessionStorage.setItem('wxLat', res.latitude);// 纬度，浮点数，范围为90 ~ -90
                  sessionStorage.setItem('wxLng', res.longitude);// 经度，浮点数，范围为180 ~ -180。
                },
                cancel: function () {
                  THAT.$vux.toast.show({
                    text: '请同意获取您的位置',
                    position: 'center',
                    type: 'text',
                    width: '12em',
                    time: '2000'
                  });
                  setTimeout(function () {
                    THAT.getLocation();
                  }, 2000);
                }
              });
            });
          }
        });
      },
      //跳转页面
      turnPage(ids,shopIds){
        this.$store.commit('refreshcarFn', true);
        this.$router.push({path:'/productdetail',query:{spuId:ids,shopId:shopIds}})
      }
    },
    mounted () {
      this.getRecommend(1, 1);
      this.getallGoodsType();
      this.getImg();
    },
    created () {
      this.getLocation();
    }
  };
</script>
<style scoped>
  .q_header {
    width: 96vw;
    height: 6vw;
    margin: 3vw auto;
  }

  /* 高亮*/
  .glassNameActive {
    color: #ff6407
  }

  .allGoodsTypeActive {
    border-bottom: 2px solid #00b2ff;
    color: #00b2ff;
  }

  .popus_right_lsit_active {
    border: 1px solid #ff6407 !important
  }


  .q_box {
    position: relative;
    margin-bottom: 60px;
  }

  .popus {
    position: absolute;
    width: 100%;
    height: auto;
    background: #f7f7f7;
    top: 7vw;
    padding-bottom: 5vw
  }

  .popus_left {
    width: 30vw;
    height: 100%;
    background: #fff;
    float: left;;
    text-align: center;
    line-height: 10vw
  }

  .popus_left_first {
    width: 30vw;
    height: 10vw;
    border-radius: 6vw 0 0 0;
    background: #f7f7f7;
  }

  .popus_left_list {
    width: 30vw;
    height: auto;
    line-height: 12vw
  }

  .popus_left_list ul li {
    width: 30vw;
    height: 12vw;
  }

  .popus_right {
    width: 68vw;
    height: 100%;
    float: left;
    background: #f7f7f7
  }

  .popus_right_top {
    width: 10vw;
    height: 10vw;
    float: right;
    line-height: 10vw;
    font-size: 25px;
    text-align: center;
    font-weight: 400
  }

  .popus_right_lsit {
    width: 68vw;
    height: auto;
    float: right;
  }

  .popus_right_lsit ul li {
    padding: 8px 10px;
    border: 1px solid #f4f4f4;
    background: #fff;
    border-radius: 1vw;
    float: left;
    margin-left: 1vw;
    font-size: 14px;;
    margin-bottom: 1vw;;
  }


  .q_header_demo {
    height: 8vw;
    line-height: 8vw;
  }

  .q_header_demoborder {
    background: #fff;
    border-radius: 2vw
  }

  .q_header_input {
    width: 64vw;
    height: 8vw;;
    float: left;;
    border-radius: 2vw
  }

  .q_header_seach {
    width: 12vw;;
    height: 6vw;
    float: left;
    text-align: center;
  }

  .q_header_input input {
    width: 100%;
    height: 8vw;
    text-indent: 0px;
    border-radius: 2vw;
  }

  .q_header_demo_img {
    text-align: center;
    vertical-align: middle
  }

  .q_nav {
    width: 98%;
    height: 9vw;
    line-height: 8vw;
    position: relative;
    margin-top: 4vw;
  }

  .q_nav_more {
    position: absolute;
    width: 6vw;
    height: 6vw;
    right: 0;
    top: 0.5vw;
    background: #efefef;
    text-align: center;
    line-height: 6vw;
    box-shadow: 2px 0px 0px 0px #e0d2d2  inset;
  }
.q_nav_more img{
     width: 100%;height: 100%
}
  .nav_box {
    float: left;
    height: 8vw;
    text-align: center;
    padding: 0 2px;
    width: 75px;
    overflow: hidden;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .box1 {
    position: relative;
  }

  .bannerStyle {
    width: 60%;
    height: auto;
    padding: 12px 0 10px 0px;
  }

  .banner {
    margin-top: 5px;

  }

  .adIMG {
    width: 100%;
    height: auto;
    text-align: center;
    margin: 6px auto;
  }

  .adIMG img {
    display: inline-block;
    width: 96%;
    height: 100%;
  }

  .Factories {
    font-size: 13px;
    width: 100vw;
    margin-bottom: 15px;
  }

  .Fheader p {
    padding: 10px 0 20px;
    text-align: center;
    color: #333;
    font-weight: 400;
    letter-spacing: 2px;
  }

  .Fcontent {
    height: auto;
    width: auto;
    overflow: hidden;
  }

  .Fcontent li {
    overflow: hidden;
    float: left;
    width: 48vw;
    margin-left: 1vw;
    margin-bottom: 1.5vw;
    background: #fff;
    border-radius: 5px;
  }

  .Fcontent_top {
    width: 40vw;
    height: 30vw;
    margin: 4vw auto;
  }

  .Fcontent_name {
    width: 86%;
    margin: 0 auto;
    height: 7vw;
    line-height: 7vw;;
    overflow: hidden;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .Fcontent_name2 {
    height: 6vw;
    line-height: 5vw;
    margin-top: 1vw;
  }

  .Fcontent_name_span {
    padding: 2px 3px;
    text-align: center;
    background: #00b2ff;
    color: #fff;
    font-size: 12px;
    border-radius: 3px;
  }

  .Fcontent_top img {
    width: 40vw;
    height: 30vw;
  }

  .Fcontent_name_cycle {
    display: inline-block;
    padding: 0 2vw;;
    height: 5vw;
    text-align: center;
    border: 1px solid #ff0000;
    color: #ff0000;
    border-radius: 5px
  }

  .Fcontent_name_distance {
    border: 1px solid #00b2ff;;
    color: #00b2ff;
  }

  .liL {
    display: inline-block;
    float: left;
    height: 32vw;
    width: 32vw;
    text-align: center;
  }

  .liLC {
    width: 28vw;
    height: 28vw;
    line-height: 28vw;
    margin: 2vw auto;
    box-shadow: 0px 3px 6px #eee;
  }

  .liLC img {
    display: inline-block;
    width: 90%;
    height: auto;
  }

  .liR {
    display: table;
    float: left;
    height: 32vw;
    width: 64vw;
  }

  .liRC {
    display: table-cell;
    vertical-align: middle;
    width: 64vw;
  }

  .liRC p {
    display: inline-block;
    width: 64vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    padding: 5px 0;
    color: #999999;
  }

  .btn_wrap {
    position: fixed;
    left: 0;
    bottom: 75px;
    background-color: #00b2ff;
    padding: 12px 15px;
    width: 80vw;
    border-radius: 10vw;
    margin-left: 12vw;
    box-sizing: border-box;
    color: #fff;
    overflow: hidden;
    font-size: 15px;
    display: flex;
    align-items: center;
  }

  .btn_wrap_L, .btn_wrap_R {
    display: inline-block;
  }

  .btn_wrap_L {
    width: 70%;
    display: flex;
    align-items: center;
  }

  .btn_wrap_L img {
    width: 5vw;
    height: 5vw;
    margin-right: 3px;
  }

  .btn_wrap_R {
    width: 28%;
    text-align: right;
  }


</style>
