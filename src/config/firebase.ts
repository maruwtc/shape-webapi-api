import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import admin from "firebase-admin"
import { config } from "../../config"

const firebaseConfig = {
  apiKey: config.firebase_apiKey,
  authDomain: config.firebase_authDomain,
  projectId: config.firebase_projectId,
  storageBucket: config.firebase_storageBucket,
  messagingSenderId: config.firebase_messagingSenderId,
  appId: config.firebase_appId
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const adminAuth = admin.initializeApp(firebaseConfig)

export { auth, adminAuth }