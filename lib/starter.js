import data from "../data/content.json";

// Starter content (data/content.json) as a flat list with sort values.
// It fills an empty database the first time, and is shown by the site if the
// database is not connected yet. Lists sort newest-first by `sort`, except
// skills, which keep the order they are written in.
export function starterItems() {
  const items = [];
  for (const kind of ["work", "education", "projects"]) {
    const list = data[kind] || [];
    list.forEach((d, i) => items.push({ kind, sort: list.length - i, data: d }));
  }
  (data.skills || []).forEach((d, i) => items.push({ kind: "skills", sort: i + 1, data: d }));
  if (data.hero) items.push({ kind: "hero", sort: 1, data: data.hero });
  return items;
}
