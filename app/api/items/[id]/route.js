import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed, sameOrigin } from "../../../../lib/auth";
import { getItem, updateItem, deleteItem } from "../../../../lib/db";
import { clean } from "../../../../lib/schema";

const deny = () => NextResponse.json({ error: "Not signed in" }, { status: 401 });
const bad = (m, s = 400) => NextResponse.json({ error: m }, { status: s });

export async function PUT(req, ctx) {
  if (!sameOrigin(req)) return bad("Forbidden", 403);
  if (!(await isAuthed())) return deny();
  const { id } = await ctx.params;
  if (!/^\d{1,18}$/.test(id)) return bad("Bad id");

  let body;
  try {
    body = await req.json();
  } catch {
    return bad("Bad request");
  }

  try {
    const existing = await getItem(id);
    if (!existing) return bad("Not found", 404);
    const { data, error } = clean(existing.kind, body?.data);
    if (error) return bad(error);
    const item = await updateItem(id, data);
    revalidatePath("/");
    return NextResponse.json({ item });
  } catch (e) {
    return bad("Database error: " + e.message, 500);
  }
}

export async function DELETE(req, ctx) {
  if (!sameOrigin(req)) return bad("Forbidden", 403);
  if (!(await isAuthed())) return deny();
  const { id } = await ctx.params;
  if (!/^\d{1,18}$/.test(id)) return bad("Bad id");

  try {
    const existing = await getItem(id);
    if (!existing) return bad("Not found", 404);
    if (existing.kind === "hero") return bad("The terminal window can be edited but not deleted", 409);
    await deleteItem(id);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return bad("Database error: " + e.message, 500);
  }
}
