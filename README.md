This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## News and events

Edit `public/news/news.json` to update the News & Events section. Each item needs a unique numeric `id`, a `category` (`NEWS`, `EVENTS`, or `UPDATES`), `date`, `title`, `summary`, and `details`. The first item with `id` 1 is expanded by default. Rebuild and redeploy after changing the file.

## Cloudflare deployment

The Wrangler configuration targets the `rf-archons` Worker. If the Worker name changes, update both `name` and `services[0].service` in `wrangler.jsonc` so the self-reference matches.

In Cloudflare Workers Builds, set the build command to `npm run build:cloudflare` and the deploy command to `npm run deploy:cloudflare`. The OpenNext build runs the regular Next.js build and generates `.open-next/worker.js`; the deploy command uploads that output and populates the cache.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
