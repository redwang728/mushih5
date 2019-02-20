<template>
  <div class="q_order">
    <x-header title="商品参数" :left-options="{backText: ''}" class="header"></x-header>
    <div class="q_order_header">
      <h4> {{firstName}} > {{lastName}}</h4>
      <p style="font-size:14px">{{goodName}}</p>
    </div>
    <div class="q_order_upload">
      <div class="q_order_upload_text">图纸</div>
      <div class="q_order_upload_border">
        <div class="q_order_upload_border_img" v-show="!uploadImgShow">
          <img src="@/assets/img/upload.png">
          上传图片
        </div>
        <input class="uploader_input" type="file" accept="image/*" id="uploadImage" ref="upIMG"
               @change="upChange()">
        <div class="uploader_input_img" v-show="uploadImgShow" @click="imgshowFn">
          <img :src="uploadImg">
        </div>
      </div>
    </div>
    <div class="q_order_upload_size">
      <ul>
        <li>
           <div class="lajiinput_left">
                   长度
                   </div>
                   <div class="lajiinput_right">
                         <input  type="number"  v-model="changdu"  :placeholder="`最小长度${productSize[1]}mm ~ 最大长度${productSize[3]}mm`"  v-number-only >
                   </div>
        </li>
      <li>
             <div class="lajiinput_left">
                   宽度
                   </div>
                   <div class="lajiinput_right">
                         <input   type="number"   v-model="wide"  :placeholder="`最小长度${productSize[0]}mm ~ 最大长度${productSize[2]}mm`"  v-number-only >
                   </div>

              </li>
        <li>

                <div class="lajiinput_left">
                   面积
                   </div>
                   <div class="lajiinput_right" style="color:#ff0000;text-align:right">
                          {{area}} m²
                   </div>

        </li>
      </ul>
    </div>
    <div class="q_order_upload_size">
      <ul>
        <li>
             <div class="lajiinput_left">
                   打孔个数
                   </div>
                   <div class="lajiinput_right">
                         <input  type="number"  v-model="holdNum"  placeholder="请根据需求填写打孔个数"  v-number-only >
                   </div>
          <!-- <x-input label-width="6em" title='打孔个数:' type="number" v-model="holdNum" placeholder="请根据需求填写打孔个数"></x-input> -->
        </li>
        <li>
             <div class="lajiinput_left">
                   挖角个数
                   </div>
                   <div class="lajiinput_right">
                         <input  type="number"  v-model="topNum"  placeholder="请根据需求填写挖角个数"  v-number-only >
                   </div>
          <!-- <x-input label-width="6em" title='挖角个数:' type="number" v-model="topNum" placeholder="请根据需求填写挖角个数"></x-input> -->
        </li>
        <li>
          <x-input label-width="6em" title='客户标注:' type="text" v-model="custom"></x-input>
        </li>
        <li style="font-size: 14px;">
          <x-number title="购买数量" v-model="productNum" :min="0" :fillable="true"></x-number>
        </li>
        <li style="font-size: 14px;"><span>总价 : </span> <span
          style="color:#ff0000;font-size: 15px;"> ¥ {{allPrice}}</span></li>
      </ul>
    </div>

    <div v-if="imgShow" class="showIMG">
      <div class="imgClose">
        <img src="@/assets/img/addIcon.png" @click="imgShowHide()">
      </div>
      <div class="imgDiv">
        <img style="width: 90%" :src="uploadImg" alt="">
      </div>
      <div class="imgBtn">
        <x-button type="default" @click.native="deleteImg()">删除</x-button>
        <x-button type="warn">
          重新上传
          <input type="file" class="uploader_input" @change="upChange2()" ref="upIMGs">
        </x-button>
      </div>
    </div>
    <div class="q_order_sub">
      <x-button type="default" @click.native="pushShopList(1)"> 加入购物车</x-button>
      <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="pushShopList(2)">确认订单</x-button>
    </div>
  </div>
</template>
<script>
  import {XButton, XHeader, XInput, XNumber} from 'vux';
  import qs from 'qs';
  export default {
    data () {
      return {
        firstName: '',
        lastName: '',
        goodName: '',
        uploadUrl: this.host + '/upload/uploadFile',
        uploadImg: '',
        uploadImgShow: false,
        imgShow: false,
        shopId: '',
        spuId: '',
        productSize: [],
        holdPrice: '',
        topPrice: '',
        // 长宽
        changdu: '',
        wide: '',

        holdNum: '',
        topNum: '',
        custom: '', // 客户标注
        productNum: 1,
        // 商品信息
        skuid: '',
        goodsTypeId: '',
        // 判断
        widthBool: false,
        lengthBool: false,
        technologyPrice: ''// 工艺费用

      };
    },
    components: {
      XButton,
      XHeader,
      XInput,
      XNumber
    },
    methods: {
      imgshowFn () {
        this.imgShow = true;
      },
      imgShowHide () {
        this.imgShow = false;
      },
      // 删除图片
      deleteImg () {
        this.imgShow = false;
        this.uploadImg = '';
        this.uploadImgShow = false;
      },
      upChange () {
        this.$vux.loading.show('正在上传');
        let timer;
        let THAT = this;
        let formData = new window.FormData();
        formData.append('file', this.$refs.upIMG.files[0]);
        this.$http.post(this.uploadUrl, formData).then(({data}) => {
          if (data.code == '200') {
            this.$vux.loading.hide();
            clearTimeout(timer);
            this.$refs.upIMG.value = '';// 清空
            this.uploadImgShow = true;
            this.$vux.toast.text('上传成功', 'center');
            this.uploadImg = data.data;
          } else {
            this.$vux.loading.hide();
            this.$vux.toast.text('上传失败', 'center');
          }
        });
        timer = setTimeout(()=>{
          THAT.$vux.loading.hide();
          THAT.$vux.toast.show({
            text: '<p>正在后台上传</p><br/><p>稍后为您展示</p>',
            position: 'center',
            type:'text',
            width: '11em',
            time: '3000'
          });
        },5000)
      },
      upChange2 () {
        this.$vux.loading.show('正在上传');
        let timer;
        let THAT = this;
        let formData = new window.FormData();
        formData.append('file', this.$refs.upIMGs.files[0]);
        this.$http.post(this.uploadUrl, formData).then(({data}) => {
          if (data.code == '200') {
            this.uploadImg = data.data;
            this.$vux.loading.hide();
            this.$vux.toast.text('图片上传成功', 'center');
            clearTimeout(timer);
            this.$refs.upIMGs.value = '';// 清空
          } else {
            this.$vux.loading.hide();
            this.$vux.toast.text('图片上传失败', 'center');
          }
        });
        timer = setTimeout(()=>{
          THAT.$vux.loading.hide();
          THAT.$vux.toast.show({
            text: '<p>正在后台上传</p><br/><p>稍后为您展示</p>',
            position: 'center',
            type:'text',
            width: '11em',
            time: '3000'
          });
        },5000)
      },
      getSize () {
        let _data = {
          shopId: this.shopId,
          spuId: this.spuId
        };
        this.$http.post('/goodsdetails/findSize', qs.stringify(_data)).then((data) => {
          if (data.data.code == 200) {
            this.productSize = data.data.data.size.split(',');
            this.holdPrice = parseInt(data.data.data.hole);
            this.topPrice = parseInt(data.data.data.top);
          } else {
            this.$vux.toast.text('网络问题', 'center');
          }
        });
      },
      // 尺寸类型限制
      checkNumber (obj) {
        let newobj = [...obj];
        let arr = '';
        newobj.map((item, index) => {
          item = (Number(item));
          if (!isNaN(item)) {
            arr = `${arr}${item}`;
          }
        });
        this.changdu = arr;
      },
      pushShopList (type) {
        if (Number(this.changdu) >= Number(this.productSize[1]) && Number(this.changdu) <= Number(this.productSize[3])) {
          this.lengthBool = true;
        } else {
          this.lengthBool = false;
          this.$vux.toast.text(`长度不正确`, 'center');
        }
        if (Number(this.wide) >= Number(this.productSize[0]) && Number(this.wide) <= Number(this.productSize[2])) {
          this.widthBool = true;
        } else {
          this.widthBool = false;
          this.$vux.toast.text(`宽度不正确`, 'center');
        }
        // type:  1 加入购物车  2 确认订单

        if (this.lengthBool && this.widthBool) {
          if (type == 1) {
            let _data = [ {
              goodsSKUId: this.skuid,
              goodsSPUId: this.spuId,
              shopId: this.shopId,
              goodsTypeId: this.goodsTypeId,
              combinate: `${this.goodName}`,
              imgurl: this.uploadImg,
              length: this.changdu,
              width: this.wide,
              hole: Number(this.holdNum),
              top: Number(this.topNum),
              customNo: this.custom,
              amount: Number(this.productNum),
              price: Number(this.price)
            }];
            this.$http.post('/car/save', _data, {headers: {'Content-Type': 'application/json'}}).then((data) => {
              if (data.data.code == 200) {
                this.$vux.toast.text(`成功加入购物车`, 'center');
                this.changdu = 0;
                this.wide = 0;
                this.uploadImg = '';
                this.holdNum = 0;
                this.topNum = 0;
                this.custom = '';
                this.productNum = 1;
                // 更新购物车
                this.$store.commit('refreshcarFn', true);
              } else {
                this.$vux.toast.text(`数据发生错误`, 'center');
              }
            });
          } else {
            let _data = {
              shopId: this.shopId,
              combinate: `${this.$route.query.goodLastName} ${this.goodName}`,
              productSpuId: this.spuId,
              productSkuId: this.skuid,
              customNo: this.custom,
              chang: this.changdu,
              kuan: this.wide,
              amount: Number(this.productNum),
              hole: Number(this.holdNum),
              top: Number(this.topNum),
              imgurl: this.uploadImg
            };
            this.technologyPrice = ((Number(this.holdPrice)).toFixed(2) * this.holdNum + (Number(this.topPrice)).toFixed(2) * this.topNum) * Number(this.productNum).toFixed(2);
            this.$http.post('/order/confirmOrderDir', qs.stringify(_data)).then((data) => {
              if (data.data.code == 200) {
                let res = data.data.data;
                this.$router.push({
                  path: '/confirmorder',
                  query: {
                    goodsName: res.goodsName,
                    skuStr: this.goodName,
                    price: res.price,
                    chang: res.chang,
                    kuan: res.kuan,
                    imgurl: this.uploadImg,
                    shopId: this.shopId,
                    topPrice: res.topPrice,
                    holePrice: res.holePrice,
                    amount: res.amount,
                    deliveryMode: res.deliveryMode,
                    shopName: res.shopName,
                    picUrl: res.picUrl,
                    area: this.$route.query.area,
                    adress: this.$route.query.contentaddress,
                    phone: this.$route.query.contentphone,
                    logistFee: this.$route.query.logistFee,
                    offsetradius: this.$route.query.offsetradius,
                    technologyPrice: this.technologyPrice,
                    custom: this.custom,
                    spuId: this.spuId,
                    top: this.topNum,
                    hold: this.holdNum,
                    skuid: this.$route.query.skuid
                  }
                });
              }
            });
          }
        } else {
          this.$vux.toast.text(`商品信息填写不正确`, 'center');
        }
      }
    },
    computed: {
      allPrice: function () {
        return ((Number(this.area) * Number(this.price) + Number(this.holdPrice) * this.holdNum + Number(this.topPrice) * Number(this.topNum)) * Number(this.productNum)).toFixed(2);
      },
      area: function () {
        return parseFloat(((this.changdu * this.wide) / 1000000)).toFixed(2);
      }
    },
    created () {
      this.shopId = this.$route.query.shopId;
      this.spuId = this.$route.query.spuId;
      this.getSize();
      this.lastName = this.$route.query.goodLastName;
      this.goodName = this.$route.query.combination;
      this.firstName = this.$route.query.goodFirstName;
      this.skuid = this.$route.query.skuid;
      this.goodsTypeId = this.$route.query.goodsTypeId;
      this.price = this.$route.query.price;
    }

  };
</script>
<style scoped>
  .q_order {
    color: #6e6e6e;
    width: 100vw;
    height: auto;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
  }

.lajiinput_left{ width: 16vw;float: left;;height:6vw;;line-height: 6vw}
.lajiinput_right{ width:78vw;height: 6vw;line-height: 6vw;float: left;}
  .vux-header {
    background-color: #fff;
  }

  .imgBtn >>> .weui-btn weui-btn_warn {
    margin-top: 16px;
    height: 11vw;
    width: 100%;
    background: #e64340;
  }

  .vux-header >>> .vux-header-title {
    color: #333333;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .q_order_header {
    width: 92vw;
    height: auto;
    padding: 1vw 2vw 0;
    background: #00b2ff;
    overflow: hidden;
    font-size: 15px;
    border-radius: 0 0 3vw 3vw;
    margin:47px auto 0;
    color: #fff;
    text-indent: 8px;
    line-height: 6vw
  }

  .q_order_upload {
    width: 96vw;
    height: 16vw;
    background: #fff;
    margin-top: 3vw;
    padding: 2vw 2vw;
    line-height: 16vw
  }

  .q_order_upload_border {
    width: 16vw;
    height: 16vw;
    border: 1px dashed #acacac;
    float: right;
    margin-right: 5vw;;
    position: relative;
    line-height: 8vw;
    border-radius: 7px;
    text-align: center;
    font-size: 12px
  }

  .q_order_upload_border_img img {
    width: 6vw;
    height: 6vw;
    margin: 3vw auto 0;
    display: block;
  }

  .q_order_upload_text {
    float: left;
    width: 15vw;
    height: 16vw;
  }

  .uploader_input {
    display: inline-block;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10
  }

  .uploader_input_img {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100
  }

  .uploader_input_img img {
    width: 100%;
    height: 100%;
    margin-top: 0;
    border-radius: 7px;
  }

  .q_order_upload_size {
    width: 96vw;
    padding: 0vw 2vw;
    height: auto;
    overflow: hidden;;
    background: #fff;
    margin: o auto;
    margin-top: 3vw
  }

  .q_order_upload_size >>> .weui-input {
    font-size: 12px;
    text-align: right;
    color: #b7abab;
  }

  .q_order_upload_size ul li {
    width: 96vw;
    border-bottom: 1px solid #f3f3f3;
    overflow: hidden;
    padding: 3vw 0vw;
        font-size: 14px;
  }
.q_order_upload_size ul li input{ width: 100%;font-size: 13px;text-align: left;color:#b7abab}
  .q_order_upload_size ul li >>> .weui-cell {
    padding: 0
  }

  .q_order_upload_size >>> .weui-label {
    font-size: 14px
  }

  .q_order_sub {
    width: 96vw;
    margin: 0 auto;
    padding: 5vw 0
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
</style>


