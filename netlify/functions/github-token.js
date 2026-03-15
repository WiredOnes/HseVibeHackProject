export async function handler(event) {
    const { code } = JSON.parse(event.body)
  
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        code
      })
    })
  
    const data = await response.json()
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    }
  }