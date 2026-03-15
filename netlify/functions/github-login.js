export async function handler() {

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      scope: "read:user user:email",
      redirect_uri: `https://hsehackvibeproject.netlify.app/.netlify/functions/github-callback`
    })
  
    return {
      statusCode: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?${params}`
      }
    }
  }