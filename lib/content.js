import { listItems } from "./db";
import { starterItems } from "./starter";

// What the public page shows. If the database is not configured yet (first
// deploy) or is unreachable, it falls back to the starter content in
// data/content.json so the site never shows an error page.

function group(items) {
  const g = { work: [], education: [], skills: [], projects: [], hero: [] };
  for (const it of items) if (g[it.kind]) g[it.kind].push(it);
  g.skills.sort((a, b) => a.sort - b.sort);
  return g;
}

export async function getContent() {
  try {
    return group(await listItems());
  } catch (e) {
    console.error("Database unavailable, using starter content:", e.message);
    return group(
      starterItems()
        .map((s, i) => ({ id: "starter" + i, kind: s.kind, sort: s.sort, ...s.data }))
        .sort((a, b) => b.sort - a.sort)
    );
  }
}
