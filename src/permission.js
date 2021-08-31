import router from './router';
import store from './store';
import Vue from 'vue'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false });

const whiteList = ['/', '/home', 'category', '/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);

  const hasToken = getToken();
  if (hasToken) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          await store.dispatch('user/getInfo');
          next();
        } catch (error) {
          await store.dispatch('user/resetToken');
          Vue.notify({
            text: error,
            type: 'error'
          })
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
