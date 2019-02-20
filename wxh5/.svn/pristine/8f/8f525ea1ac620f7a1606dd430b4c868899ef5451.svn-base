<template>
  <div class="shop">
    <div class="shop_list" v-for="(item,index) in shopList" :key="index">
      <div class="shop_list_H">
        <div class="shop_list_H_L">
          <img :src="item.shoppicurl" alt="">
        </div>
        <div class="shop_list_H_C">
          <p class="shop_list_H_C_H">{{item.shopname}}</p>
          <p class="shop_list_H_C_p">主营业务:{{item.mainbusiness}}</p>
        </div>
        <div class="shop_list_H_R">
          <div class="shop_list_H_R_Div">
            <router-link :to="{path:'/shop/shopdetail',query:{'shopId':item.id}}" style="color: #00b2ff">
              进店
            </router-link>
          </div>
        </div>
      </div>
      <div class="shop_list_C">
        <flexbox justify="center" align="center" :gutter="5" v-if="item.spuList.length=='3'">
          <flexbox-item v-for="(items,indexs) in item.spuList" :key="indexs">
            <div class="shop_list_C_wrap">
             <router-link :to="{path:'/productdetail',query:{spuId:items.spuId,shopId:item.id}}">
                  <img class="shop_list_C_wrap_IMG" :src="items.picUrl" alt="">
                 <div class="price">{{'￥'+items.goodsPrice}}</div>
             </router-link>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox justify="center" align="center" :gutter="5" v-else-if="item.spuList.length=='2'">
          <flexbox-item v-for="(items,indexs) in item.spuList" :key="items.id">
            <div class="shop_list_C_wrap">
                  <router-link :to="{path:'/productdetail',query:{spuId:items.spuId,shopId:item.id}}">
              <img class="shop_list_C_wrap_IMG" :src="items.picUrl" alt="">
              <div class="price">{{'￥'+items.goodsPrice}}</div>
                </router-link>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="shop_list_C_wrap">
              <img class="shop_list_C_wrap_IMG" src="@/assets/img/noProducts.png" alt="">
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox justify="center" align="center" :gutter="5" v-else-if="item.spuList.length=='1'">
          <flexbox-item v-for="(items,indexs) in item.spuList" :key="items.id">
            <div class="shop_list_C_wrap">
                  <router-link :to="{path:'/productdetail',query:{spuId:items.spuId,shopId:item.id}}"> 
                     <img class="shop_list_C_wrap_IMG" :src="items.picUrl" alt="">
                     <div class="price">{{'￥'+items.goodsPrice}}</div>
                  </router-link>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="shop_list_C_wrap">
              <img class="shop_list_C_wrap_IMG" src="@/assets/img/noProducts.png" alt="">
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="shop_list_C_wrap">
              <img class="shop_list_C_wrap_IMG" src="@/assets/img/noProducts.png" alt="">
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox justify="center" align="center" :gutter="5" v-else>
          <flexbox-item v-for="(items,indexs) in 3" :key="indexs">
            <div class="shop_list_C_wrap">
              <img class="shop_list_C_wrap_IMG" src="@/assets/img/noProducts.png" alt="">
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem} from 'vux';

  export default {
    name: 'Shop',
    data () {
      return {
        shopList: []
      };
    },
    components: {
      Flexbox,
      FlexboxItem
    },
    mounted () {
      this.$http.get('/home/shop').then(
        ({data}) => {
          if (data.code == 200) {
            this.shopList = data.data;
          }
        }
      );
    }
  };
</script>

<style scoped>
  .shop_list {
    background-color: #fff;
    padding: 10px 5px;
    margin-bottom: 10px;
  }

  .shop_list_H {
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .shop_list_H div {
    display: inline-block;
  }

  .shop_list_H_L {
    float: left;
    overflow: hidden;
    width: 15%;
    position: relative;
    top: 0;
    left: 0;
  }

  .shop_list_H_L:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .shop_list_H_L img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .shop_list_H_C {
    margin-left: 2%;
    width: 70%;
  }

  .shop_list_H_C_H {
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
    font-size: 16px;
  }

  .shop_list_H_C_p {
    font-size: 13px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  /*.shop_list_H_C p{*/
  /*display: inline-block;*/
  /*}*/

  .shop_list_H_R {
    width: 13%;
    overflow: hidden;
    float: right;
    position: relative;
    top: 0;
    left: 0;
  }

  .shop_list_H_R:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .shop_list_H_R_Div {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    padding: 2px 5px;
    border: 1px solid #00b2ff;
    color: #00b2ff;
    border-radius: 5px;
    font-size: 13px;
  }

  .shop_list_C {
    margin-top: 10px;
  }

  .shop_list_C_wrap {
    position: relative;
    top: 0;
    left: 0;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .shop_list_C_wrap_IMG {
    width: 100%;
  }

  .price {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(100, 100, 100, 0.7);
    color: #fff;
    font-size: 14px;
    padding: 2px 3px;
  }
</style>
