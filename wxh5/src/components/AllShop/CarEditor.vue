<template>
  <div class="menu">
    <x-header title="重设规格" :left-options="{backText: ''}" class="header vux-1px-b"></x-header>
    <div class="select_wrap">
      <div class="editor_H">
        <div class="editor_H_L">
          <div class="ellipsis">{{allData.goodsName}}</div>
          <div style="font-size: 13px;margin-top: 5px">{{allData.combinate}}</div>
        </div>
        <div class="editor_H_R" @click="addList">
          <img src="@/assets/img/addOne.png" alt="">
        </div>
      </div>
      <div v-for="(item,index) in goodsList" :key="index">
        <Group class="input_wrap">
          <x-input text-align="right" title="图纸：" type="text" readonly>
            <div class="upload_wrap" slot="right">
              <img v-if="`${item.imgurl}`.includes('http')" :src="item.imgurl" @click="showIMG(index)" alt=""
                   class="upload_IMG">
              <div v-else class="upload_wrap_first" @click="imgIndex(index)">
                <img src="@/assets/img/camera.png" alt="" class="upload_IMG">
                <upload-image @resData="returnData"></upload-image>
              </div>
            </div>
          </x-input>
          <x-input text-align="right" title="客户标注：" type="text" placeholder="请输入客户标注" v-model="item.customNo" ></x-input>
          <cell title="长度：" class="cell_input">
            <div style="width: 73vw">
              <input style="text-align: right;width: 88%;" type="number" :placeholder="`长度在${sizeArr[1]}mm~${sizeArr[3]}mm之间`" v-model="item.length" @blur="isArea(index,'length')" v-number-only><em>mm</em>
            </div>
          </cell>
          <cell  title="宽度：">
            <div style="width: 73vw">
              <input style="text-align: right;width: 88%;" type="number" v-model="item.width" @blur="isArea(index,'width')"
                     :placeholder="`宽度在${sizeArr[0]}mm~${sizeArr[2]}mm之间`" v-number-only><em>mm</em>
            </div>
          </cell>
          <cell  title="面积：">
            <div style="color: #f00">
              {{((item.length * item.width) / 1000000).toFixed(2)}}㎡
            </div>
          </cell>
          <x-number text-align="right" title="打孔：" :fillable="true" :min="0" placeholder="请输入打孔数"
                    v-model="item.hole" class="number_input"></x-number>
          <x-number text-align="right" title="挖角：" :fillable="true" :min="0" placeholder="请输入挖角数"
                    v-model="item.top" class="number_input"></x-number>
          <x-number text-align="right" title="购买数量：" :fillable="true" :min="1" v-model="item.amount" class="number_input"></x-number>
          <cell>
            <div class="deleBtn" @click="deleData(item,index)">删除</div>
          </cell>
        </Group>
      </div>
    </div>
    <!--btn-->
    <div class="btn_wrap vux-1px-t">
      <div class="btn_wrap_div">
        <x-button class="btn" @click.native="submitData">确定</x-button>
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
          <upload-image @resData="reData"></upload-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, XButton, Checker, CheckerItem, CheckIcon, XInput, Group, XNumber, Cell} from 'vux';
  import UploadImage from '../AllMenu/UploadImage.vue';
  import qs from 'qs';
  export default {
    name: 'CarEditor',
    data () {
      return {
        shopId: '',
        allData: '',
        goodsList: [],
        sizeArr: [],
        upSite: 0,
        imgSite: 0,
        showIMGURL: '',
        imgShow: false
      };
    },
    components: {XHeader, XButton, CheckIcon, XInput, Group, XNumber, Cell, UploadImage},
    methods: {
      imgIndex (index) {
        this.upSite = index;
      },
      returnData (v) {
        // console.log(v);
        let ONE = this.upSite;
        this.goodsList[ONE].imgurl = v;
      },
      showIMG (index) {
        this.imgSite = index;
        this.showIMGURL = this.goodsList[index].imgurl;
        this.imgShow = true;
      },
      deletIMG () {
        let index = this.imgSite;
        this.goodsList[index].imgurl = '';
        this.imgShow = false;
        this.$vux.toast.text('删除成功', 'center');
      },
      reData (v) {
        let ONE = this.imgSite;
        this.goodsList[ONE].imgurl = v;
        this.showIMGURL = v;
      }, // yes
      isArea (index, type) {
        let LENGTH = this.goodsList[index].length;
        let WIDTH = this.goodsList[index].width;
        if (type == 'length') {
          if (Number(LENGTH) >= Number(this.sizeArr[1]) && Number(LENGTH) <= Number(this.sizeArr[3])) {
            this.clearHW(LENGTH, WIDTH, type, index);
          } else {
            this.$vux.toast.show({
              text: '输入正确长度值',
              position: 'center',
              type: 'warn',
              width: '9em',
              time: '3000'
            });
            this.goodsList[index].length = '';
          }
        } else {
          if (Number(WIDTH) >= Number(this.sizeArr[0]) && Number(WIDTH) <= Number(this.sizeArr[2])) {
            this.clearHW(LENGTH, WIDTH, type, index);
          } else {
            this.$vux.toast.show({
              text: '输入正确宽度值',
              position: 'center',
              type: 'warn',
              width: '9em',
              time: '3000'
            });
            this.goodsList[index].width = '';
          }
        }
      },
      clearHW (LENGTH, WIDTH, type, index) {
        if (LENGTH != '' && WIDTH != '' && LENGTH != null && WIDTH != null) {
          if (Number(LENGTH) < Number(WIDTH)) {
            this.$vux.toast.show({
              text: '长度应不小于宽度',
              position: 'center',
              type: 'warn',
              width: '9em',
              time: '3000'
            });
            if (type == 'length') {
              this.goodsList[index].length = '';
            } else {
              this.goodsList[index].width = '';
            }
          };
        }
      },
      addList () {
        let isValidHW = this.validHW();
        if (isValidHW) {
          let _data = {
            length: '',
            width: '',
            hole: 0,
            top: 0,
            amount: 1,
            customNo: '',
            imgurl: ''
          };
          this.goodsList.push(_data);
          this.$vux.toast.text('添加成功');
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
      validHW () {
        let boolArr = [];
        this.goodsList.forEach((value, index, array) => {
          if (value.length != '' && value.width != '' && value.length != null && value.length != null) {
            boolArr.push('true');
          } else {
            boolArr.push('false');
          }
        });
        let BoolStr = boolArr.join(',');
        if (`${BoolStr}`.includes('false')) {
          return false;
        } else {
          return true;
        }
      },
      deleData (value, index) {
        if (value.id != undefined) {
          this.$http.post('/car/delect', qs.stringify({list: value.id})).then(({data}) => {
            if (data.code == 200) {
              this.goodsList.splice(index, 1);
              this.$vux.toast.text('删除成功', 'center');
            } else {
              this.$vux.toast.text('删除失败', 'center');
            }
          });
        } else {
          this.goodsList.splice(index, 1);
          this.$vux.toast.text('删除成功');
        }
      },
      mergeData () {
        let hasID = [];
        let noID = [];
        let That = this;
        this.goodsList.forEach((value, index, array) => {
          if (value.id !== undefined) {
            let pushData = {
              id: value.id,
              top: value.top,
              hole: value.hole,
              width: value.width,
              length: value.length,
              imgurl: value.imgurl,
              amount: value.amount,
              customNo: value.customNo
            };
            hasID.push(pushData);
          }
        });
        this.goodsList.forEach((value, index, array) => {
          if (value.id === undefined) {
            let pushData = {
              goodsSKUId: That.allData.goodsSKUId,
              goodsSPUId: That.allData.spuId,
              shopId: That.shopId,
              goodsTypeId: That.allData.goodsTypeId,
              price: That.allData.goodsPrice,
              top: value.top,
              hole: value.hole,
              width: value.width,
              length: value.length,
              imgurl: value.imgurl,
              amount: value.amount,
              customNo: value.customNo
            };
            noID.push(pushData);
          }
        });
        return {editList: hasID, saveList: noID};
      },
      submitData () {
        let isValidHW = this.validHW();
        if (isValidHW) {
          let upData = this.mergeData();
          this.$http.post('/car/edit', upData, {headers: {'Content-Type': 'application/json'}}).then(({data}) => {
            if (data.code == 200) {
              this.$vux.toast.text('修改成功', 'center');
              this.$router.push('/car');
            }
          });
        } else {
          this.$vux.toast.show({
            text: '请完成填写表格',
            position: 'center',
            type: 'warn',
            width: '9em',
            time: '3000'
          });
        }
      }
    },
    computed: {},
    mounted () {
      let carData = this.$store.state.carEdData;
      if (carData != null && carData != undefined && carData != '') {
        this.shopId = carData.shopId;
        this.allData = carData.goodsList;
        this.goodsList = carData.goodsList.goodsParamList;
        this.sizeArr = carData.goodsList.size.split(',');
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

  .editor_H {
    padding: 5px 15px;
    font-size: 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .editor_H_L {
    width: 90%;
    display: inline-block;
  }

  .editor_H_R {
    width: 7.5%;
    display: inline-block;
  }

  .editor_H_R img {
    width: 100%;
  }

  .select_H_content p {
    width: 100%;
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

  .input_wrap {
    padding: 5px;
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

  .btn_wrap {
    width: 100vw;
    text-align: center;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1001;
    height: 58px;
    line-height: 58px;
    background-color: #fff;
  }

  .btn {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    letter-spacing: 3px;
    background-color: #fe8e00;
    color: #fff;
  }
  .deleBtn{
    border: 1px solid #cacaca;
    font-size: 14px;
    padding: 2px 8px;
    border-radius: 7px;
  }
  .number_input >>> .vux-number-input{
    height: 26px;
    line-height: 26px;
    padding: 0;
  }
  .cell_input{

  }
</style>
