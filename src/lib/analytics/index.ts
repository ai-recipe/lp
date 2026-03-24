import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

/**
 * Initializes Firebase Analytics.
 * This function is browser-only and handles SSR safety internally.
 */
export async function initAnalytics() {
  if (typeof window === 'undefined') return;

  // No-op if env is incomplete (dev-friendly)
  if (!firebaseConfig.apiKey || !firebaseConfig.appId) {
    console.warn("Firebase config is incomplete. Skipping analytics initialization.");
    return;
  }

  try {
    if (!app) {
      app = initializeApp(firebaseConfig);
    }
    
    const supported = await isSupported();
    if (supported && !analytics) {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.error("Failed to initialize Firebase Analytics:", error);
  }
}

/**
 * Logs a custom event to Firebase Analytics.
 * @param name Event name
 * @param params Optional event parameters
 */
export function logAnalyticsEvent(name: string, params?: Record<string, any>) {
  if (analytics) {
    logEvent(analytics, name, params);
  }
}

// Optional: Recommend event names for consistency
export const AnalyticsEvents = {
  PAGE_CONTEXT: 'page_context',
  STORE_CLICK: 'store_download_click',
} as const;
