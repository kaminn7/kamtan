export async function onRequestPost(context) {
  const { request, env } = context;
  const { username, password } = await request.json();

  try {
    const user = await env.DB.prepare(
      "SELECT * FROM users WHERE username = ? AND password = ?"
    ).bind(username, password).first();

    if (user) {
      return new Response(JSON.stringify({ success: true, user }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
