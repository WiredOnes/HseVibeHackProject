// export async function handler(event) {
//   try {
//     const code = event.queryStringParameters?.code;

//     if (!code) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ error: "Missing code parameter" })
//       };
//     }

//     // Отправляем POST на GitHub для обмена code → access_token
//     const response = await fetch("https://github.com/login/oauth/access_token", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         client_id: process.env.GITHUB_CLIENT_ID,
//         client_secret: process.env.GITHUB_CLIENT_SECRET,
//         code
//       })
//     });

//     const data = await response.json();

//     if (data.error) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ error: data.error_description || data.error })
//       };
//     }

//     return {
//       statusCode: 200,
//       body: JSON.stringify(data) // { access_token, token_type, scope }
//     };

//   } catch (err) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: err.message })
//     };
//   }
// }