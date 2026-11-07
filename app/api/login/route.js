import { NextResponse } from "next/server";
import { checkPassword, makeToken, COOKIE, cookieOptions, sameOrigin } from "../../../lib/auth";

// Simple in-memory brute-force guard (per server instance).
const fails = new Map();
const WINDOW = 15 * 60 * 1000;
const LIMIT = 8;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function ipOf(req) {
  return (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
}

export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const ip = ipOf(req);
  const now = Date.now();
  const recent = (fails.get(ip) || []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  let ok;
  try {
    ok = await checkPassword(body?.password);
  } catch (e) {
    return NextResponse.json(
      { error: "Server not configured: set ADMIN_PASSWORD and SESSION_SECRET." },
      { status: 500 }
    );
  }

  if (!ok) {
    recent.push(now);
    fails.set(ip, recent);
    await sleep(600);
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  fails.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await makeToken(), cookieOptions);
  return res;
}
