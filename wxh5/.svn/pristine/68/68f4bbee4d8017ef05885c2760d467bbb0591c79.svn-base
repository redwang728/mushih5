<template>
  <div class="myRegister">
    <x-header title="修改手机号" :left-options="{backText: ''}" class="header"></x-header>
    <group class="register_input">
      <x-input placeholder="修改手机号" title="手机" mask="99999999999" v-model="phone" :max=11 is-type="china-mobile"
               ref="mobile" required></x-input>
      <x-input placeholder="请输入验证码" :is-type="verification" v-model="code">
        <x-button slot="right" type="primary" mini @click.native="getCode" :disabled="getCodeState">
          {{getCodeName}}
        </x-button>
      </x-input>
    </group>
    <x-button type="warn" class="submit_btn" @click.native="submit">立即修改</x-button>
  </div>
</template>

<script>
  import {XHeader, XButton, XInput, Group} from 'vux';
  import qs from 'qs';
  export default {
    name: 'Myphone',
    data () {
      return {
        phone: '',
        code: '',
        validCode: '',
        getCodeName: '获取验证码',
        getCodeState: false,
        isValid: false
      };
    },
    components: {
      XHeader,
      XButton,
      XInput,
      Group
    },
    methods: {
      verification (value) {
        let that = this;
        return {
          valid: value == that.validCode,
          msg: '验证码错误'
        };
      },
      getCode () {
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
                this.isValid = true;
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
      },
      submit () {
        if (this.isValid) {
          this.$http.post('/user/updatePersonalCenter', qs.stringify({phone: this.phone})).then(
            ({data}) => {
              if (data.code == 200) {
                this.$vux.toast.show({
                  text: '修改成功',
                  position: 'center',
                  type: 'success',
                  width: '9em'
                });
                this.$router.back(-1);
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
            text: '请先进行手机验证',
            position: 'center',
            type: 'warn',
            width: '9em',
            time: '3000'
          });
        }
      }
    },
    mounted () {
      this.phone = this.$route.params.Phone;
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
