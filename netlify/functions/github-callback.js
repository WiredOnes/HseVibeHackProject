exports.handler = async function(event) {
  try {
    const code = event.queryStringParameters?.code;

    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing code parameter" })
      };
    }

    const response = await fetch(
      `https://jiodsmgksd.duckdns.org/oauth/callback?code=${encodeURIComponent(code)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    );

    // Парсим ответ от сервера
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};