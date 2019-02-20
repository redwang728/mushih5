<template>
  <div class="detail">
    <div class="shopH">
      <div class="shop_list_H_L">
        <img :src="shopInfo.shopPicUrl" alt="">
      </div>
      <div class="shop_list_H_C">
        <p class="shop_list_H_C_H">{{shopInfo.shopName}}</p>
        <p class="shop_list_H_C_p ellipsis">主营业务:{{shopInfo.mainBusiness}}</p>
        <p class="shop_list_H_C_p ellipsis">地址:{{shopInfo.province}}{{shopInfo.city}}{{shopInfo.county}}</p>
      </div>
    </div>
    <div class="shopCH">
      <p style="height: 38px;line-height: 38px;letter-spacing: 3px">在售商品</p>
      <div class="shopCH_site">
        <img src="@/assets/img/site.png" alt="" style="height: 45%">
        当前距我{{parseInt(shopInfo.distance)}}km
      </div>
    </div>
    <div class="shopC" v-if="listInfo.length>0">
      <ul class="Fcontent">
        <li v-for="(item,index) in listInfo" :key="index">
              <router-link :to="{path:'/productdetail',query:{spuId:item.id,shopId:item.shopId}}"> 
          <div class="Fcontent_top">
            <img :src="item.picUrl">
          </div>
          <div class="Fcontent_F">
            <div class="Fcontent_F_name ellipsis">{{item.goodsName}}</div>
            <div class="Fcontent_F_data ellipsis">{{parseInt(item.cycle)+1}}天内发货</div>
            <div class="Fcontent_F_money ellipsis">
              <div>{{'￥'+item.salePrice}}</div>
              <div class="Fcontent_F_money_person">{{item.orderAmount}}人已付款</div>
            </div>
          </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="shopC" v-else>
      <p style="text-align: center;margin-top: 20px">该店铺暂无商品</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShopDetail',
    data () {
      return {
        shopInfo: '',
        listInfo: []
      };
    },
    created () {
      let ID = this.$route.query.shopId;
      this.$http.get('/goods/selectGoods?shopId=' + ID).then(
        ({data}) => {
          if (data.code == 200) {
            this.listInfo = data.data.list;
            this.shopInfo = data.data.shopStore;
          }
        }
      );
    }
  };
</script>

<style scoped>
  .shopH {
    padding: 10px 15px;
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
    width: 20%;
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
    margin-left: 5%;
    width: 74%;
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
    white-space: nowrap;
    margin: 3px 0;
  }

  .shopCH {
    background-color: #fff;
    position: relative;
    top: 0;
    left: 0;
    font-size: 18px;
    text-align: center;
  }

  .shopCH_site {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
    height: 38px;
    line-height: 38px;
    padding-right: 6px;
  }

  .Fcontent {
    height: auto;
    width: auto;
    overflow: hidden;
    margin-top: 1.5vw;
  }

  .Fcontent li {
    overflow: hidden;
    float: left;
    width: 48vw;
    margin-left: 1vw;
    margin-bottom: 1.5vw;
    background: #fff;
    border-radius: 5px;
  }

  .Fcontent_top {
    width: 40vw;
    height: 30vw;
    margin: 4vw auto;
  }

  .Fcontent_top img {
    width: 40vw;
    height: 30vw;
  }

  .Fcontent_F {
    margin: 4vw auto;
    width: 40vw;
  }

  .Fcontent_F_name {
    font-size: 16px;
    font-weight: bold;
    padding: 1px;
    margin-bottom: 3px;
    letter-spacing: 1px;
  }

  .Fcontent_F_data {
    color: #f00;
    padding: 2px;
    font-size: 12px;
    border: 1px solid #f00;
    display: inline-block;
    border-radius: 5px;
  }

  .Fcontent_F_money div {
    display: inline-block;
  }

  .Fcontent_F_money {
    margin-top: 3px;
    color: #f00;
    font-weight: bold;
  }

  .Fcontent_F_money_person {
    font-size: 12px;
    color: #999;
    font-weight: normal;
  }

</style>
