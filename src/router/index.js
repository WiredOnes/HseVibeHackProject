import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // ваш Pinia store

// ваши маршруты
const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { requiresAuth: true } },
  // ... другие защищённые маршруты с meta: { requiresAuth: true }

  // ← Специальный маршрут для callback (можно даже без компонента)
  {
    path: '/api/auth/github/callback',
    name: 'github-callback',
    component: { template: '<div>Обработка авторизации...</div>' }
  },

  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach(async (to, from, next) => {
//   console.log(".....")
//   const authStore = useAuthStore()

//   if (to.path === '/api/auth/github/callback' || to.name === 'github-callback') {
//     const code = to.query.code
//     const state = to.query.state
//     const error = to.query.error

//     if (error) {  
//       console.error('GitHub ошибка:', error, to.query.error_description)
//       return next({ path: '/', query: { auth: 'error' } })
//     }

//     if (code) {
//       try {
//         await authStore.exchangeCodeForToken(code, state)
//         // Успех → чистый редирект на главную без мусора в URL
//         return next({ path: '/', replace: true })
//       } catch (err) {
//         console.error('Ошибка обмена code → token:', err)
//         return next({ path: '/', query: { auth: 'failed' } })
//       }
//     }

//     // если code нет — просто на главную
//     return next({ path: '/', replace: true })
//   }

//   // 2. Защищённые маршруты
//   if (to.meta.requiresAuth) {
//     if (!authStore.isAuthenticated) {
//       // Нет токена → сразу на GitHub авторизацию
//       authStore.loginWithGitHub()
//       return // прерываем навигацию — дальше уже не идём
//     }
//     // Токен есть → продолжаем
//     return next()
//   }

//   // Всё остальное — публичные маршруты
//   next()
// })

export default router