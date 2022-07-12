import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        component:()=>import('@/views/home')
      },
      {
        path: 'video',
        component:()=>import('@/views/video')
      },
      {
        path: 'qa',
        component:()=>import('@/views/qa')
      },
      {
        path: 'my',
        component:()=>import('@/views/my')
      }

    ]
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
    name: "Login"
  },
  {
    path: "/search",
    component: () => import("@/views/search"),
    name: "search"
  },
  {
    path: "/art/:articleId",
    component: () => import("@/views/article"),
    props:true
  }

 

];

const router = new VueRouter({
  routes
});

export default router;
