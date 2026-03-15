export async function handler() {

    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: "https://hsehackvibeproject.netlify.app/"
    })
  
    return {
      statusCode: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?${params}`
      }
    }
  }