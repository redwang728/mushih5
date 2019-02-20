import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => {
        require(['@/components/Index'], resolve);
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => {
        require(['@/components/Index'], resolve);
      }
    },

    {
      path: '/sd/',
      name: 'Pay',
      component: resolve => {
        require(['@/components/Pay'], resolve);
      }
    },
    {
      path: '/payok',
      name: 'PayOk',
      component: resolve => {
        require(['@/components/PaySuccess'], resolve);
      }
    },
    {
      path: '/registration',
      name: 'Registration',
      component: resolve => {
        require(['@/components/Registration'], resolve);
      }
    },
    {
      path: '/productdetail',
      component: resolve => {
        require(['@/components/AllCenters/productDetail'], resolve);
      }
    },
    {
      path: '/productdetailorder',
      component: resolve => {
        require(['@/components/AllCenters/productOrder'], resolve);
      }
    },
    {
      path: '/confirmorder',
      component: resolve => {
        require(['@/components/AllCenters/submitOrder'], resolve);
      }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: resolve => {
        require(['@/components/AllMenu/Menu'], resolve);
      }
    },
    {
      path: '/menu/mattr',
      name: 'Menu/Mattr',
      component: resolve => {
        require(['@/components/AllMenu/Mattr'], resolve);
      }
    },
    {
      path: '/menu/mspec',
      name: 'Menu/Mspec',
      component: resolve => {
        require(['@/components/AllMenu/Mspec'], resolve);
      }
    },
    {
      path: '/menu/mshop',
      name: 'Menu/Mshop',
      component: resolve => {
        require(['@/components/AllMenu/Mshop'], resolve);
      }
    },
    {
      path: '/car',
      name: 'Car',
      component: resolve => {
        require(['@/components/Car'], resolve);
      }
    },
    {
      path: '/car/careditor',
      name: 'Car/CarEditor',
      component: resolve => {
        require(['@/components/AllShop/CarEditor'], resolve);
      }
    },
    {
      path: '/car/carconfirm',
      name: 'Car/CarConfirm',
      component: resolve => {
        require(['@/components/AllShop/CarConfirm'], resolve);
      }
    },
    {
      path: '/center',
      name: 'Center',
      component: resolve => {
        require(['@/components/Center'], resolve);
      }
    },
    {
      path: '/center/myinfo',
      name: 'Center/Myinfo',
      component: resolve => {
        require(['@/components/AllCenters/Myinfo'], resolve);
      }
    },
    // {
    //   path: '/center/myphone',
    //   name: 'Center/Myphone',
    //   component: resolve => {
    //     require(['@/components/AllCenters/Myphone'], resolve)
    //   }
    // },
    {
      path: '/center/myorder',
      name: 'Center/Myorder',
      component: resolve => {
        require(['@/components/AllCenters/Myorder'], resolve);
      }
    },
    {
      path: '/center/orderdetail',
      name: 'Center/Orderdetail',
      component: resolve => {
        require(['@/components/AllCenters/Orderdetail'], resolve);
      }
    },
    {
      path: '/center/mysite',
      name: 'Center/Mysite',
      component: resolve => {
        require(['@/components/AllCenters/Mysite'], resolve);
      }
    },
    {
      path: '/center/addsite',
      name: 'Center/Addsite',
      component: resolve => {
        require(['@/components/AllCenters/Addsite'], resolve);
      }
    },
    {
      path: '/center/mymessage',
      name: 'Center/Mymessage',
      component: resolve => {
        require(['@/components/AllCenters/Mymessage'], resolve);
      }
    },
    {
      path: '/center/feedback',
      name: 'Center/Feedback',
      component: resolve => {
        require(['@/components/AllCenters/Feedback'], resolve);
      }
    },
    {
      path: '/shop',
      name: 'Shop',
      component: resolve => {
        require(['@/components/Shop'], resolve);
      }
    },
    {
      path: '/shop/shopdetail',
      name: 'ShopDetail',
      component: resolve => {
        require(['@/components/AllShop/ShopDetail'], resolve);
      }
    }

  ]
});
