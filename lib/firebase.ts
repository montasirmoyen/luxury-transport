import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "luxtra-ead96.firebaseapp.com",
  projectId: "luxtra-ead96",
  storageBucket: "luxtra-ead96.firebasestorage.app",
  messagingSenderId: "521836196224",
  appId: "1:521836196224:web:7c3a5607f25cd49a6dd165",
  measurementId: "G-KY1W9GK3YT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
