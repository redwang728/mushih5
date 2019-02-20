<template>
  <div class="menu">
    <x-header title="下单(3/3)" :left-options="{backText: '首页',preventGoBack:true}" @on-click-back="goIndex"
              class="header vux-1px-b">
      <p slot="right" style="color:#000;font-size: 15px;font-weight: bold" @click="setDelet">{{edTxt}}</p>
    </x-header>
    <div class="select_wrap">
      <!--v-for 01-->
      <div v-for="(item, index) in upList" :key="index">
        <!--v-for 02-->
        <div class="select vux-1px-b" v-for="(items, indexs) in item.list" :key="indexs">
          <!--header-->
          <div class="select_H" ref="SelectC">
            <div v-if="showEd" class="select_checked">
              <check-icon :value.sync="items.isChoose"></check-icon>
            </div>
            <div class="select_H_content">
              <p>{{item.goodsParam.otherName.join('-')}}</p>
              <p style="margin-top: 5px">{{item.goodsParam.skuStr}}</p>
            </div>
          </div>
          <Group class="input_wrap">
            <x-input text-align="right" title="图纸：" type="text" readonly>
              <div class="upload_wrap" slot="right">
                <img v-if="`${items.imgurl}`.includes('http')" @click="showIMG(index,indexs)" :src="items.imgurl" alt=""
                     class="upload_IMG">
                <div v-else class="upload_wrap_first" @click="fatherIndex(index,indexs)">
                  <img src="@/assets/img/camera.png" alt="" class="upload_IMG">
                  <upload-image @resData="returnData"></upload-image>
                </div>
              </div>
            </x-input>
            <cell  title="长度：">
              <div>
                <input style="text-align: right" type="number" v-model="items.length" @on-blur="isArea(index,indexs,'length')" placeholder="请输入长度" v-number-only><em>mm</em>
              </div>
            </cell>
            <cell  title="宽度：">
              <div>
                <input style="text-align: right" type="number" v-model="items.width" @on-blur="isArea(index,indexs,'width')" placeholder="请输入宽度" v-number-only><em>mm</em>
              </div>
            </cell>
            <cell  title="面积：">
              <div style="color: #f00">
                {{((items.length * items.width) / 1000000).toFixed(2)}}㎡
              </div>
            </cell>
            <x-number text-align="right" title="购买数量：" :fillable="true" :min="1" v-model="items.amount" class="number_input"></x-number>
            <x-number text-align="right" title="打孔：" :fillable="true" :min="0" class="number_input" placeholder="请输入打孔数"
                      v-model="items.hole"></x-number>
            <x-number text-align="right" title="挖角：" :fillable="true" :min="0" placeholder="请输入挖角数"
                      v-model="items.top" class="number_input"></x-number>
            <x-input text-align="right" title="客户标注：" type="text" placeholder="请输入客户标注"
                     v-model="items.customno"></x-input>
            <div class="addInput vux-1px-t">
              <div style="width: 49%;display: inline-block">
                <checker class="Item_wrap" v-model="items.isUpdata" default-item-class="defaultItem"
                         selected-item-class="selectItem">
                  <checker-item value="xie">参与比价</checker-item>
                </checker>
              </div>
              <div style="width: 49%;display: inline-block;text-align: right" @click="addList(index)">
                <div class="add_wrap">
                  <img src="@/assets/img/addIcon.png" alt="">同规格+1
                </div>
              </div>
            </div>
          </Group>
        </div>
      </div>
    </div>
    <!--img-->
    <div v-if="imgShow" class="showIMG">
      <div class="imgClose" @click="imgShow=false">
        <img src="@/assets/img/addIcon.png" alt="">
      </div>
      <div class="imgDiv">
        <img style="width: 90%" :src="showIMGURL" alt="">
      </div>
      <div class="imgBtn">
        <div class="imgBtn_delete" style="color: #000000;background-color: #F8F8F8;" @click="deletIMG">删除</div>
        <div class="imgBtn_delete" style="background-color: #E64340;margin-top: 10px">重新上传
          <input class="uploader_input" type="file" accept="image/*" ref="reUpIMG" @change="reUpChange">
        </div>
      </div>
    </div>
    <!--Footer-->
    <div class="btn_wrap vux-1px-t">
      <div class="btn_wrap_div" v-if="showEd">
        <div class="deleteBtn" @click="onDelete">删除所选</div>
      </div>
      <div class="btn_wrap_div" v-else>
        <div class="btn addBtn" @click="backPage">添加其他品类</div>
        <div class="btn" @click="turnPage">选好了,开始比价</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Checker, CheckerItem, CheckIcon, XInput, Group, XNumber, Cell} from 'vux';
  import UploadImage from './UploadImage.vue';
  import qs from 'qs';
  export default {
    name: 'Mspec',
    data () {
      return {
        uploadUrl: this.host + '/upload/uploadFile',
        upList: [],
        isChecked: false,
        showEd: false,
        edTxt: '编辑',
        imgShow: false,
        imgURL: '',
        upIndex: 0,
        upIndexs: 0,
        firstIndex: 0,
        secondIndex: 0,
        showIMGURL: ''
      };
    },
    components: {XHeader, XButton, Checker, CheckerItem, CheckIcon, XInput, Group, XNumber, Cell, UploadImage},
    methods: {
      fatherIndex (index, indexs) {
        this.upIndex = index;
        this.upIndexs = indexs;
      },
      returnData (v) {
        let ONE = this.upIndex;
        let TWO = this.upIndexs;
        this.upList[ONE].list[TWO].imgurl = v;
      },
      showIMG (index, indexs) {
        this.firstIndex = index;
        this.secondIndex = indexs;
        this.showIMGURL = this.upList[index].list[indexs].imgurl;
        this.imgShow = true;
      },
      reUpChange () {
        this.$vux.loading.show('正在上传');
        let index = this.firstIndex;
        let indexs = this.secondIndex;
        let formData = new window.FormData();
        formData.append('file', this.$refs.reUpIMG.files[0]);
        this.$http.post(this.uploadUrl, formData).then(({data}) => {
          // console.log(response.data)
          if (data.code == '200') {
            this.upList[index].list[indexs].imgurl = data.data;
            this.showIMGURL = data.data;
            this.$vux.loading.hide();
            this.$refs.reUpIMG.value = '';// 清空
            this.$vux.toast.text('上传成功', 'center');
          } else {
            this.$vux.loading.hide();
            this.$vux.toast.text('上传失败', 'center');
          }
        });
      },
      deletIMG () {
        let index = this.firstIndex;
        let indexs = this.secondIndex;
        this.upList[index].list[indexs].imgurl = '';
        this.imgShow = false;
        this.$vux.toast.text('删除成功', 'center');
      },
      isArea (index, indexs, type) {
        let LENGTH = this.upList[index].list[indexs].length;
        let WIDTH = this.upList[index].list[indexs].width;
        if (LENGTH != '' && WIDTH != '' && LENGTH != null && WIDTH != null) {
          if (parseFloat(LENGTH) < parseFloat(WIDTH)) {
            this.$vux.toast.show({
              text: '长度应不小于宽度',
              position: 'center',
              type: 'warn',
              width: '9em',
              time: '3000'
            });
            if (type == 'length') {
              this.upList[index].list[indexs].length = '';
            } else {
              this.upList[index].list[indexs].width = '';
            }
          }
        }
      },
      validHW (index, array) {
        let nowList = array[index].list;
        let nowIndex = nowList.length - 1;
        let LENGTH = nowList[nowIndex].length;
        let WIDTH = nowList[nowIndex].width;
        if (LENGTH != '' && WIDTH != '' && LENGTH != null && WIDTH != null) {
          return true;
        } else {
          return false;
        }
      },
      addList (index) {
        let isValidHW = this.validHW(index, this.upList);
        if (isValidHW) {
          let _data = {
            length: '',
            width: '',
            hole: 0,
            top: 0,
            amount: 1,
            customno: '',
            imgurl: '',
            isChoose: false,
            isUpdata: 'xie'
          };
          this.upList[index].list.splice(this.upList[index].list.length, 1, _data);
        } else {
          this.$vux.toast.show({
            text: '请填写完表格再添加',
            position: 'center',
            type: 'warn',
            width: '11em',
            time: '3000'
          });
        }
      },
      setDelet () {
        if (this.showEd) {
          this.showEd = false;
          this.edTxt = '编辑';
        } else {
          this.showEd = true;
          this.edTxt = '完成';
        }
      },
      onDelete () {
        // isChoose
        let oldArr = this.upList;
        this.upList = oldArr.filter((value, index, array) => {
          let arr01 = value.list;
          let firstArr = arr01.filter((val, ind, arr) => {
            if (!val.isChoose) {
              return true;
            }
          });
          if (firstArr.length > 0) {
            value.list = firstArr;
            return true;
          }
        });
        this.setDelet();
        this.$vux.toast.text('删除成功', 'center');
      },
      backPage () {
        this.$store.commit('resetUpShopData', this.upList);
        this.$router.replace({name: 'Menu', params: {type: 'back'}});
      },
      turnPage () {
        let oldArr = this.upList;
        let newArr = oldArr.filter((value, index, array) => {
          let arr01 = value.list;
          let firstArr = arr01.filter((val, ind, arr) => {
            if (val.isUpdata == 'xie') {
              return true;
            }
          });
          if (firstArr.length > 0) {
            return true;
          }
        });
        if (newArr.length > 0) {
          this.$vux.loading.show({text: '数据提交中'});
          this.$store.commit('resetUpShopData', this.upList);
          let getBoole = [];
          for (let i = 0; i < newArr.length; i++) {
            let m = this.validHW(i, newArr);
            getBoole.push(m);
          }
          let isReal = `${getBoole.join(',')}`.includes('false');
          if (!isReal) {
            let allData = {addressId: '', list: newArr};
            this.$http.post('/goods/tjShop', allData, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then(
              ({data}) => {
                if (data.code == 200) {
                  this.$store.commit('setReUpData', allData);
                  this.$store.commit('setGetShops', data.data);
                  this.$router.push({path: '/menu/mshop'});
                  this.$vux.loading.hide();
                } else {
                  this.$vux.loading.hide();
                  this.$vux.toast.text('数据提交失败', 'center');
                }
              }
            );
          } else {
            this.$vux.loading.hide();
            this.$vux.toast.show({
              text: '请完整填写数据',
              position: 'center',
              type: 'warn',
              width: '11em',
              time: '3000'
            });
          }
        } else {
          this.$vux.loading.hide();
          this.$vux.toast.show({
            text: '您还没有选择商品',
            position: 'center',
            type: 'warn',
            width: '11em',
            time: '3000'
          });
        }
      },
      goIndex () {
        this.$router.replace('/index');
        this.$store.commit('setContentBC', '#f7f7f7');
      }// yes
    },
    computed: {}, // yes
    mounted () {
      this.$store.commit('setContentBC', '#f7f7f7');
      let type = this.$route.params.type;
      if (type == 'forward') {
        let that = this;
        setTimeout(() => {
          that.$vux.loading.hide();
        }, 400);
        this.upList = this.$store.state.UpShopData;
        // console.log(this.upList)
      } else {
        this.$router.back(-1);
      }
    }
  };
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

  .select_wrap {
    margin-top: 46px;
    width: 100vw;
    font-size: 14px;
    margin-bottom: 60px;
  }

  .select_H {
    width: 100vw;
    box-sizing: border-box;
    font-size: 14px;
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    padding: 7px 15px;
  }

  .select_H_content {
    color: #000;
    display: inline-block;
    font-size: 15px;
    width: 90%;
  }

  .select_H_content p {
    width: 100%;
  }

  .select_checked {
    display: inline-block;
    margin-right: 5px;
  }

  .select_wrap_H_L_img img {
    width: 88%;
    height: auto;
  }

  .addInput {
    padding: 7px 15px;
  }


  .uploader_input {
    display: inline-block;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }


  .showIMG >>> .weui-dialog__bd {
    padding: 10px;
  }

  .addIMG img {
    width: 100%;
    height: 100%;
  }

  .input_wrap >>> .weui-cell {
    padding: 7px 15px;
    font-size: 15px;
  }

  .input_wrap >>> .weui-cells {
    margin-top: 0;
  }

  .upload_wrap {
    height: 15vw;
    width: 15vw;
  }

  .upload_IMG {
    width: 100%;
    height: 100%;
  }

  .upload_wrap_first {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .showIMG {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
    width: 100vw;
    height: 100vh;
    z-index: 1002;
    overflow: hidden;
  }

  .imgClose {
    margin-right: 3vw;
    height: 6vh;
    line-height: 6vh;
    text-align: right;
  }

  .imgClose img {
    height: 5vh;
    transform: rotate(45deg);
  }

  .imgDiv {
    text-align: center;
    width: 100%;
    height: 68vh;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgBtn {
    position: absolute;
    bottom: 6vh;
    width: 80%;
    left: 10%;
  }

  .btn_wrap {
    width: 100vw;
    text-align: center;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1001;
    height: 110px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn_wrap_div {
    /*margin-top: 10px;*/
    width: 80%;
  }

  .btn {
    width: 100%;
    letter-spacing: 3px;
    background-color: #fc9d2d;
    color: #fff;
    padding: 10px 15px;
    font-size: 17px;
    box-sizing: border-box;
  }

  .addBtn {
    margin-bottom: 10px;
    background-color: #eee;
    color: #333333;
  }

  .deleteBtn {
    width: 100%;
    letter-spacing: 3px;
    background-color: #ff0000;
    color: #fff;
    padding: 10px 15px;
    font-size: 18px;
    box-sizing: border-box;
  }

  .defaultItem {
    padding: 4px 8px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
  }

  .selectItem {
    border-color: #00b2ff;
    background: #ffffff url(../../assets/img/selectIcon.png) no-repeat right bottom / contain;
  }

  .Item_wrap {
    display: inline-block;
  }

  .add_wrap {
    display: inline-block;
    height: 100%;
    font-size: 15px;
  }

  .add_wrap img {
    width: 6vw;
    height: 6vw;
    margin-right: 3px;
  }

  .imgBtn_delete {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 2.33333333;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
  }
  .number_input >>> .vux-number-input{
    height: 26px;
    line-height: 26px;
    padding: 0;
  }

</style>
