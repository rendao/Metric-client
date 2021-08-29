import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
  },
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => 
  new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    // base: process.env.BASE_URL,
    routes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router
