import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  wxNickName: null,
  wxHeadImgUrl: null,
  wxOpenId: null,
  wxSex: null,
  Tabbar: false,
  InImg: false,
  BindPhone: true,
  UpShopData: [], // 上传外层list mattr
  reUpData: {},
  GetShops: '',
  pruductbar: false,
  pruductBuyPopup: false,
  contentBC: '#f7f7f7',
  refreshCar: false,
  carEdData: null,
  carConfirm: ''
};
const mutations = {
  setNickName (state, NickName) {
    state.wxNickName = NickName;
  },
  setImgUrl (state, ImgUrl) {
    state.wxHeadImgUrl = ImgUrl;
  },
  setOpenId (state, OpenId) {
    state.wxOpenId = OpenId;
  },
  setSex (state, Sex) {
    state.wxSex = Sex;
  },
  setTabbar (state, status) {
    state.Tabbar = status;
  },
  setInImg (state, status) {
    state.InImg = status;
  },
  setBindPhone (state, status) {
    state.BindPhone = status;
  },
  setProdutTabbar (state, status) {
    state.pruductbar = status;
  },
  setUpShopData (state, status) { // mattr
    let LENGHT = state.UpShopData.length;
    state.UpShopData.splice(LENGHT, 1, status);
  },
  resetUpShopData (state, status) { // mspec
    state.UpShopData = status;
  },
  setReUpData (state, status) { // mspec
    state.reUpData = status;
  },
  setGetShops (state, status) {
    state.GetShops = status;
  },
  setPrudoctPopupShow (state, status) {
    state.pruductBuyPopup = status;
  },
  setContentBC (state, status) {
    state.contentBC = status;
  },
  refreshcarFn (state, status) {
    state.refreshCar = status;
  },
  setcarEdData (state, status) {
    state.carEdData = status;
  },
  setcarConfirm (state, status) {
    state.carConfirm = status;
  }
};

const actions = {};
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
