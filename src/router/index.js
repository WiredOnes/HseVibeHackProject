
// import { createRouter, createWebHistory } from "vue-router"
// import { useAuthStore } from "@/stores/auth"

// const routes = [
//   {
//     path: "/",
//     component: () => import("@/views/HomeView.vue")
//   },
//   {
//     path: "/dashboard",
//     component: () => import("@/views/DashboardView.vue"),
//     meta: { requiresAuth: true }
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// router.beforeEach(async (to, from, next) => {

//   const auth = useAuthStore()

//   await auth.checkAuth()

//   if (to.meta.requiresAuth && !auth.isAuthenticated) {
//     return next("/")
//   }

//   if (to.path === "/" && auth.isAuthenticated) {
//     return next("/dashboard")
//   }

//   next()
// })

// export default router


import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/dashboard', component: () => import('@/views/DashboardView.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 1️⃣ Если GitHub вернул code
  const code = to.query.code
  if (code) {
    try {
      // Отправляем code на твой сервер
      const res = await fetch(`https://jiodsmgksd.duckdns.org/oauth/callback?code=${encodeURIComponent(code)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      })

      let data
      try {
        data = await res.json() // сервер должен вернуть JSON с access_token
      } catch {
        return next('/') // если сервер не JSON → редирект на /
      }

      if (data.access_token) {
        localStorage.setItem('github_access_token', data.access_token)
        // Очищаем query и редирект на dashboard
        return next({ path: '/dashboard', replace: true })
      } else {
        return next('/') // токена нет → редирект на /
      }

    } catch (err) {
      console.error('OAuth server error:', err)
      return next('/')
    }
  }

  // 2️⃣ Защита dashboard
  const token = localStorage.getItem('github_access_token')
  if (to.meta.requiresAuth && !token) {
    return next('/')
  }

  // 3️⃣ Если токен есть и открывают главную
  if (to.path === '/' && token) {
    return next('/dashboard')
  }

  next()
})

export default router