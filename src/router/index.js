import VueRouter from 'vue-router';
import Vue       from 'vue';

Vue.use(VueRouter);

const routes = [{
  path: '/adsmanager',
  component: () => import( /* webpackChunkName: "adsmanager" */ '../views/adsmanager/AdsManager.vue')
},
{
  path: '/proxy',
  component: () => import( /* webpackChunkName: "proxy" */ '../views/Proxy.vue')
}, 
{
  path: '/settings',
  component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue')
},
{
  path: '/api',
  component: () => import( /* webpackChunkName: "api" */ '../views/Api.vue')
},
];

const router = new VueRouter({
  routes
});

export default router;
