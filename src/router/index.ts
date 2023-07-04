import { createRouter, createWebHistory } from 'vue-router'

import { routes as mainRoutes } from '@/modules/main/routes'
import { routes as templateRoutes } from '@/modules/template/routes'

const routes = [
  mainRoutes,
  templateRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../modules/main/views/page-not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.path.startsWith('/api')){
    window.location.href = (to.path.replace('/api/v1', '') + '.json');
    return;
  }
  if(!localStorage.getItem('auth-token') && !['/login', '/register'].includes(to.path)){
    next({
      path: '/login'
    })
  }
  next();
});

export default router
