import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthed, sameOrigin } from "../../../lib/auth";
import { listItems, createItem, countKind } from "../../../lib/db";
import { clean, KINDS } from "../../../lib/schema";

const deny = () => NextResponse.json({ error: "Not signed in" }, { status: 401 });

export async function GET() {
  if (!(await isAuthed())) return deny();
  try {
    return NextResponse.json({ items: await listItems() });
  } catch (e) {
    return NextResponse.json({ error: "Database error: " + e.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!(await isAuthed())) return deny();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const kind = body?.kind;
  if (!KINDS.includes(kind)) return NextResponse.json({ error: "Unknown kind" }, { status: 400 });

  const { data, error } = clean(kind, body.data);
  if (error) return NextResponse.json({ error }, { status: 400 });

  try {
    // The terminal window is a single item; edit it instead of adding another.
    if (kind === "hero" && (await countKind("hero")) > 0) {
      return NextResponse.json({ error: "Terminal window already exists; edit it instead" }, { status: 409 });
    }
    const item = await createItem(kind, data);
    revalidatePath("/");
    return NextResponse.json({ item }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Database error: " + e.message }, { status: 500 });
  }
}
