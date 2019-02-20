<template>
  <div id="layout" :style="bodyH">
    <div class="content" :style="contentH">
      <keep-alive :include="Include_Components">
        <router-view></router-view>
      </keep-alive>
    </div>
    <tabbar class="indexTabbar" v-if="this.$store.state.Tabbar">
      <tabbar-item link="/index">
        <img v-if="Selected==0?true:false" slot="icon" src="@/assets/img/index02.png" class="barImg">
        <img v-else slot="icon" src="@/assets/img/index01.png" class="barImg">
        <span v-if="Selected==0?true:false" slot="label" style="color: #00b2ff">买玻璃</span>
        <span v-else slot="label" style="color: #666">买玻璃</span>
      </tabbar-item>
      <tabbar-item link="/shop">
        <img v-if="Selected==1?true:false" slot="icon" src="@/assets/img/shop02.png" class="barImg">
        <img v-else slot="icon" src="@/assets/img/shop01.png" class="barImg">
        <span v-if="Selected==1?true:false" slot="label" style="color: #00b2ff">查工厂</span>
        <span v-else slot="label" style="color: #666">查工厂</span>
      </tabbar-item>
      <tabbar-item link="/car">
        <img v-if="Selected==2?true:false" slot="icon" src="@/assets/img/car02.png" class="barImg">
        <img v-else slot="icon" src="@/assets/img/car01.png" class="barImg">
        <span v-if="Selected==2?true:false" slot="label" style="color: #00b2ff">购物车</span>
        <span v-else slot="label" style="color: #666">购物车</span>
      </tabbar-item>
      <tabbar-item link="/center">
        <img v-if="Selected==3?true:false" slot="icon" src="@/assets/img/my02.png" class="barImg">
        <img v-else slot="icon" src="@/assets/img/my01.png" class="barImg">
        <span v-if="Selected==3?true:false" slot="label" style="color: #00b2ff">我的</span>
        <span v-else slot="label" style="color: #666">我的</span>
      </tabbar-item>
    </tabbar>
    <div class="productBottom vux-1px-t" v-else-if="this.$store.state.pruductbar">
      <router-link to="/shop">
        <div class="bardiv">
          <img slot="icon" src="@/assets/img/shop01.png" class="pImg">
          <p>工厂</p>
        </div>
      </router-link>
      <router-link to="/car">
        <div class="bardiv">
          <img slot="icon" src="@/assets/img/car01.png" class="pImg">
          <p>购物车</p>
          <badge :text="carNumber" v-if="carNumber>0" style="position: absolute;top: 2px;"></badge>
        </div>
      </router-link>

      <div class="bardiv bardiv2" @click="buyProduct">立即购买</div>
      <div class="bardiv bardiv2 bardiv3" @click="buyProduct">加入购物车</div>
    </div>
    <div class="in_img" v-if="this.$store.state.InImg">
      <div class="img_wrap">
        <div class="img" :style="{ backgroundImage:'url(' + imgURL + ')' }"></div>
      </div>
      <div class="in_img_txt" @click="noIMG">
        <p style="color: #fff">跳过广告</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Loading, Tabbar, TabbarItem, Badge} from 'vux';

  export default {
    name: 'layout',
    data () {
      return {
        showLoading: false,
        Selected: 0,
        loadText: '加载中...',
        carNumber: 0,
        imgURL: require('@/assets/img/indexImg.jpg'),
        Include_Components: ['Index'], // 缓存组件 根据name
        // Exclude_Components: ['Mysite', 'Addsite', 'Center', 'Mymessage'],//不缓存组件
        bodyH: {height: '100vh'},
        contentH: {height: 'calc(100vh - 58px)', backgroundColor: this.$store.state.contentBC}
      };
    },
    components: {
      Loading,
      Tabbar,
      TabbarItem,
      Badge
    },
    methods: {
      noIMG () {
        this.$store.commit('setInImg', false);
        sessionStorage.setItem('hideIMG', 'isHide');
      },
      buyProduct () {
        this.$store.commit('setPrudoctPopupShow', true);
      },
      getCarNumber () {
        this.$http.get('/car/count ').then(res => {
          this.carNumber = res.data.data;
          this.$store.commit('refreshcarFn', false);
        });
      }
    },
    computed: {},
    watch: {
      // 监听,当路由发生变化的时候执行
      $route (to, from) {
        if (`${to.path}`.includes('index')) {
          this.Selected = 0;
          // } else if (`${to.path}`.includes('menu')) {
        } else if (`${to.path}`.includes('shop')) {
          this.Selected = 1;
        } else if (`${to.path}`.includes('car')) {
          this.Selected = 2;
        } else if (`${to.path}`.includes('center')) {
          this.Selected = 3;
        }
      },
      '$store.state.contentBC': function () {
        this.contentH.backgroundColor = this.$store.state.contentBC;
      },
      '$store.state.refreshCar': function () {
        if (this.$store.state.refreshCar) {
          this.getCarNumber();
        }
      }
    },
    mounted () {
      let Nav = window.navigator.userAgent.toLowerCase();
      let isAndroid = `${Nav}`.includes('android');
      // let isIphone = `${Nav}`.includes('iphone');
      if (isAndroid) {
        let HEIGHT = document.documentElement.clientHeight || document.body.clientHeight;
        this.bodyH.height = HEIGHT + 'px';
        this.contentH.height = HEIGHT - 50 + 'px';
      }
      // this.getCarNumber();
    },
    beforeCreate () {
      let setHideIMG = sessionStorage.getItem('hideIMG');
      if (setHideIMG != 'isHide') {
        this.$http.get('home/loadPic').then(
          ({data}) => {
            if (data.code == '200') {
              this.$store.commit('setInImg', true);
              this.imgURL = data.data;
              let That = this;
              setTimeout(function () {
                That.$store.commit('setInImg', false);
                sessionStorage.setItem('hideIMG', 'isHide');
              }, 3000);
            }
          }
        );
      } else {
        this.$store.commit('setInImg', false);
        sessionStorage.setItem('hideIMG', 'isHide');
      }
    }
  };
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';

  #layout {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    background-color: #fff;
    position: relative;
    top: 0;
    left: 0;
  }

  .content {
    width: 100vw;
    overflow: scroll;
    /*background-color: #f7f7f7;*/
  }

  .productBottom {
    height: 58px;
    width: 100%;
    background: #fff
  }

  .bardiv {
    width: 18.5vw;
    height: 100%;
    border-right: 1px solid #c4c4c4;
    text-align: center;
    float: left;
    margin: -1px;
    position: relative;
  }

  .bardiv p {
    font-size: 13px
  }

  .bardiv2 {
    width: 32vw;
    line-height: 58px;
    font-size: 18px
  }

  .bardiv3 {
    border-right: none;
    background: #00b2ff;
    color: #fff
  }

  .menuImg {
    width: 50px;
  }

  .indexTabbar .weui-tabbar__icon {
    width: 32px !important;
    height: 32px !important;
  }

  .barImg {
    width: 84% !important;
    height: 84% !important;
    margin-top: 8%;
  }

  .pImg {
    width: 40% !important;
    height: 40% !important;
    margin-top: 8%;
    margin-bottom: 8px;
  }

  .vux-header .vux-header-left .left-arrow:before {
    border-width: 2px 0 0 2px !important;
  }

  .SitebtnWrap {
    width: 100vw;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 60px;
  }

  .in_img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1005;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
  }

  .img_wrap {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img {
    width: 100vw;
    height: 100vh;
    background-position: bottom center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .in_img .in_img_txt {
    position: absolute;
    top: 20px;
    right: 20px;
    font-weight: bold;
    padding: 8px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    letter-spacing: 1px;
    /*border: 1px solid #C7C7C7;*/
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.33);
  }

  .weui-tabbar {
    background-color: #fff !important;
  }
</style>
