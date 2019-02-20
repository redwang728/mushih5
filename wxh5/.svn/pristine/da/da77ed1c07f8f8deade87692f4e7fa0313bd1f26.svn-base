<template>
  <div class="myRegister">
    <div class="first_screen" v-if="showScreen">
      <div class="register_background"></div>
      <div class="register_wrap">
        <div class="register_head">
          <div class="register_head_wrap">
            <div class="head_img_wrap">
              <img src="@/assets/img/mushi.png" alt="">
            </div>
            <div class="head_txt_wrap">
              <div class="head_txt_wrap_p1">三大保障</div>
              <div class="head_txt_wrap_p2">让玻璃买卖变得简单</div>
            </div>
          </div>
        </div>
        <div class="register_content">
          <div class="content_wrap">
            <!--<div class="image_wrap">-->
              <!--<div class="image_icon">-->
                <!--<img :src="shareMemIcon" alt="">-->
              <!--</div>-->
              <!--<div class="image_text ellipsis">"歇歇哈哈哈"邀请你使用</div>-->
            <!--</div>-->
            <div class="image_wrap">
            <div class="image_text ellipsis">"{{myName}}"欢迎您使用幕饰网</div>
            </div>
            <div class="input_phone vux-1px-b">
              <x-input placeholder="请输入手机号" mask="99999999999" v-model="phone" :max=11 is-type="china-mobile"
                       ref="mobile" required>
                <p slot="right" style="color: #ff0000;display: inline-block;font-size: 14px">可用于登录</p>
              </x-input>
            </div>
            <div class="get_code vux-1px-b">
              <x-input placeholder="验证码" :is-type="verification" v-model="code">
                <x-button slot="right" type="primary" mini @click.native="getCode" :disabled="getCodeState">
                  {{getCodeName}}
                </x-button>
              </x-input>
            </div>
            <div class="submit_btn" @click="changeScreen">立即注册</div>
          </div>
        </div>
      </div>
    </div>
    <div class="second_screen" v-else>
      <div class="second_head">
        <img src="@/assets/img/mushiLogo.png" alt="">
      </div>
      <p class="second_p">你属于下列哪些类型？</p>
      <ul class="second_choose" >
        <li  v-for="(item, index) in staticData" :key="index" :class="setChoose==index?'isChoose':''" @click="setChoose=index">
          <div class="choose_li">
            <p style="font-size: 4vw;margin-bottom: 1vw">{{item.name}}</p>
            <p style="font-size: 2vw;">{{item.tip}}</p>
          </div>
        </li>
      </ul>
      <div class="second_footer" @click="submit" :disabled="subBtn">进入首页</div>
    </div>
  </div>
</template>

<script>
  import {XInput, Group, XButton} from 'vux';
  import qs from 'qs';

  export default {
    name: 'Registration',
    data() {
      return {
        phone: '',
        shareMem: '',
        code: '',//验证码
        validCode: '',//后台验证的验证码
        getCodeName: '获取验证码',
        getCodeState: false,//验证码是否可点击
        // isValid: false,
        isUser: true,
        userFlag: 'oldUser',
        password: null,
        rePassword: '',
        userType: '1',
        subBtn: false,
        pwValid: false,
        myName:this.$store.state.wxNickName || localStorage.getItem('wxNickName'),
        shareMemIcon:require('@/assets/img/addOne.png'),
        shareMemName:'',
        showScreen:true,
        setChoose:'0',
        chooseData:['1','4','5','6'],
        staticData:[{
          name:'我是门窗店/门窗公司',
          tip:'准确,快速下单.并享受免费送货,无忧赔付',
        },{name:'我是幕墙公司', tip:'大批量玻璃采购订单',}, {
            name:'我是玻璃加工厂',
            tip:'入驻幕饰网,在幕饰接单获取大量客户',
          }, {
            name:'其他',
            tip:'',
          }],
      };
    },
    components: { XInput, Group,XButton},
    methods: {
      verification(value) {
        let that = this;
        return {
          valid: value == that.validCode,
          msg: '验证码错误'
        };
      },//ok
      getCode() {
        let that = this;
        if (this.$refs.mobile.valid) {
          this.getCodeState = true;
          let timer = 60;
          let interval = setInterval(() => {
            timer = timer - 1;
            that.getCodeName = `${timer}秒后重试`;
            if (timer == 0) {
              clearInterval(interval);
              that.getCodeState = false;
              that.getCodeName = '获取验证码';
            }
          }, 1000);
          this.$http.get('/security/sms?phoneNum=' + this.phone).then(
            ({data}) => {
              if (data.code == 200) {
                this.$vux.toast.show({
                  text: '短信发送成功',
                  position: 'center',
                  type: 'success',
                  width: '9em'
                });
                let codeArr = data.data.code.split(',');
                let getCode = '';
                for (let i = 0; i < codeArr.length; i++) {
                  getCode += (codeArr[i].length - 1).toString();
                }
                this.validCode = getCode;
                this.userFlag = data.data.userFlag;
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
            text: '请先填写手机号',
            position: 'center',
            type: 'warn',
            width: '9em',
            time: '3000'
          });
        }
      },//ok
      changeScreen(){
        if (this.code == this.validCode && this.validCode != '') { // 验证验证码
          this.showScreen = false;
        }else {
          this.$vux.toast.show({
            text: '请先进行手机验证',
            position: 'center',
            type: 'warn',
            width: '9em',
            time: '3000'
          });
        }
      },
      utf16toEntities(str) {
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
      },//ok
      submit() {
        this.subBtn = true;
        this.userType = this.chooseData[this.setChoose];
        let _data = {
          wxOpenId: this.$store.state.wxOpenId,
          wxNickName: this.utf16toEntities(this.$store.state.wxNickName),
          // wxNickName: this.$store.state.wxNickName,
          wxSex: this.$store.state.wxSex,
          wxHeadImgUrl: this.$store.state.wxHeadImgUrl,
          phone: this.phone,
          shareMem: this.shareMem,
          password: '',
          userFlag: this.userFlag,
          userType: this.userType,
          province: '',
          city: ''
        };
        this.$http.post('/valida/bindPhone', qs.stringify(_data)).then(
          ({data}) => {
            if (data.code == 200) {
              localStorage.setItem('wxNickName', this.$store.state.wxNickName);
              localStorage.setItem('wxOpenId', this.$store.state.wxOpenId);
              localStorage.setItem('wxSex', this.$store.state.wxSex);
              localStorage.setItem('wxHeadImgUrl', this.$store.state.wxHeadImgUrl);
              this.$store.commit('setTabbar', true);
              this.$store.commit('setBindPhone', false);
              this.$vux.toast.show({
                text: '绑定成功',
                position: 'center',
                type: 'success'
              });
              this.$router.replace({path: '/index'});
            } else {
              this.subBtn = false;
              this.$vux.toast.show({
                text: '出现一点问题，请稍后重试',
                position: 'warn',
                type: 'text',
                width: '14em',
                time: '3000'
              });
            }
          }
        );
      },
    },
    mounted() {
      this.$store.commit('setContentBC', '#fff');
      this.$store.commit('setTabbar', false);
      this.$store.commit('setInImg', false);
      sessionStorage.setItem('hideIMG', 'isHide');
      this.$vux.toast.show({
        text: '<p>请绑定手机号</p>',
        position: 'center',
        type: 'text',
        width: '9em',
        time: '3000'
      });
    }
  };
</script>

<style scoped>
  .myRegister {
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 501;
  }

  .first_screen, .second_screen{
    width: 100vw;
    height: 100%;
  }
  .second_screen{
    width: 100vw;
    overflow: hidden;
  }

  .register_background {
    background-color: #00b2ff;
    width: 100%;
    height: 80vw;
  }

  .register_wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
  }

  .register_head {
    width: 100vw;
    height: 58vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .register_head_wrap {
    width: 48vw;
    text-align: center;
  }

  .head_img_wrap {
    display: inline-block;
    width: 22vw;
    height: 22vw;
    overflow: hidden;
    margin-bottom: 7vw;
  }

  .head_img_wrap img {
    width: 100%;
    height: 100%;
  }

  .head_txt_wrap {
    font-size: 5vw;
    color: #ffffff;
  }

  .head_txt_wrap_p1 {
    margin-bottom: 4vw;
  }

  .register_content {
    width: 87vw;
    height: 79vw;
    background-color: #ffffff;
    box-shadow: 0vw 0vw 2vw 0vw rgba(0, 178, 255, 0.16);
    border-radius: 3vw;
    margin: 0 auto;
    overflow: hidden;
  }

  .content_wrap {
    width: 77vw;
    height: 71vw;
    margin: 4vw auto;
    text-align: center;
  }
  .image_wrap{
    margin-bottom: 7vw;
    width: 77vw;
    display: flex;
    align-items: center;
  }
  .image_icon{
    width: 12vw;
    height: 12vw;
    border-radius: 12vw;
    margin-right: 1vw;
    overflow: hidden;
    display: inline-block;
  }
  .image_icon img{
    width: 12vw;
    height: 12vw;
  }
  .image_text{
    width: 62vw;
    font-size: 4vw;
    color: #00b2ff;
    display: inline-block;
    text-align: left;
  }
  .get_code{
    margin: 8vw 0 10vw;
  }
  .submit_btn{
    width: 73vw;
    height: 11vw;
    line-height: 11vw;
    background-color: #00b2ff;
    border-radius: 5vw;
    font-size: 4vw;
    color: #ffffff;
    text-align: center;
    display: inline-block;
  }
  .second_head{
    margin-top: 11vw;
    height: 21vw;
    overflow: hidden;
  }
  .second_head img{
    width: 60vw;
    height: 21vw;
    margin-left: 9vw;
  }
  .second_p{
    margin-top: 14vw;
    margin-left: 10vw;
    font-size: 3vw;
    line-height: 4vw;
    color: #666666;
  }
  .second_choose{
    margin-top: 11vw;
    margin-left: 10vw;
    width: 80vw;
  }
  .second_choose li{
    width: 100%;
    border-radius: 6vw;
    height: 12vw;
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3vw;
    color: #666666;
    /*padding: 2vw 0;*/
  }
  .choose_li{
    text-align: center;
  }
  .isChoose{
    background-color: #00b2ff !important;
    color: #fff !important;
  }
  .second_footer{
    margin: 15vw auto 10vw;
    width: 93vw;
    height: 11vw;
    line-height: 11vw;
    background-color: #00b2ff;
    border-radius: 5vw;
    text-align: center;
    font-size: 4vw;
    color: #fff;
  }

</style>
