<template>
  <div class="myRegister">
    <x-header title="个人中心" :left-options="{backText: ''}" class="header"></x-header>
    <group class="register_input">
      <!-- <x-input title="登录名称" v-if="wx!=1" placeholder="修改登录名" text-align="right" :is-type="isValidName"
               v-model="loginName"
               @on-blur="validName" ref="loginName"></x-input>
      <cell title="登录名称" v-else :value="loginName"></cell> -->
      <!--<cell title="手机号码" :value="phone" is-link :link="{name:'Center/Myphone',params:{Phone:phone}}"></cell>//router配置-->
      <!-- <cell title="手机号码" :value="phone"></cell> -->
      
                 <div style="background:#f7f7f7;height:8vw;line-height:8vw;text-indent:2vw;color:#ababab;font-size:13px">填写实名信息后,订单会被更快确认哟</div>
      <x-input title="真实姓名" placeholder="填写真实姓名" v-model="realName" text-align="right"></x-input>
      <!-- <selector title="用户性别" direction="rtl" v-model="sex" :options="sexList"></selector> -->
      <x-input title="身份证号" placeholder="填写身份证号" v-model="isIdCard" text-align="right"></x-input>
      <!-- <cell title="我的推荐码" :value="shareCode"></cell> -->
           <div style="background:#f7f7f7;height:2vw;"></div>
      <selector title="用户类型" direction="rtl" v-model="userType" :options="typeList" ></selector>
      <x-address title="所在地" v-model="getCity" :list="addressData" placeholder="请选择所在地"
                 @on-shadow-change="addressChoose" :hide-district=true></x-address>
    </group>
    <!--<x-button type="warn" class="submit_btn" @click.native="submit">立即保存</x-button>-->
    <x-button class="submit_btn" :gradients="['#1D62F0', '#19D5FD']" @click.native="submitData">立即保存</x-button>
  </div>
</template>

<script>
  import {XHeader, XButton, Cell, XInput, Group, Selector, XAddress, ChinaAddressV4Data} from 'vux';
  import qs from 'qs';
  export default {
    name: 'Myinfo',
    data () {
      return {
        loginName: '',
        wx: 1,
        phone: '',
        userType: '',
        province: '',
        city: '',
        realName: '',
        sex: '',
        isIdCard: '',
        shareCode: '',
        changeLoginName: '',
        typeList: [],
        isValid: true,
        // sexList: [{key: '0', value: '男'}, {key: '1', value: '女'}],
        getCity: [],
        addressData: ChinaAddressV4Data
      };
    },
    components: {
      XHeader,
      XButton,
      XInput,
      Group,
      Selector,
      Cell,
      XAddress,
      ChinaAddressV4Data
    },
    methods: {
      getInfo () {
        this.$http.post('user/personalCenter').then(
          ({data}) => {
            if (data.code == 200) {
              this.loginName = data.data.loginName;
              this.changeLoginName = data.data.loginName;
              this.phone = data.data.phone;
              this.userType = data.data.userType;
              if (data.data.name != null) {
                this.realName = data.data.name;
              }
              if (data.data.idCard != null) {
                this.isIdCard = data.data.idCard;
              }
              this.shareCode = data.data.shareCode;
              this.getCity = [data.data.province, data.data.city];
              this.wx = data.data.wx;
              this.sex = data.data.sex;
            }
          });
      },
      isValidName (value) {
        let that = this;
        return {
          valid: that.isValid,
          msg: '用户名重复'
        };
      },
      validName () {
        if (this.loginName != this.changeLoginName && this.loginName != null && this.loginName != '') {
          this.$http.get('valida/verifyLoginName?loginName=' + this.loginName).then(({data}) => {
            if (data.code == '200') {
              if (data.data) {
                this.isValid = true;
              } else {
                this.$vux.toast.show({
                  text: '用户名已被使用',
                  position: 'center',
                  type: 'warn',
                  width: '9em'
                });
                this.isValid = false;
              }
            }
          });
        }
      },
      addressChoose (ids, names) {
        this.province = ids[0];
        this.city = ids[1];
        // this.getData.addressName = names.join('-')
      },
      utf16toEntities (str) {
        str = str.replace(/[\ud800-\udbff][\udc00-\udfff]/g, function (char) {
          // let H, L, code;
          if (char.length === 2) {
            // H = char.charCodeAt(0); // 取出高位
            // L = char.charCodeAt(1); // 取出低位
            // code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
            // return "&#" + code + ";";
            return '';
          } else {
            return char;
          }
        });// 检测utf16字符正则
        return str;
      },
      submitData () {
        // let validName = this.$refs.loginName.valid;
        if (this.isValid) {
          if (this.loginName != this.changeLoginName && this.loginName != null) {
            this.wx = 1;
          }
          let _data = {
            loginName: this.utf16toEntities(this.loginName),
            userType: this.userType,
            province: this.province,
            city: this.city,
            name: this.realName,
            sex: this.sex,
            idCard: this.isIdCard,
            wx: this.wx
          };
          this.$http.post('user/updatePersonalCenter', qs.stringify(_data)).then(
            ({data}) => {
              if (data.code == 200) {
                this.$vux.toast.show({
                  text: '保存成功',
                  position: 'center',
                  type: 'success',
                  width: '9em'
                });
                this.getInfo();
              } else {
                this.$vux.toast.show({
                  text: '出现一点问题，请稍后重试',
                  position: 'center',
                  type: 'text',
                  width: '14em',
                  time: '3000'
                });
              }
            }
          );
        } else {
          this.$vux.toast.show({
            text: '用户名不合法',
            position: 'center',
            type: 'warn',
            width: '9em',
            time: '3000'
          });
        }
      }
    },
    mounted () {
      this.$http.get('valida/getUserType').then(
        ({data}) => {
          if (data.code == 200) {
            this.typeList = data.data;
          }
        });
      this.getInfo();
    }
  };
</script>

<style scoped>
  .myRegister {
    width: 100vw;
    position: relative;
    top: 0;
    left: 0;
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

  .register_input {
    margin-top: 48px;
    width: 100vw;
    background-color: #fff;
  }

  .submit_btn {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 60%;
    text-align: center;
    letter-spacing: 6px;
  }

  .register_logo_div img {
    height: 80%;
    width: auto;
  }

  .register_logo_div p {
    margin-top: 10px;
    letter-spacing: 6px;
    padding: 1px 0;
  }
</style>
