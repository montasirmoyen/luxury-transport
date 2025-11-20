import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error(
    "missing NEXT_PUBLIC_FIREBASE_API_KEY in your .env file"
  );
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "luxtra-ead96.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "luxtra-ead96",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "luxtra-ead96.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "521836196224",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:521836196224:web:7c3a5607f25cd49a6dd165",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-KY1W9GK3YT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
