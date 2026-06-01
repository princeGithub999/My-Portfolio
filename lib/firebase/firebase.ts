import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkKIHKdml9Yx6yHMaam3Cd7H2K2X8oUYY",
  authDomain: "fir-1-12232.firebaseapp.com",
  databaseURL: "https://fir-1-12232-default-rtdb.firebaseio.com",
  projectId: "fir-1-12232",
  storageBucket: "fir-1-12232.appspot.com",
  messagingSenderId: "1091153234448",
  appId: "1:1091153234448:web:d0e7dd57bb3a9bf013d895",
  measurementId: "G-5CKX8C987N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);    