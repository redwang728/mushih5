<template>
  <div class="addsite">
    <x-header :title="isFix?'编辑收货地址':'添加收货地址'" :left-options="{backText: ''}" class="header"></x-header>
    <group class="AllInput">
      <x-input placeholder="收货人" is-type :max="5" ref="name" required v-model="getData.userName"></x-input>
      <x-input placeholder="请输入手机号" mask="999 9999 9999" v-model="getData.phone" :max="13" is-type="china-mobile"
               ref="mobile"
               required></x-input>
      <x-address title="收货地址所在区:" v-model="getCity" :list="addressData" placeholder="请选择地址"
                 @on-shadow-change="addressChoose"></x-address>
      <x-input placeholder="详细地址" is-type ref="detailSite" required v-model="getData.address"></x-input>
      <x-switch title="是否设为默认地址" v-model="getData.isDefault" :value-map="['0', '1']"></x-switch>
    </group>
    <x-button class="submitBtn" :gradients="['#1D62F0', '#19D5FD']" @click.native="submitData">确认</x-button>
    <x-button v-if="isFix" class="submitBtn" :gradients="['#FF2719', '#FF61AD']" @click.native="deleteData">删除
    </x-button>
  </div>
</template>

<script>
  import {XHeader, XButton, XInput, Group, XAddress, ChinaAddressV4Data, XSwitch} from 'vux';
  import qs from 'qs';
  export default {
    name: 'Addsite',
    data () {
      return {
        getData: {
          id: '',
          userName: '',
          phone: null,
          provinceId: '340000',
          cityId: '340100',
          countyid: '340102',
          address: '',
          isDefault: '1',
          addressName: '安徽省-合肥市-瑶海区'
        },
        getCity: [],
        addressData: ChinaAddressV4Data,
        isFix: false
      };
    },
    components: {
      XHeader,
      XButton,
      XInput,
      Group,
      XAddress,
      ChinaAddressV4Data,
      XSwitch
    },
    methods: {
      addressChoose (ids, names) {
        this.getData.provinceId = ids[0];
        this.getData.cityId = ids[1];
        this.getData.countyid = ids[2];
        this.getData.addressName = names.join('-');
      },
      deleteData () {
        this.$http.post('/user/address/deleteAddressById', qs.stringify({id: this.getData.id})).then(
          ({data}) => {
            if (data.code == 200) {
              this.$vux.toast.show({
                text: '删除成功',
                position: 'center',
                type: 'success',
                width: '9em'
              });
              let that = this;
              setTimeout(function () {
                that.$router.back(-1);
              }, 900);
            } else {
              this.$vux.toast.show({
                text: '删除失败，稍后重试',
                position: 'center',
                type: 'warn',
                width: '9em',
                time: '3000'
              });
            }
          }
        );
      },
      submitData () {
        let nameValid = this.$refs.name.valid;
        let phoneValid = this.$refs.mobile.valid;
        let addressValid = this.$refs.detailSite.valid;
        if (nameValid) {
          if (phoneValid) {
            if (addressValid) {
              if (this.isFix) {
                this.$http.post('/user/address/UpdateAddressInfo', qs.stringify(this.getData)).then(
                  ({data}) => {
                    if (data.code == 200) {
                      this.$vux.toast.show({
                        text: '修改成功',
                        position: 'center',
                        type: 'success',
                        width: '9em'
                      });
                      let that = this;
                      setTimeout(function () {
                        that.$router.back(-1);
                      }, 900);
                    } else {
                      this.$vux.toast.show({
                        text: '修改失败',
                        position: 'center',
                        type: 'warn',
                        width: '9em',
                        time: '3000'
                      });
                    }
                  }
                );
              } else {
                this.$http.post('/user/address/addAddress', qs.stringify(this.getData)).then(
                  ({data}) => {
                    if (data.code == 200) {
                      this.$vux.toast.show({
                        text: '添加成功',
                        position: 'center',
                        type: 'success',
                        width: '9em'
                      });
                      let that = this;
                      setTimeout(function () {
                        that.$router.back(-1);
                      }, 900);
                    } else {
                      this.$vux.toast.show({
                        text: '添加失败',
                        position: 'center',
                        type: 'warn',
                        width: '9em',
                        time: '3000'
                      });
                    }
                  }
                );
              }
            } else {
              this.$vux.toast.show({
                text: '请填写详细地址',
                position: 'center',
                type: 'warn',
                width: '9em'
              });
            }
          } else {
            this.$vux.toast.show({
              text: '请填写手机号',
              position: 'center',
              type: 'warn',
              width: '9em'
            });
          }
        } else {
          this.$vux.toast.show({
            text: '请填写收货人',
            position: 'center',
            type: 'warn',
            width: '9em'
          });
        }
      }
    },
    mounted () {
      let _Data = this.$route.query;
      if (_Data != undefined && _Data != null && JSON.stringify(_Data) != '{}') {
        this.isFix = true;
        let innerData = _Data.AllData;
        this.getData = {
          id: innerData.id,
          userName: innerData.userName,
          phone: innerData.phone,
          provinceId: innerData.provinceId,
          cityId: innerData.cityId,
          countyid: innerData.countyId,
          address: innerData.address,
          isDefault: innerData.isDefault,
          addressName: innerData.addressName.join('-')
        };
        this.getCity = [innerData.provinceId, innerData.cityId, innerData.countyId];
      } else {
        this.getCity = ['340000', '340100', '340102'];
      }
    }
  };
</script>

<style scoped>
  .addsite {
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

  .AllInput {
    margin-top: 46px;
    width: 100vw;
    background-color: #fff;
    z-index: 9;
  }

  .submitBtn {
    width: 90%;
    margin: 20px auto 0;
  }
</style>
