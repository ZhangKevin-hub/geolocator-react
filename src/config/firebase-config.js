// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO53z9HhGfXrz6-iqZKv4gY_N4TUAyGSE",
  authDomain: "clicker-fa613.firebaseapp.com",
  projectId: "clicker-fa613",
  storageBucket: "clicker-fa613.appspot.com",
  messagingSenderId: "56300897409",
  appId: "1:56300897409:web:e10e1851e0c7c350667980",
  measurementId: "G-LZN86C7FMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };