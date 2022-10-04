import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue';
import LoginView from '@/views/Authentication/Login/Login.vue';
import SingleView from '@/views/SingleView/SingleView.vue';
import NotFound from '@/views/404/404.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/task/:id',
    name: 'singleView',
    component: SingleView
  },
  { path: "/:pathMatch(.*)*", name: 'notFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
