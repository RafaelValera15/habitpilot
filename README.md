# HabitPilot

HabitPilot is a Next.js + Firebase starter designed to help you build and track habits with real-time updates. It also provides AI-powered guidance to keep you motivated.

## Features

- 🔐 Firebase Authentication with email/password
- 📊 Firestore-backed habit tracking with streak calculations and real-time updates
- 🧠 AI insights powered by OpenAI (optional) for motivational nudges and improvement tips
- 📱 Mobile-first UI built with Tailwind CSS and reusable components
- ✅ Form validation via React Hook Form + Zod

## Running locally

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
4. Start the development server and open the app:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to view the marketing home page. From there you can sign up, sign in, and access the dashboard.

5. Sign in with an email/password account. New accounts are created via the **Sign Up** page and persisted in Firebase Authentication and Firestore.

6. Create habits from the dashboard. Habit cards update in real time thanks to Firestore listeners and streak calculations in `src/utils/helpers.ts`.

7. (Optional) To exercise the AI insights panel, add an OpenAI key and click **Generate insights** on the dashboard.

> **Tip:** If you prefer not to work against your production Firebase project, you can point the SDK to the Firebase Emulator Suite by updating the initialization code in `src/lib/firebase.ts`.

## Available scripts

- `npm run dev` – start the local development server
- `npm run lint` – run ESLint
- `npm run type-check` – run TypeScript compiler in no-emit mode
- `npm run build` – create a production build
- `npm run start` – start the production server

## Testing and quality checks

- `npm run lint` to ensure the codebase satisfies ESLint rules.
- `npm run type-check` to verify TypeScript types.
- (Optional) `npm run build` to confirm the app can produce a production bundle.

At the moment there are no Jest/unit tests configured. Add them if you need component-level or integration coverage.

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

## Preview and production deployment

### Vercel (automated)

1. Import the repository into Vercel if you have not already done so and confirm it is linked to your GitHub project.
2. Add the same environment variables you use locally (Firebase keys and `OPENAI_API_KEY`, if applicable) in the Vercel dashboard.
3. In your GitHub repository settings, define the following secrets using the values from the Vercel project settings:

   | Secret name         | Description |
   | ------------------- | ----------- |
   | `VERCEL_TOKEN`      | Personal deployment token generated in **Vercel › Account Settings › Tokens**. |
   | `VERCEL_ORG_ID`     | Organization ID from the **General** tab of the Vercel project. |
   | `VERCEL_PROJECT_ID` | Project ID from the **General** tab of the Vercel project. |

4. Push your changes to the `main` branch. The `CI & Deploy` GitHub Actions workflow will lint, type-check, build, and deploy to the Vercel production environment automatically. You can also trigger it manually via the **Actions** tab.
5. Monitor deployment progress either in the GitHub Actions run output or directly in Vercel.

### Firebase Hosting (optional)

Your Firebase Hosting instance can also serve the production build if you prefer. Run `npm run build` followed by `npm run start` to verify the compiled output before deploying.

## Next steps

- Configure Firebase security rules and enable the services you intend to use in production.
- Add analytics dashboards or charts to visualize streaks and completions.
- Implement push notifications, reminders, or AI-generated weekly summaries.
- Expand test coverage with Jest + React Testing Library.

---

Happy habit building! 🚀
