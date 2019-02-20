<template>
  <div class="myCenter">
    <div class="CBack">
      <div class="iconContent">
        <div class="icon">
          <!-- <img src="@/assets/img/myIcon.png" alt="" class="icon01"> -->
          <div class="icon02">
            <img :src="imgUrl" alt="">
          </div>
        </div>
      </div>
      <div class="iconTxt" >
          <router-link to="/center/myinfo"  style="color:#fff">
          <p>{{nickName}} <span style="float:right;font-size:30px"> &gt; &nbsp;</span></p>
          </router-link>
        </div>
        <div class="CBack_box">
            <ul>
                <li>
                    <router-link  :to="{path:'/center/myorder',query:{orderStatus:0,index:0}}">
                    <img src="@/assets/img/center2.png" alt="">
                 <p>待付款</p>
                 </router-link>
                 </li>
                <li> <router-link  :to="{path:'/center/myorder',query:{orderStatus:1,index:1}}">
                    <img src="@/assets/img/center3.png" alt=""><p>待发货</p> </router-link>
                    </li>
                <li> <router-link  :to="{path:'/center/myorder',query:{orderStatus:2,index:2}}">
                    <img src="@/assets/img/center4.png" alt=""><p>待收货</p> </router-link>
                    </li>
                <li> <router-link  :to="{path:'/center/myorder',query:{orderStatus:6,index:3}}">
                    <img src="@/assets/img/center5.png" alt=""><p>待评价</p> </router-link>
                </li>
                <li> <router-link  :to="{path:'/center/myorder',query:{orderStatus:4,index:4}}">
                    <img src="@/assets/img/center1.png" alt=""><p>
                    已关闭</p> </router-link>
                    </li>
            </ul>
        </div>
    </div>
    <!--<div  class="cheep_titck">-->
    <!--当前可用优惠券 ： <span style="color:#ff0000;float: right;">￥ 0.00</span>-->
    <!--</div>-->
    <group class="Group" style="margin-top:13vw" >
      <!-- <cell title="个人中心" is-link link="/center/myinfo"></cell> -->
      <!-- <cell title="我的订单" is-link link="/center/myorder"></cell> -->
      <cell title="地址管理" is-link link="/center/mysite"></cell>
      <cell is-link link="/center/mymessage">
        <span slot="title"><span style="vertical-align:middle;">我的消息</span><badge :text="Badge" style="margin-left: 3px"
                                                                     v-if="Badge != null"></badge></span>
      </cell>
      <cell title="问题反馈" is-link link="/center/feedback"></cell>
      <cell title="推荐码" :value="Invitation"></cell>
    </group>
    <!--<div class="withs">-->
        <!--<img src="@/assets/img/withus.png" alt="">-->
    <!--</div>-->
  </div>
</template>

<script>
  import {Group, Cell, Badge} from 'vux';

  export default {
    name: 'Center',
    data () {
      return {
        Invitation: '',
        Badge: null,
        imgUrl: localStorage.getItem('wxHeadImgUrl'),
        nickName: localStorage.getItem('wxNickName')
      };
    },
    components: {
      Group,
      Cell,
      Badge
    },
    mounted () {
      this.$http.get('/user/info').then(
        ({data}) => {
          if (data.code == 200) {
            let isBage = data.data.msgNumber;
            if (isBage != '0') {
              this.Badge = isBage;
            }
            this.Invitation = data.data.shareCode;
          }
        }
      );
    }
  };
  /*   titleList: [{name: '待付款', orderStatus: 0}, {name: '待发货', orderStatus: 1}, {
          name: '待收货',
          orderStatus: 2
        }, {name: '已完成', orderStatus: 6}, {name: '已关闭', orderStatus: 4}], */
</script>

<style scoped>
  .myCenter {
    width: 100vw;
  }

  .CBack {
   background: linear-gradient(-90deg, #00b2ff, #179fd8);
    height: 25vh;
    width: 100vw;
    text-align: center;
    position: relative;
    top: 0;
    left: 0;
  }
.CBack_box{    position: absolute;
    width: 86vw;
    height: 23vw;
    background: #fff;
    bottom: -11vw;
    left: 7vw;}
    .CBack_box ul li{ width: 20%;float: left; text-align: center; height: 9vw;padding: 7vw 0;font-size:11px;}
     .CBack_box ul li p { line-height: 7vw}
    .CBack_box ul li img{  height: 5vw;width: 5vw;}
    .cheep_titck{ width: 82vw; height: 8vw; margin: 0 auto; background: #fff;margin-top: 13vw;line-height: 8vw;padding: 0 2vw;color:#333}
  .iconContent {
    position: absolute;
    top: 34%;
    left: 17vw;;
    transform: translate(-50%, -50%);
    display: inline-block;
    text-align: center;
  }
.withs{ width: 100vw;margin-top:3vw}
.withs img{width: 100vw; }
  .icon {
    width: 11vh;
    height: 11vh;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;
  }

  .icon01 {
    position: absolute;
    top: 0;
    left: 0;
    width: 11vh;
    height: 11vh;
    z-index: 10;
  }

  .icon02 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 9.8vh;
    height: 9.8vh;
    z-index: 9;
  }

  .icon02 img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #fff
  }

  .iconTxt {
    font-size: 16px;
    letter-spacing: 2px;
    text-align: center;
   height: 31vw;
    line-height: 31vw;
  }

  .Group >>> .weui-cells {
    margin-top: 5px;
  }
</style>
