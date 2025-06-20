import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'
import Logout from '../pages/Logout.vue'
import Eintraege from '../pages/Eintraege.vue'
import Coachees from '../pages/Coachees.vue'

const routes = [
  { path: '/eintraege/:profileId', component: Eintraege },
  { path: '/', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: '/coachees', component: Coachees }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = sessionStorage.getItem('username')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  if (to.path === '/login' && loggedIn) {
    return next('/')
  }

  next()
})

export default router
