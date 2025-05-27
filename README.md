This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev # opens on port 3000
yarn dev-2 # opens on port 3001
```

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Details

- Tailwind + Daisyui for styling
- Uses firebase authentication (email/password)
- Deployed on Vercel [https://echopad.vercel.app](https://echopad.vercelapp)
- Has PWA support enabled

## Authentication

```js
const { user, loading } = useAuth();
```

## PWA Support

- `useInstallPWA` hook in `src/hooks/use-install-pwa.tsx` is used to handle installation of PWA
