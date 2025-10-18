import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
  type Analytics,
} from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ==============================
// 🔧 Firebase Config
// ==============================
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


// Declare these ONCE
let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

// Get or initialize Firebase App
export const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    if (firebaseConfig.projectId) {
      app = initializeApp(firebaseConfig);
    } else {
      console.warn("⚠️ Firebase environment variables not found. Skipping Firebase initialization.");
    }
  }
  return app!;
};

// Get analytics safely
export const getFirebaseAnalytics = async (): Promise<Analytics | null> => {
  if (analytics) return analytics;

  const firebaseApp = getFirebaseApp();
  if (typeof window === "undefined") return null;
  if (!(await isAnalyticsSupported())) return null;

  analytics = getAnalytics(firebaseApp);
  return analytics;
};

// ==============================
// 🔥 Initialize Firestore & Auth
// ==============================
export const db = getFirestore(getFirebaseApp()); // ✅ Add this
export const auth = getAuth(getFirebaseApp()); // ✅ Keep this
