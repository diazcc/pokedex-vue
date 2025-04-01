import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const Home = () => import('./components/pages/home/Home.page.vue');
import HomePage from './components/pages/home/Home.page.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;