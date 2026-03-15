// src/stores/auth.js
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from "vue"

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID
const REDIRECT_URI = 'https://hsehackvibeproject.netlify.app/api/auth/github/callback'


// import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", () => {

  const accessToken = ref(localStorage.getItem('github_access_token'))
  const isAuthenticated = ref(!!accessToken.value)

  // const isAuthenticated = ref(false)

  async function checkAuth() {

    const res = await fetch("/.netlify/functions/auth-me", {
      credentials: "include"
    })

    if (res.status === 200) {
      isAuthenticated.value = true
    } else {
      isAuthenticated.value = false
    }
  }

  function login() {
    window.location.href = "/.netlify/functions/github-login"
  }

  function logout() {
    document.cookie =
      "github_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    location.href = "/"
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})

// export const useAuthStore = defineStore('auth', () => {
//   const router = useRouter()

//   const accessToken = computed(() => localStorage.getItem('github_access_token'))

//   const isAuthenticated = computed(() => !!accessToken.value)

//   // Генерация code_verifier (43–128 символов, здесь ~64 hex)
//   function generateCodeVerifier() {
//     const array = new Uint8Array(32)
//     crypto.getRandomValues(array)
//     return Array.from(array, b => b.toString(16).padStart(2, '0')).join('')
//   }

//   // code_challenge = base64url(SHA256(verifier))
//   async function generateCodeChallenge(verifier) {
//     const encoder = new TextEncoder()
//     const data = encoder.encode(verifier)
//     const hash = await crypto.subtle.digest('SHA-256', data)
//     const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)))
//     return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
//   }

//   async function loginWithGitHub() {
//     const verifier = generateCodeVerifier()
//     const challenge = await generateCodeChallenge(verifier)

//     localStorage.setItem('github_code_verifier', verifier)
//     // можно также сохранить state для проверки CSRF
//     const state = crypto.randomUUID()
//     localStorage.setItem('github_state', state)

//     const params = new URLSearchParams({
//       client_id: GITHUB_CLIENT_ID,
//       redirect_uri: REDIRECT_URI,
//       scope: 'user:email read:user repo', // подберите нужные
//       state,
//       code_challenge: challenge,
//       code_challenge_method: 'S256'
//     })

//     window.location.href = `https://github.com/login/oauth/authorize?${params}`
//   }


//   async function exchangeCodeForToken(code) {

//     const response = await fetch('/.netlify/functions/github-token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ code })
//     })
  
//     const data = await response.json()
  
//     localStorage.setItem('github_access_token', data.access_token)
//   }
//   // async function exchangeCodeForToken(code, receivedState) {
//   //   const verifier = localStorage.getItem('github_code_verifier')
//   //   const savedState = localStorage.getItem('github_state')

//   //   if (!verifier) throw new Error('code_verifier не найден')
//   //   if (receivedState && savedState && receivedState !== savedState) {
//   //     throw new Error('state не совпадает — возможная CSRF атака')
//   //   }

//   //   const body = new URLSearchParams({
//   //     client_id: GITHUB_CLIENT_ID,
//   //     code,
//   //     redirect_uri: REDIRECT_URI,
//   //     code_verifier: verifier
//   //     // client_secret НЕ нужен при PKCE!
//   //   })

//   //   const response = await fetch('https://github.com/login/oauth/access_token', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Accept': 'application/json',
//   //       'Content-Type': 'application/x-www-form-urlencoded'
//   //     },
//   //     body
//   //   })

//   //   if (!response.ok) {
//   //     const err = await response.json()
//   //     throw new Error(err.error_description || 'Ошибка получения токена')
//   //   }

//   //   const data = await response.json()

//   //   if (data.error) {
//   //     throw new Error(data.error_description || 'Ошибка авторизации')
//   //   }

//   //   localStorage.setItem('github_access_token', data.access_token)

//   //   // чистим временные данные
//   //   localStorage.removeItem('github_code_verifier')
//   //   localStorage.removeItem('github_state')

//   // }

//   function logout() {
//     localStorage.removeItem('github_access_token')
//     router.push('/')
//   }

//   return {
//     isAuthenticated,
//     accessToken,
//     loginWithGitHub,
//     exchangeCodeForToken,
//     logout
//   }
// })