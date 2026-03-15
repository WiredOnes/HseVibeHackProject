<script setup>
import { useAuthStore } from "@/stores/auth"
const store = useAuthStore()

const auth = async () => {
 await store.loginWithGitHub()
}

</script>

<template>
  <div>
    <h1>You did it!</h1>
    <button @click="auth">Auth Github</button>
  </div>
</template>

<style scoped></style>
