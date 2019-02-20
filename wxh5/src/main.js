// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './config/store';
import FastClick from 'fastclick';
import router from './config/router';
import Layout from './public/Layout';
import '@/assets/css/reset.css';
import qs from 'qs';
import './config/api.js';// 引入api接口
import {LoadingPlugin, ToastPlugin} from 'vux';
import AjaxPlugin from 'vux/src/plugins/ajax';

Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
FastClick.attach(document.body);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // localStorage.clear();
  // localStorage.setItem('wxOpenId', 'oGMnm0rWGgyl4LoBSdR91-vZ-9MM');
  let OpenId = localStorage.getItem('wxOpenId') || store.state.wxOpenId;
  if (OpenId == null || OpenId === undefined) {
    let getURL = window.location.href;
    let setReURL = sessionStorage.getItem('setRedirectURL');
    if (setReURL == null || setReURL === undefined) {
      sessionStorage.setItem('setRedirectURL', 'true');
    }
    if (sessionStorage.getItem('setRedirectURL') == 'true') {
      Vue.http.get('/valida/getRedirectURL').then(
        ({data}) => {
          if (data.code == 200) {
            sessionStorage.setItem('setRedirectURL', 'false');
            window.location.href = data.data;
          }
        }
      );
    } else if (`${getURL}`.includes('code')) {
      sessionStorage.removeItem('setRedirectURL');
      let URL = window.location.href;
      let start = URL.indexOf('=') + 1;
      let stop = URL.indexOf('&');
      let code = URL.substring(start, stop);
      Vue.http.get('/valida/callBack?code=' + code).then(
        ({data}) => {
          let res = data.data;
          if (data.code == '200') {
            store.commit('setNickName', res.userInfo.wxNickName);
            store.commit('setOpenId', res.userInfo.wxOpenId);
            store.commit('setSex', res.userInfo.wxSex);
            store.commit('setImgUrl', res.userInfo.wxHeadImgUrl);
            // AjaxPlugin.$http.defaults.headers.common['wxOpenId'] = res.userInfo.wxOpenId;
            if (res.flag == 'Bind') {
              next({path: '/registration'});
            } else {
              localStorage.setItem('wxNickName', res.userInfo.wxNickName);
              localStorage.setItem('wxOpenId', res.userInfo.wxOpenId);
              localStorage.setItem('wxSex', res.userInfo.wxSex);
              localStorage.setItem('wxHeadImgUrl', res.userInfo.wxHeadImgUrl);
              // store.commit('setInImg', false);
              store.commit('setTabbar', true);
              next({path: '/index'});
            }
          }
        }
      );
    }
  } else {
    if (from.path == '/registration' && localStorage.getItem('wxOpenId') == null) {
      // 防止死循环添加from条件
      next({path: '/registration'});
    } else if (to.path == '/registration') {
      if (localStorage.getItem('wxOpenId') == null) {
        next();// 直接过去
      } else {
        next({path: '/index'});
      }
    } else {
      let setValidaId = sessionStorage.getItem('validaId');
      if (setValidaId == null || setValidaId == undefined) {
        sessionStorage.setItem('validaId', 'true');
      }
      if (sessionStorage.getItem('validaId') == 'true') {
        Vue.http.post('/valida/verifyOpenId', qs.stringify({wxOpenId: localStorage.getItem('wxOpenId')})).then(
          ({data}) => {
            if (data.code != 200) {
              localStorage.clear();
              sessionStorage.setItem('validaId', 'false');
              next({path: '/index'});
            }
          });
      }
      // store.commit('setInImg', false);
      store.commit('setTabbar', true);
      next();
    }
  }
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;
  // safari
  window.pageYOffset = 0;
});
Vue.directive('numberOnly', {
  bind: function (el) {
    el.handler = function () {
      el.value = el.value.replace(/\D+/, '');
    };
    el.addEventListener('input', el.handler);
  },
  unbind: function (el) {
    el.removeEventListener('input', el.handler);
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {Layout},
  template: '<Layout/>'
});
