// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// console.log(import.meta.)
const firebaseConfig = {
  apiKey:"AIzaSyATJO1juo45uI3b0cRKB0SdA3BfbcsJyyQ",
  authDomain: "mern-blog-a4812.firebaseapp.com",
  projectId: "mern-blog-a4812",
  storageBucket: "mern-blog-a4812.appspot.com",
  messagingSenderId: "320729316699",
  appId: "1:320729316699:web:98f6cd405f9fb783f46e7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);