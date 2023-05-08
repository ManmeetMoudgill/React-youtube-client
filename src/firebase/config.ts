// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_API_KEY}`,
  authDomain: `${process.env.REACT_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_API_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };
export default app;
