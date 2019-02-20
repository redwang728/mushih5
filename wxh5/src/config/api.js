// import axios from "axios";
import {AjaxPlugin} from 'vux';
import Vue from 'vue';
import store from './store';

Vue.use(AjaxPlugin);
// AjaxPlugin.$http.defaults.headers.common['wxOpenId'] = localStorage.getItem('wxOpenId');
AjaxPlugin.$http.interceptors.request.use((config) => { // 拦截器，发送请求之前做某件事
  config.headers.wxOpenId = localStorage.getItem('wxOpenId') || store.state.wxOpenId;// 设置极其关键
  config.headers.wxLat = sessionStorage.getItem('wxLat');// 纬度
  config.headers.wxLng = sessionStorage.getItem('wxLng');// 经度
  return config;
});

AjaxPlugin.$http.defaults.baseURL = 'http://120.55.47.158:8088';// www.wxproxy.91mushi.com
Vue.prototype.host = 'https://www.91mushi.com/api';// 120.55.47.158:8082
// www.jasonsxie.natapp1.cc 谢
// 120.55.47.158:8088
// 192.168.1.115:8088 王
// 192.168.1.119:8889 孟
// 192.168.1.164:8889 丁
// https://www.91mushi.com/api 图片
// http://47.97.180.251:8082 图片
// www.wxproxy.guyuyin.cn 测试
