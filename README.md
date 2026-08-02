# Pacific Market Insights

Pacific Market Insights publishes business articles, equity research, and presentation-led market analysis.
The application is built with Next.js, React, Prisma, PostgreSQL, and Tailwind CSS.

[View the production site](https://www.pacificmarketinsights.online/)

## Features

- Business articles with embedded document previews
- Dedicated research deck and slide libraries
- Presentation detail pages with inline PDF viewing and downloads
- Database-backed author and publication data
- Responsive navigation and layouts for desktop and mobile devices

## Tech stack

- Next.js 15 and React 19
- TypeScript
- Tailwind CSS
- Prisma with PostgreSQL and optional Prisma Accelerate support
- Vercel for production hosting

## Local development

Install dependencies:

```bash
pnpm install
```

Add `DATABASE_URL` to a local `.env` file when working with database-backed articles and authors.
Presentation pages include local fallback data so they can be developed without a database connection.

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

Run the project checks before publishing changes:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Validate and deploy database migrations with a direct PostgreSQL connection:

```bash
pnpm prisma validate
pnpm prisma migrate deploy
```

## Deployment

Pushes to `main` deploy to the production Vercel project.
The production domain is [www.pacificmarketinsights.online](https://www.pacificmarketinsights.online/).
