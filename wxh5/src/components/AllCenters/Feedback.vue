<template>
  <div class="myFeedback">
    <x-header title="问题反馈" :left-options="{backText: ''}" class="header"></x-header>
    <group class="inputContent">
      <x-textarea v-model="pushData.feedback" :max="150" placeholder="请输入您遇到的问题，我们会尽快反馈给您！"
                  :height="200"></x-textarea>
    </group>
    <x-button class="submitBtn" @click.native="submitData" type="primary">立即反馈</x-button>
  </div>
</template>

<script>
  import {XTextarea, XHeader, XButton, Group} from 'vux';
  import qs from 'qs';
  export default {
    name: 'Feedback',
    data () {
      return {
        pushData: {
          feedback: null,
          type: '1'
        }
      };
    },
    components: {
      XTextarea,
      XHeader,
      XButton,
      Group
    },
    methods: {
      submitData () {
        if (this.pushData.feedback != null) {
          this.$http.post('/feedback/problem/addProblem', qs.stringify(this.pushData)).then(
            ({data}) => {
              if (data.code == 200) {
                this.$vux.toast.show({
                  text: '<p style="margin-top: 20px">反馈成功，我们将尽快处理</p>',
                  position: 'center',
                  width: '13em'
                });
                this.pushData.feedback = null;
                let that = this;
                setTimeout(function () {
                  that.$router.back(-1);
                }, 1200);
              } else {
                this.$vux.toast.show({
                  text: '出现一点问题啦~',
                  position: 'center',
                  type: 'warn',
                  width: '9em',
                  time: '3000'
                });
              }
            }
          );
        } else {
          this.$vux.toast.show({
            text: '请填写内容再提交奥~~',
            position: 'center',
            type: 'warn',
            width: '10em',
            time: '3000'
          });
        }
      }
    }
  };
</script>

<style scoped>
  .myFeedback {
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

  .inputContent {
    width: 90vw;
    margin: 70px auto 0;
  }

  .inputContent >>> .weui-cells {
    border-radius: 10px;
  }

  .submitBtn {
    width: 60vw;
    margin: 20px auto 0;
  }
</style>
