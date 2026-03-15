export async function handler(event) {

    const code = event.queryStringParameters.code
  
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        code
      })
    })
  
    const data = await response.json()
  
    if (!data.access_token) {
      return {
        statusCode: 302,
        headers: { Location: "/" }
      }
    }
  
    return {
      statusCode: 302,
      headers: {
        "Set-Cookie": `github_token=${data.access_token}; HttpOnly; Secure; SameSite=Lax; Path=/`,
        Location: "/dashboard"
      }
    }
  }