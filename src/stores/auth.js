import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const GITHUB_CLIENT_ID = "Iv23liS8YODf6phtTGQR";
  const REDIRECT_URI = "http://localhost:5173/api/auth/github/callback";
  
  function generateCodeVerifier() {
    const array = new Uint32Array(56 / 2);
    crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  }
  
  function generateCodeChallenge(verifier: string) {
    // SHA-256 → base64url
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))
      .then(hash => {
        return btoa(String.fromCharCode(...new Uint8Array(hash)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      });
  }
  
  async function loginWithGitHub() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
  
    // Сохраняем verifier (лучше в HttpOnly cookie или localStorage с осторожностью)
    localStorage.setItem("github_code_verifier", codeVerifier);
  
    const params = new URLSearchParams({
      client_id:     GITHUB_CLIENT_ID,
      redirect_uri:  REDIRECT_URI,
      scope:         "user:email read:user repo", // нужные вам права
      state:         crypto.randomUUID(),         // CSRF-защита
      code_challenge: codeChallenge,
      code_challenge_method: "S256"
    });
  
    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  }

  return { authGithub }
})
