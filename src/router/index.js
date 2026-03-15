// import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/stores/auth' // ваш Pinia store

// // ваши маршруты
// const routes = [
//   { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
//   { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { requiresAuth: true } },
//   // ... другие защищённые маршруты с meta: { requiresAuth: true }

//   // ← Специальный маршрут для callback (можно даже без компонента)
//   {
//     path: '/api/auth/github/callback',
//     name: 'github-callback',
//     component: { template: '<div>Обработка авторизации...</div>' }
//   },

//   { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })


// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore()

//   // ---- GITHUB CALLBACK ----
//   if (to.path === '/api/auth/github/callback') {
//     const code = to.query.code
//     const state = to.query.state
//     const error = to.query.error

//     if (error) {
//       console.error('GitHub ошибка:', error)
//       return next('/')
//     }

//     if (code) {
//       try {
//         await authStore.exchangeCodeForToken(code, state)

//         // после успешной авторизации
//         return next('/dashboard')
//       } catch (err) {
//         console.error('Ошибка обмена code → token:', err)
//         return next('/')
//       }
//     }

//     return next('/')
//   }

//   // ---- ЕСЛИ ЕСТЬ TOKEN И ОТКРЫВАЮТ "/" ----
//   if (to.path === '/' && authStore.isAuthenticated) {
//     return next('/dashboard')
//   }

//   // ---- ЕСЛИ НЕТ TOKEN И ОТКРЫВАЮТ DASHBOARD ----
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     return next('/')
//   }

//   next()
// })

// export default router

import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const routes = [
  {
    path: "/",
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {

  // const auth = useAuthStore()

  // await auth.checkAuth()

  // if (to.meta.requiresAuth && !auth.isAuthenticated) {
  //   return next("/")
  // }

  // if (to.path === "/" && auth.isAuthenticated) {
  //   return next("/dashboard")
  // }

  // next()
})

export default router