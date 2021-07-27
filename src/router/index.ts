import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/Home.vue')
  },
  {
    path: '/learning',
    name: 'learning',
    component: () => import('@/views/Learning/Learning.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/Projects/Projects.vue')
  },
  {
    path: '/projects/:projectId',
    name: 'projectDetail',
    component: () => import('@/views/ProjectDetail/ProjectDetail.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
