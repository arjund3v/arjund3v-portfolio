import { cookies } from "next/headers";

// Password login with a signed, expiring, httpOnly cookie.
// Needs two environment variables: ADMIN_PASSWORD and SESSION_SECRET.

export const COOKIE = "admin_session";
const WEEK = 7 * 24 * 60 * 60 * 1000;
const enc = new TextEncoder();

async function hmac(msg) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET must be set (at least 16 characters)");
  }
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return Buffer.from(sig).toString("hex");
}

function safeEq(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function checkPassword(pw) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) throw new Error("ADMIN_PASSWORD is not set");
  if (typeof pw !== "string") return false;
  // Compare fixed-length HMACs so timing does not reveal the password length.
  return safeEq(await hmac("p:" + pw), await hmac("p:" + real));
}

export async function makeToken() {
  const exp = Date.now() + WEEK;
  return `${exp}.${await hmac("s:" + exp)}`;
}

export async function verifyToken(token) {
  if (!token || typeof token !== "string") return false;
  const [exp, sig] = token.split(".");
  if (!/^\d+$/.test(exp || "") || Number(exp) < Date.now() || !sig) return false;
  return safeEq(sig, await hmac("s:" + exp));
}

export async function isAuthed() {
  try {
    const jar = await cookies();
    return await verifyToken(jar.get(COOKIE)?.value);
  } catch {
    return false;
  }
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: WEEK / 1000,
};

// Blocks cross-site form posts: the Origin header, when present, must match.
export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}
