# Lume

Landing page for Lume (rings and bracelets) with a WhatsApp CTA and an admin
catalog area. See `DESIGN.md` for the full specification.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET
npm run db:push              # creates the products table
npm run dev
```

- Landing page: http://localhost:3000
- Admin: http://localhost:3000/admin

## Docker

`NEXT_PUBLIC_WHATSAPP_NUMBER` is inlined into the client bundle, so it is a
**build** argument; the other variables are passed at runtime.

```bash
# With compose (reads .env.local for both the build arg and runtime env)
docker compose --env-file .env.local up --build

# Or manually
docker build --build-arg NEXT_PUBLIC_WHATSAPP_NUMBER=5511972862664 -t lume .
docker run --env-file .env.local -p 3000:3000 lume
```

The container still uses the external Neon database and Vercel Blob — the
`neon-http` driver does not connect to a plain local Postgres.

## Deploy (Vercel)

1. Import the Git repo into Vercel (Next.js auto-detected).
2. Add the **Neon Postgres** and **Blob** integrations (they set `DATABASE_URL`
   and `BLOB_READ_WRITE_TOKEN`).
3. Set `ADMIN_PASSWORD`, `SESSION_SECRET` and `NEXT_PUBLIC_WHATSAPP_NUMBER`
   in Project Settings → Environment Variables.
4. Run `npm run db:push` once with the production `DATABASE_URL`.
5. Push to `main` to deploy.
