# MCP Observability

This project is a minimal example of a SaaS style application for managing and testing MCP servers. It is built with [Next.js](https://nextjs.org/) and uses a serverless Postgres database.

## Development

1. Install dependencies (requires Node.js 18+)

```bash
pnpm install
```

2. Create a Postgres database and set the `DATABASE_URL` environment variable. When running locally you can add a `.env.local` file with:

```
DATABASE_URL=postgres://user:pass@host/dbname
PGSSL=true
```

3. Start the development server:

```bash
pnpm dev
```

Open <http://localhost:3000> in your browser to see the app.

## Notes

The API route in `pages/api/servers.ts` stores server names and URLs in a table called `servers`. You must create this table in your database:

```sql
CREATE TABLE servers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL
);
```

This project is intentionally small and meant as a starting point for building an observability and testing platform for MCP servers, similar to Postman but specialized for MCP.
