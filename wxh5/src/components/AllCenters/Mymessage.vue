<template>
  <div class="myMessage">
    <x-header title="我的消息" :left-options="{backText: ''}" class="header"></x-header>
    <ul class="MessageList" v-if="List !=null && List.length >0">
      <swipeout v-for="(item,index) in List" :key="index" style="margin: 5px 0">
        <swipeout-item transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button type="default" @click.native="isRead(item.id,index)">设为已读</swipeout-button>
          </div>
          <div slot="content" class="demo-content vux-1px-t" @click="hasURL(item.url,item.id,index)">
            <li class="MessageLi">
              <a :href="changeURL(item.url)">
                <div class="Top_wrap">
                  <div class="L_img_wrap">
                    <img src="@/assets/img/mushi.png" alt="">
                  </div>
                  <div class="R_wrap">
                    <h4 class="R_header">幕饰网
                      <badge v-if="item.status == 0" style="margin-left: 10px"></badge>
                    </h4>
                    <p class="R_content">{{item.content}}</p>
                  </div>
                </div>
                <ul class="Bottom_ul">
                  <li>时间：{{item.time}}</li>
                </ul>
              </a>
            </li>
          </div>
        </swipeout-item>
      </swipeout>
    </ul>
    <div class="noData" v-else>暂无数据</div>
  </div>
</template>

<script>
  import {XHeader, Group, Panel, Badge, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import qs from 'qs';
  export default {
    name: "Mymessage",
    data() {
      return {
        List: []
      }
    },
    components: {
      XHeader,
      Group,
      Panel,
      Badge,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    methods: {
      isRead(ids, index) {
        if (this.List[index].status == 0) {
          this.$http.post('/sys/message/changeStatus', qs.stringify({id: ids})).then(
            ({data}) => {
              let res = data;
              if (res.code == 200) {
                this.List[index].status = 1;
              }
            }
          )
        }
      },
      hasURL(url, ids, index) {
        if (`${url}`.includes('.')) {
          this.isRead(ids, index)
        }
      },
      changeURL(url) {
        if (`${url}`.includes('.')) {
          if (!`${url}`.includes('http')) {
            return 'http://' + url;
          }
        } else {
          return 'javascript:;';
        }
      }
    },
    mounted() {
      this.$http.post('/sys/message/list').then(
        ({data}) => {
          let res = data;
          if (res.code == 200) {
            this.List = res.data
          }
        }
      )
    }
  }
</script>

<style scoped>
  .myMessage {
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

  .MessageList {
    margin-top: 48px;
    position: relative;
    overflow: hidden;
  }

  .MessageLi {
    padding: 5px 10px;
    position: relative;
  }

  .MessageLi::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .Top_wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .L_img_wrap {
    margin-right: .8em;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .L_img_wrap img {
    width: 100%;
    max-height: 100%;
    vertical-align: top;
  }

  .R_wrap {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
  }

  .R_header {
    font-weight: 400;
    font-size: 17px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    margin-bottom: 8px;
  }

  .R_content {
    color: #999999;
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .Bottom_ul {
    margin-top: 5px;
    font-size: 13px;
    color: #CECECE;
    list-style: none;
    overflow: hidden;
  }

  .Bottom_ul li {
    float: left;
    padding: 1px 1em 1px 0;
  }
</style>
