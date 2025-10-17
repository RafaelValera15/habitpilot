# HabitPilot

HabitPilot is a Next.js + Firebase starter designed to help you build and track habits with real-time updates and AI-powered guidance.

## Features

- 🔐 Firebase Authentication with email/password
- 📊 Firestore-backed habit tracking with streak calculations and real-time updates
- 🧠 AI insights powered by OpenAI (optional) for motivational nudges and improvement tips
- 📱 Mobile-first UI built with Tailwind CSS and reusable components
- ✅ Form validation via React Hook Form + Zod

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file using your Firebase credentials:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
3. (Optional) Enable AI insights by adding an OpenAI key:
   ```bash
   OPENAI_API_KEY=sk-your-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Available scripts

- `npm run dev` – start the local development server
- `npm run lint` – run ESLint
- `npm run type-check` – run TypeScript compiler in no-emit mode
- `npm run build` – create a production build
- `npm run start` – start the production server

## Project structure

```
src/
 ├─ app/
 │   ├─ api/ai/route.ts      # AI insight API route
 │   ├─ dashboard/page.tsx   # Protected dashboard
 │   ├─ signin/page.tsx      # Sign in view
 │   ├─ signup/page.tsx      # Sign up view
 │   ├─ layout.tsx           # Global layout + providers
 │   └─ page.tsx             # Marketing home page
 ├─ components/              # UI components and dashboard pieces
 ├─ contexts/                # Auth context provider
 ├─ lib/                     # Firebase/Firestore helpers
 └─ utils/                   # Shared utilities (streak calculation, formatting)
```

## Deployment

Deploy to Vercel and remember to add the Firebase environment variables (and `OPENAI_API_KEY` if you want AI insights) to your project settings. Firestore rules should restrict access so that users can only read/write their own habit data.

---

Happy habit building! 🚀
