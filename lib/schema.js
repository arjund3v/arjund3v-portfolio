// Shared field definitions for every kind of content.
// Used by the admin form (labels, input types) and by the API (validation).

export const KINDS = ["work", "education", "skills", "projects", "hero"];

export const FIELDS = {
  work: [
    { key: "role", label: "Role", required: true },
    { key: "company", label: "Company", required: true },
    { key: "start", label: "Start date (e.g. May 2026)" },
    { key: "end", label: "End date (leave blank if current)" },
    { key: "detail", label: "Details", type: "textarea" },
  ],
  education: [
    { key: "program", label: "Program", required: true },
    { key: "school", label: "School", required: true },
    { key: "start", label: "Start date (e.g. Sep 2024)" },
    { key: "end", label: "End date (leave blank if current)" },
    { key: "detail", label: "Details (GPA, etc.)", type: "textarea" },
  ],
  skills: [{ key: "name", label: "Skill", required: true }],
  projects: [
    { key: "title", label: "Title", required: true },
    { key: "tech", label: "Tech (comma or · separated, e.g. Java, Swing)" },
    { key: "desc", label: "Short summary", type: "textarea" },
    { key: "overview", label: "Overview (shown when the project is opened)", type: "textarea" },
    { key: "github", label: "GitHub URL", url: true },
    { key: "demo", label: "Live demo URL (optional)", url: true },
    { key: "featured", label: "Featured? (type yes to list it first)" },
  ],
  hero: [
    { key: "file", label: "Window title (e.g. bash)" },
    {
      key: "content",
      label:
        "Terminal lines, one per row. Start a line with $ for a command, or with label: for a highlighted label.",
      type: "textarea",
      big: true,
    },
  ],
};

export const TITLES = {
  work: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  hero: "Terminal window",
};

const MAX = 2000;
const MAX_BIG = 4000;

// Returns { data } with a cleaned object, or { error } with a message.
export function clean(kind, input) {
  if (!FIELDS[kind]) return { error: "Unknown kind" };
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "Body must be an object" };
  }
  const out = {};
  for (const f of FIELDS[kind]) {
    let v = input[f.key];
    if (v === undefined || v === null) v = "";
    if (typeof v !== "string") return { error: `${f.label}: must be text` };
    v = f.big ? v.replace(/\r\n/g, "\n").trim() : v.trim();
    if (v.length > (f.big ? MAX_BIG : MAX)) return { error: `${f.label}: too long` };
    if (f.required && !v) return { error: `${f.label} is required` };
    if (f.url && v && !/^https?:\/\//i.test(v)) {
      return { error: `${f.label} must start with http:// or https://` };
    }
    out[f.key] = v;
  }
  return { data: out };
}
