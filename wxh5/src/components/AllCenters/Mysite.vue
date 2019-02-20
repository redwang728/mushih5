<template>
  <div class="mysite">
    <x-header title="收货地址管理" :left-options="{backText: ''}" class="header"></x-header>
    <ul class="Ul" v-if="siteList !=null && siteList.length >0">
      <li class="Li vux-1px-b" v-for="(item, index) in siteList" :key="index">
        <router-link :to="{path:'/center/addsite',query:{AllData:item}}">
          <div class="LiLeft">
            <em>{{item.userName}}</em>
            <em>{{item.phone}}</em>
            <div><p class="defaultSite" v-if="item.isDefault == 1">默认</p>{{item.addressName.join('')}}
              {{item.address}}
            </div>
          </div>
          <div class="LiRight">
            <my-editor class="LiRightContent"/>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="noData" v-else>暂无数据</div>
    <div class="SitebtnWrap">
      <router-link :to="{path:'/center/addsite',query:''}">
        <x-button :gradients="['#1D62F0', '#19D5FD']" class="btn">添加地址</x-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton} from 'vux'
  import MyEditor from '../Public/Myeditor'

  export default {
    name: "Mysite",
    data() {
      return {
        siteList: []
      }
    },
    components: {
      XHeader,
      XButton,
      MyEditor
    },
    mounted() {
      this.$http.get('/user/address/addressInfo').then(
        //538134ca55b343c6ac32350a8dc0cf10
        //71e6f93d5fb7489bb84ef66c10cea4d9
        ({data}) => {
          let res = data;
          if (res.code == 200) {
            this.siteList = res.data.filter((value, index, arr) => {
              value.addressName = value.addressName.split('-');
              return value
            });
          }
        }
      )
    }
  }
</script>

<style scoped>
  .mysite {
    width: 100vw;
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

  .Ul {
    margin-top: 46px;
    margin-bottom: 60px;
    width: 100vw;
    background-color: #fff;
    z-index: 9;
  }

  .Li {
    height: 8vh;
    width: 96vw;
    padding: 1vh 2vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: Center;
  }

  .Li a {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: Center;
  }

  .LiLeft {
    width: 88%;
    display: inline-block;
  }

  .LiLeft em:first-child {
    font-weight: bold;
    font-size: 19px;
  }

  .LiLeft em:nth-child(2) {
    display: inline-block;
    margin-left: 3vw;
    font-weight: bold;
    color: #2cc051;
  }

  .LiLeft div {
    font-size: 15px;
    width: 96%;
    margin-top: 1vh;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .LiRight {
    width: 10%;
    display: inline-block;
  }

  .LiRightContent {
    height: 3.3vh;
    width: 3.3vh;
  }

  .btn {
    display: inline-block;
    width: 60%;
    margin: 10px 0;
    border-radius: 20px;
  }

  .defaultSite {
    color: #ff0000;
    background-color: rgba(244, 80, 0, 0.4);
    font-size: 14px !important;
    padding: 2px 3px;
    display: inline-block;
    margin-right: 5px;
  }
</style>
