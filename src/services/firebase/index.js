// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAyYjFjtnkUjE_0kOiXc13d-wrSfBUSbU",
  authDomain: "meggames-30153.firebaseapp.com",
  projectId: "meggames-30153",
  storageBucket: "meggames-30153.appspot.com",
  messagingSenderId: "274774492515",
  appId: "1:274774492515:web:13c869d01f7419b7cd7f56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoreDb = getFirestore(app)