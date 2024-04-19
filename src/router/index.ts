import { createRouter, createWebHistory } from '@ionic/vue-router'
import TodoPage from '../modules/Todos/views/TodoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/todos' },
    { path: '/todos', name: 'todos', component: TodoPage },
    { path: '/:pathMatch(.*)*', redirect: '/todos' }
  ]
})

export default router
