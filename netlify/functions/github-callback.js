export async function handler(event) {

    const code = event.queryStringParameters.code
  
    const response = await fetch(`http://jiodsmgksd.duckdns.org/oauth/callback?code=${code}`, {
      method: "GET"
    })
  
    const data = await response.json()
    console.log(data)
  
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
