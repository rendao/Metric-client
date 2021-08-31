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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/category/:id?',
    name: 'Category',
    component: () => import('@/views/category.vue'),
  },
  {
    path: '/test/:code?',
    name: 'Test',
    component: () => import('@/views/test.vue'),
  },
  {
    path: '/test/:test_code/question/:question_index?',
    name: 'Qustion',
    component: () => import('@/views/question.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  }
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
