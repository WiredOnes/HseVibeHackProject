
<template>
    <div>Home</div>
    <button @click="logout">Выйти</button>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
function logout() {
  localStorage.removeItem('github_access_token')
  localStorage.removeItem('github_code_verifier')
  localStorage.removeItem('github_state')
  // если сохраняли данные пользователя — тоже удалите
  router.push('/')
}

</script>