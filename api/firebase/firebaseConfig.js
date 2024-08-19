import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD-lbpOqHmq2BDpO4Xr6hVl1ff03htQHbQ",
  authDomain: "finovate-app.firebaseapp.com",
  projectId: "finovate-app",
  storageBucket: "finovate-app.appspot.com",
  messagingSenderId: "855591663177",
  appId: "1:855591663177:web:af6d93f7e37e5e75303198",
  measurementId: "G-ZXXYXQ2WTH"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


export const db = getFirestore(app);

// const User=db.collection("users")