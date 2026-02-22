export async function onRequestPost(context) {
  const { request, env } = context;
  const { username, password } = await request.json();

  try {
    await env.DB.prepare(
      "INSERT INTO users (username, password, high_score, current_level) VALUES (?, ?, 0, 1)"
    ).bind(username, password).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
