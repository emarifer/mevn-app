import Vue from 'vue';
import VueRouter from 'vue-router';

const routes = [
    {
      name: 'Home',
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue')
    },
    {
      name: 'Notes',
      path: '/notes',
      component: () => import(/* webpackChunkName: "home" */ '../components/Notes.vue')
    },
    {
      name: 'LandingPage',
      path: '/landing',
      component: () => import(/* webpackChunkName: "landing" */ '../components/LandingPage.vue')
    }
  ];

Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history', base: '/', routes });


export default router;