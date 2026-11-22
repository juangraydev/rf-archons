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

## Guilds and streamers

Edit `public/guilds/guilds.json` for Active Guilds. Each entry has a unique numeric `id`, `name`, `race`, numeric `members`, `leader`, and `emblemType` (`crown`, `flame`, `shield`, `zap`, `skull`, `crosshair`, `star`, or `swords`).

Edit `public/streamers/streamers.json` for Partnered Streamers. Each entry has a unique numeric `id`, `name`, boolean `live`, `viewers`, `platform`, `race`, Tailwind gradient classes in `color`, and `initials`. These files are imported at build time, so rebuild and redeploy after editing them.

## Crafting guide and drop list

Edit `public/crafting/crafting.json` for the Crafting Guide. Each recipe has a unique string `id`, `name`, `category`, `rarity`, `successRate`, `npc`, `race`, `tips`, and a `materials` array containing `item` and `qty` strings. Categories are generated from the recipes, and the first recipe is expanded by default.

Edit `public/droplist/droplist.json` for the Drop List. Each entry has a unique string `id`, `monster`, `type`, `zone`, numeric `level`, `respawn`, and a `drops` array containing `name`, `rate`, and `tier` strings. Set `type` to `PIT BOSS` for the pit boss filter; drop tiers `intense`, `talic`, and `currency` have distinct colors, while other tiers use the material color. Zones are generated from the entries.

Both files are imported at build time, so rebuild and redeploy after editing them.

## Background music

The site plays `public/Music/ost.mp3` on a loop. Browsers may block autoplay with sound; visitors can start or pause playback using the music button.

## Public links

Configure these values in `.env.local` for local development and in the build environment for deployment. See `.env.example` for the variable names. All `NEXT_PUBLIC_` values are public and are embedded at build time, so rebuild and redeploy after changing them.

- `NEXT_PUBLIC_DISCORD_URL`: Discord invite used by the home page and footer.
- `NEXT_PUBLIC_DOWNLOADS_ENABLED`: set to `true` to enable download links, or `false` to show Coming Soon.
- `NEXT_PUBLIC_DOWNLOAD_GOOGLE_DRIVE_URL`, `NEXT_PUBLIC_DOWNLOAD_MEGA_URL`, `NEXT_PUBLIC_DOWNLOAD_MEDIAFIRE_URL`: client mirror links. An enabled mirror without a URL displays Link unavailable.
- `NEXT_PUBLIC_GAMECP_LOGIN_URL` and `NEXT_PUBLIC_GAMECP_REGISTER_URL`: GameCP login and registration links.

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
