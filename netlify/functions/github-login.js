export async function handler() {

    const params = new URLSearchParams({
      client_id: import.meta.env.GITHUB_CLIENT_ID,
      scope: "read:user user:email",
      redirect_uri: `${import.meta.env.URL}/.netlify/functions/github-callback`
    })
  
    return {
      statusCode: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?${params}`
      }
    }
  }