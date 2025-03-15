// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {collection,getFirestore} from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6KXRpL6u4xo9hdNw7qkGqmolyQ1MxOAk",
  authDomain: "skillfusion-82966.firebaseapp.com",
  projectId: "skillfusion-82966",
  storageBucket: "skillfusion-82966.firebasestorage.app",
  messagingSenderId: "1097885291834",
  appId: "1:1097885291834:web:b9ca264e57fad3ea066c03",
  measurementId: "G-Z1QZ54H761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app)

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
// export default firebaseConfig