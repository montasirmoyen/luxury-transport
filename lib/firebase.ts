import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6R_0EVrV09k9OLhvccYl2rQho-vz8z7k",
  authDomain: "luxtra-ead96.firebaseapp.com",
  projectId: "luxtra-ead96",
  storageBucket: "luxtra-ead96.firebasestorage.app",
  messagingSenderId: "521836196224",
  appId: "1:521836196224:web:a320f12c0456f0726dd165",
  measurementId: "G-ZC2G48E8L5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
