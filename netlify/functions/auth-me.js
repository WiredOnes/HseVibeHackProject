export async function handler(event) {

    const cookie = event.headers.cookie || ""
  
    const token = cookie
      .split(";")
      .find(c => c.trim().startsWith("github_token="))
  
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ authenticated: false })
      }
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify({ authenticated: true })
    }
  }