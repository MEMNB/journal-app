// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_apiKey, 
  VITE_authDomain,
  VITE_projectId,
  VITE_storageBucket,
  VITE_messagingSenderId,
  VITE_appId,
} = getEnvironments();

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyCPuuxwNkwB4hG6XbXrNP_YaugX7npcPZY",
  authDomain: "react-cursos-ceb18.firebaseapp.com",
  projectId: "react-cursos-ceb18",
  storageBucket: "react-cursos-ceb18.appspot.com",
  messagingSenderId: "226880473871",
  appId: "1:226880473871:web:6749ec1cb93a8494810c7a"
};*/

const firebaseConfig = {
  apiKey: VITE_apiKey,
  authDomain: VITE_authDomain,
  projectId: VITE_projectId,
  storageBucket: VITE_storageBucket,
  messagingSenderId: VITE_messagingSenderId,
  appId: VITE_appId,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);