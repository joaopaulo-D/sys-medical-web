import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const config_prod = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_PROD,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_PROD,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL_PROD,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_PROD,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_PROD,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_PROD,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_PROD
}

const config_demo = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_DEMO,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DEMO,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL_DEMO,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_DEMO,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEMO,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEMO,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_DEMO,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_DEMO
}

const app = initializeApp(config_prod)

const storage = getStorage(app)
const database = getDatabase(app)
const auth = getAuth()

export { storage, auth, database }