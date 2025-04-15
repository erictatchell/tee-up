
```text
.
├── README.md
├── app
│   ├── actions
│   │   └── sendMatchEmail.ts         # Sends emails using SendGrid
│   ├── api
│   │   ├── auth                      # Google OAuth endpoint
│   │   ├── conversations             # Twilio Conversations API (unused)
│   │   ├── get-filters               # Mock data from /data
│   │   ├── matches                   # Matchmaking logic
│   │   ├── twilio                    # Token retrieval (unused)
│   │   ├── update-filters
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
