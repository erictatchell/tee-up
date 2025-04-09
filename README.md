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

```text
.
├── README.md
├── app
│   ├── actions
│   │   └── sendMatchEmail.ts         # Sends emails using SendGrid
│   ├── api
│   │   ├── auth                      # Google OAuth endpoint
│   │   ├── conversations             # Twilio Conversations API (unused)
│   │   ├── get-filters               # Mock data from /data (unused)
│   │   ├── matches                   # Matchmaking logic
│   │   ├── twilio                    # Token retrieval for Conversations with Web Sockets (unused)
│   │   ├── update-filters            # Updating mock filter data (unused)
│   │   └── upload                    # Profile picture uploads
│   ├── components
│   │   ├── conversations             # DM components
│   │   ├── file                      # S3 upload logic
│   │   ├── login                     # Google Sign-In button
│   │   ├── misc
│   │   └── queue                     # Profile cards
│   ├── conversations
│   │   ├── [conversationSid]         # Individual chat page
│   │   └── page.tsx                  # Conversation init
│   ├── favicon.ico
│   ├── globals.css
│   ├── home.tsx
│   ├── layout.tsx
│   ├── onboarding                    # New user flow
│   ├── page.tsx
│   ├── profile                       # Profile edit/view
│   └── queue                         # Queue logic
├── auth.ts
├── data                              # Mock data
│   ├── filters.json
│   └── users.json
├── env
├── eslint.config.mjs
├── migrations
│   ├── 20250214162242_init
│   ├── 20250314024807_update_schema_1
│   ├── 20250314061555_gender_int
│   ├── 20250314200150_nothing_can_be_null
│   ├── 20250315001051_defaults
│   ├── 20250325091320_add_onboarding_status
│   ├── 20250401224722_default_photo
│   └── migration_lock.toml
├── nav-client.tsx
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma
│   └── seed.ts
├── prisma.ts
├── public
│   ├── file.svg
│   ├── filters.json
│   ├── globe.svg
│   ├── images
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── schema.prisma
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── types
│   └── next-auth.d.ts
└── types.tsx
```