// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEXWjf7hzusZ79XEJk4kt0wv_1h3-zVi4",
  authDomain: "video-player-md.firebaseapp.com",
  projectId: "video-player-md",
  storageBucket: "video-player-md.appspot.com",
  messagingSenderId: "273552662433",
  appId: "1:273552662433:web:b54162a22e930c592175e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };
export default app;
