import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomePage from '../views/HomePage.vue'
import Todos1Page from '../modules/Todos/views/Todos1Page.vue'
import Todos2Page from '../modules/Todos/views/Todos2Page.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: HomePage },
  { path: '/todos/todos1', component: Todos1Page },
  { path: '/todos/todos2', component: Todos2Page },
  { path: '/:pathMatch(.*)*', redirect: '/home' }
]

// const routes = [...appRoutes, ...todosRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Todos.registerModule(router)

export default router
