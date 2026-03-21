// Import the functions you need from the SDKs you need.
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration.
const firebaseConfig = {
  apiKey: "AIzaSyCXeOqxGuwaAg5txRkglQVGh7XTPzCU_Ic",
  authDomain: "astro-authentication-b551d.firebaseapp.com",
  projectId: "astro-authentication-b551d",
  storageBucket: "astro-authentication-b551d.firebasestorage.app",
  messagingSenderId: "480349032535",
  appId: "1:480349032535:web:bb22744f64dc20f2f75312"
};

// Initialize Firebase.
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

auth.languageCode = 'es';

export const firebase = {
    app,
    auth
};