// Pure helpers, safe to import from both server and client components.

export const isCurrent = (d) => !d.end || /^(present|now|current)$/i.test(d.end.trim());

export const dateText = (d) =>
  d.start ? `${d.start} – ${d.end || "Present"}` : d.end || "Present";

export const techChips = (tech) =>
  String(tech || "")
    .split(/[·,/|]/)
    .map((x) => x.trim())
    .filter(Boolean);

export const safeUrl = (u) => (/^https?:\/\//i.test(u || "") ? u : "");

export const shortUrl = (u) => String(u || "").replace(/^https?:\/\//, "").replace(/\/$/, "");

export const isFeatured = (p) => /^(y|yes|true)$/i.test((p.featured || "").trim());
