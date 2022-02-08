import { createRouter, createWebHashHistory } from 'vue-router'
import Сompanies from '../views/Сompanies.vue'

const routes = [
  {
    path: '/', name: 'Сompanies', component: Сompanies
  },
  {
    path: '/addresses', name: 'Addresses', component: () => import('../views/Addresses.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
