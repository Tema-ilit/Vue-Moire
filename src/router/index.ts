import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/BasketView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      props: true
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/order/info/:id',
      name: 'info',
      component: () => import('../views/OrderInfo.vue'),
      props: true
    }
  ]
})

export default router
