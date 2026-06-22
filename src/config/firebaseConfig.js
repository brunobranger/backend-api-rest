import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "fake-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "local-dev.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "demo-no-project",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "local-dev.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "1:1234:web:1234",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

if (process.env.NODE_ENV === "development" || !process.env.FIREBASE_API_KEY) {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  console.log(
    "Conectado exitosamente al emulador local de Firestore (Puerto 8080)",
  );
}
