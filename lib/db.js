import pg from "pg";
import { starterItems } from "./starter";

const g = globalThis;

function pool() {
  if (!g.__pgPool) {
    const cs = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!cs) throw new Error("DATABASE_URL is not set");
    const local = /@(localhost|127\.0\.0\.1)[:/]/.test(cs);
    g.__pgPool = new pg.Pool({
      connectionString: cs,
      max: Number(process.env.PG_POOL_MAX) || 3,
      idleTimeoutMillis: 10000,
      ssl: local ? false : undefined,
    });
  }
  return g.__pgPool;
}

async function init() {
  const client = await pool().connect();
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS items (
      id BIGSERIAL PRIMARY KEY,
      kind TEXT NOT NULL,
      sort BIGINT NOT NULL DEFAULT 0,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`);
    await client.query("CREATE INDEX IF NOT EXISTS items_kind_idx ON items (kind)");
    await client.query("CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY)");

    // Seed once, ever: the meta flag stops deleted items from coming back.
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(7001)");
    const flag = await client.query(
      "INSERT INTO meta (key) VALUES ('seeded') ON CONFLICT DO NOTHING RETURNING key"
    );
    if (flag.rowCount === 1) {
      for (const it of starterItems()) {
        await client.query(
          "INSERT INTO items (kind, sort, data) VALUES ($1, $2, $3::jsonb)",
          [it.kind, it.sort, JSON.stringify(it.data)]
        );
      }
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK").catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}

export function ready() {
  if (!g.__dbReady) {
    g.__dbReady = init().catch((e) => {
      g.__dbReady = null;
      throw e;
    });
  }
  return g.__dbReady;
}

const shape = (r) => ({ id: r.id, kind: r.kind, sort: Number(r.sort), ...r.data });

export async function listItems() {
  await ready();
  const { rows } = await pool().query(
    "SELECT id::text AS id, kind, sort, data FROM items ORDER BY sort DESC, id DESC"
  );
  return rows.map(shape);
}

export async function createItem(kind, data) {
  await ready();
  const { rows } = await pool().query(
    "INSERT INTO items (kind, sort, data) VALUES ($1, $2, $3::jsonb) RETURNING id::text AS id, kind, sort, data",
    [kind, Date.now(), JSON.stringify(data)]
  );
  return shape(rows[0]);
}

export async function updateItem(id, data) {
  await ready();
  const { rows } = await pool().query(
    "UPDATE items SET data = $2::jsonb WHERE id = $1 RETURNING id::text AS id, kind, sort, data",
    [id, JSON.stringify(data)]
  );
  return rows[0] ? shape(rows[0]) : null;
}

export async function getItem(id) {
  await ready();
  const { rows } = await pool().query(
    "SELECT id::text AS id, kind, sort, data FROM items WHERE id = $1",
    [id]
  );
  return rows[0] ? shape(rows[0]) : null;
}

export async function deleteItem(id) {
  await ready();
  const r = await pool().query("DELETE FROM items WHERE id = $1", [id]);
  return r.rowCount > 0;
}

export async function countKind(kind) {
  await ready();
  const { rows } = await pool().query("SELECT count(*)::int AS n FROM items WHERE kind = $1", [kind]);
  return rows[0].n;
}
