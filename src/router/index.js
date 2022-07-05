import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/loging'
   
  },
  {
    path: '/loging',
    component: () => import('@/views/Loging'),
    name:"Loging"
  }
];

const router = new VueRouter({
  routes,
});

export default router;
