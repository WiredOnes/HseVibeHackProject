
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/dashboard', component: () => import('@/views/DashboardView.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.query.code) {
    try {
      // Отправляем code на твой сервер
      const res = await fetch(`https://jiodsmgksd.duckdns.org/oauth/callback?code=${encodeURIComponent(code)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      })

      try {
        let data = await res.json()
        console.log(data)

        if (data.token) {
          localStorage.setItem('github_access_token', data.token)
          return next({ path: '/dashboard', replace: true })
        } else {
          return next('/')
        }
      } catch {
        return next('/')
      }
    } catch (err) {
      console.error('OAuth server error:', err)
      return next('/')
    }
  }

  const token = localStorage.getItem('github_access_token')
  if (to.meta.requiresAuth && !token) {
    return next('/')
  }

  if (to.path === '/' && token) {
    return next('/dashboard')
  }

  next()
})

export default router