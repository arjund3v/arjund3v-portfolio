# Arjun Saini – Portfolio

Next.js + Neon Postgres. Edit everything at `/admin` (password protected).

## Setup
1. Put your resume at `public/Arjun_Saini_Resume.pdf`.
2. Push this folder to your GitHub repo (replace old files). Vercel redeploys.
3. Vercel → project → Storage → Create → Neon Postgres → connect to the project. This adds `DATABASE_URL`.
4. Vercel → Settings → Environment Variables, add:
   - `ADMIN_PASSWORD` = your password
   - `SESSION_SECRET` = output of `openssl rand -hex 32` (any long random string)
5. Redeploy. Open `/admin`, sign in, edit anything.

First visit seeds the database from `data/content.json`. After that the database is the source of truth.

## Local dev
Copy `.env.example` to `.env.local`, fill it in, `npm install`, `npm run dev`.
