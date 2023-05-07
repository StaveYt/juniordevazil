import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyD9k0Gr9sJcY6giDvJgKWKi_kXdJmvpE5I",

  authDomain: "juniordevazil.firebaseapp.com",

  projectId: "juniordevazil",

  storageBucket: "juniordevazil.appspot.com",

  messagingSenderId: "998647436463",

  appId: "1:998647436463:web:5592f0912c16f88137305a",

  measurementId: "G-39YWDMRYYK"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const db = getFirestore(app);