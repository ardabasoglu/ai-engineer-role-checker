import { score } from '../_lib/scoring.js';

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store'
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

export async function onRequestPost({ request }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, 400);
  }
  return json(score(payload));
}

export function onRequestGet() {
  return json({ ok: true, endpoint: '/api/score', method: 'POST' });
}
