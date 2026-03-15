
<template>
    <div>Home</div>
    <button @click="auth">Войти</button>
    <button @click="logout">Выйти</button>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
const router = useRouter()
function logout() {
  localStorage.removeItem('github_access_token')
  localStorage.removeItem('github_code_verifier')
  localStorage.removeItem('github_state')
  // если сохраняли данные пользователя — тоже удалите
  router.push('/')
}

// import { useAuthStore } from "@/stores/auth"
const store = useAuthStore()

const auth = async () => {
 await store.login()
}

</script>