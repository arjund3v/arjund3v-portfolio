import { isAuthed } from "../../lib/auth";
import { listItems } from "../../lib/db";
import Admin from "../../components/Admin";

export const metadata = { title: "Admin | Arjun Saini", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthed();
  let items = [];
  let error = "";
  if (authed) {
    try {
      items = await listItems();
    } catch (e) {
      error = "Database error: " + e.message;
    }
  }
  return <Admin authed={authed} initialItems={items} initialError={error} />;
}
