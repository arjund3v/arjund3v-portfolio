"use client";

import { useState } from "react";
import { FIELDS, KINDS, TITLES } from "../lib/schema";
import { dateText, isFeatured } from "../lib/format";

async function api(path, opts = {}) {
  const r = await fetch(path, {
    ...opts,
    headers: { "content-type": "application/json", ...(opts.headers || {}) },
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || "Request failed (" + r.status + ")");
  return j;
}

function summary(kind, it) {
  switch (kind) {
    case "work":
      return { title: `${it.role} @ ${it.company}`, sub: dateText(it) };
    case "education":
      return { title: `${it.program} @ ${it.school}`, sub: dateText(it) };
    case "skills":
      return { title: it.name, sub: "" };
    case "projects":
      return { title: (isFeatured(it) ? "★ " : "") + it.title, sub: it.tech };
    default:
      return { title: it.file || "bash", sub: String(it.content || "").slice(0, 160) };
  }
}

function Login({ onDone }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await api("/api/login", { method: "POST", body: JSON.stringify({ password: pw }) });
      onDone();
    } catch (ex) {
      setErr(ex.message);
      setBusy(false);
    }
  }

  return (
    <form className="login" onSubmit={submit}>
      <h1>admin login</h1>
      <input
        type="password"
        autoFocus
        autoComplete="current-password"
        placeholder="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        aria-label="Password"
      />
      <button className="btn p" disabled={busy || !pw}>
        {busy ? "checking…" : "sign in"}
      </button>
      {err ? <div className="err">{err}</div> : null}
    </form>
  );
}

export default function Admin({ authed: authedProp, initialItems, initialError }) {
  const [authed, setAuthed] = useState(authedProp);
  const [items, setItems] = useState(initialItems || []);
  const [tab, setTab] = useState("work");
  const [edit, setEdit] = useState(null); // { id?, kind, values }
  const [err, setErr] = useState(initialError || "");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const j = await api("/api/items");
    setItems(j.items);
  }

  async function onLogin() {
    setAuthed(true);
    try {
      await refresh();
    } catch (e) {
      setErr(e.message);
    }
  }

  async function logout() {
    await api("/api/logout", { method: "POST", body: "{}" }).catch(() => {});
    setAuthed(false);
    setItems([]);
  }

  function openForm(kind, it) {
    const values = {};
    for (const f of FIELDS[kind]) values[f.key] = it?.[f.key] ?? "";
    setErr("");
    setEdit({ id: it?.id, kind, values });
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (edit.id) {
        await api("/api/items/" + edit.id, { method: "PUT", body: JSON.stringify({ data: edit.values }) });
      } else {
        await api("/api/items", { method: "POST", body: JSON.stringify({ kind: edit.kind, data: edit.values }) });
      }
      await refresh();
      setEdit(null);
    } catch (ex) {
      setErr(ex.message);
    }
    setBusy(false);
  }

  async function remove(it) {
    if (!window.confirm("Delete this entry? This cannot be undone.")) return;
    setErr("");
    try {
      await api("/api/items/" + it.id, { method: "DELETE" });
      await refresh();
    } catch (ex) {
      setErr(ex.message);
    }
  }

  if (!authed) {
    return (
      <div className="aw">
        <Login onDone={onLogin} />
      </div>
    );
  }

  let rows = items.filter((i) => i.kind === tab);
  if (tab === "skills") rows = [...rows].sort((a, b) => a.sort - b.sort);
  const canAdd = !(tab === "hero" && rows.length > 0);

  return (
    <div className="aw">
      <div className="top">
        <h1>admin</h1>
        <a className="btn" href="/">view site</a>
        <button className="btn sp" onClick={logout}>sign out</button>
      </div>

      <div className="tabs" role="tablist">
        {KINDS.map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => { setTab(k); setErr(""); }}>
            {TITLES[k]}
          </button>
        ))}
      </div>

      {tab === "hero" ? (
        <p className="note">This is the green terminal under your intro. Changes show on the site within a few seconds.</p>
      ) : tab === "skills" ? (
        <p className="note">New skills are added at the end of the list.</p>
      ) : (
        <p className="note">Newest entries are shown first. Leave the end date blank for something current.</p>
      )}

      {canAdd ? (
        <p>
          <button className="btn p" onClick={() => openForm(tab)}>+ add</button>
        </p>
      ) : null}

      {err && !edit ? <div className="err">{err}</div> : null}

      <div style={{ marginTop: 16 }}>
        {rows.length === 0 ? <div className="msg">Nothing here yet.</div> : null}
        {rows.map((it) => {
          const s = summary(tab, it);
          return (
            <div className="row" key={it.id}>
              <div style={{ minWidth: 0 }}>
                <b>{s.title}</b>
                {s.sub ? <small>{s.sub}</small> : null}
              </div>
              <div className="acts">
                <button onClick={() => openForm(tab, it)}>edit</button>
                {tab !== "hero" ? (
                  <button className="del" onClick={() => remove(it)}>delete</button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {edit ? (
        <div className="ov" onMouseDown={(e) => { if (e.target === e.currentTarget && !busy) setEdit(null); }}>
          <form className="dlg" onSubmit={save}>
            <div className="g">{edit.id ? "Edit" : "Add"} {TITLES[edit.kind].toLowerCase()}</div>
            {FIELDS[edit.kind].map((f) => (
              <label key={f.key}>
                {f.label}
                {f.type === "textarea" ? (
                  <textarea
                    rows={f.big ? 10 : 3}
                    value={edit.values[f.key]}
                    onChange={(e) => setEdit({ ...edit, values: { ...edit.values, [f.key]: e.target.value } })}
                  />
                ) : (
                  <input
                    value={edit.values[f.key]}
                    required={f.required}
                    onChange={(e) => setEdit({ ...edit, values: { ...edit.values, [f.key]: e.target.value } })}
                  />
                )}
              </label>
            ))}
            {err ? <div className="err">{err}</div> : null}
            <div className="actions">
              <button type="button" className="btn" disabled={busy} onClick={() => setEdit(null)}>cancel</button>
              <button className="btn p" disabled={busy}>{busy ? "saving…" : "save"}</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
