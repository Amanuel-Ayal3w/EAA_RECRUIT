# EAA Recruit

EAA Recruit is a Next.js 16 application for Ethiopian Aviation Academy recruitment workflows.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript
- pnpm (recommended package manager)

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

Open http://localhost:3000 in your browser.

## CI and Lockfile Notes

CI usually runs installs with frozen lockfile behavior. If `package.json` and `pnpm-lock.yaml` are out of sync, install will fail.

Expected fix workflow:

```bash
pnpm install --no-frozen-lockfile
```

Then commit the updated `pnpm-lock.yaml`.

## Useful Links

- Next.js docs: https://nextjs.org/docs
- v0 docs: https://v0.app/docs
