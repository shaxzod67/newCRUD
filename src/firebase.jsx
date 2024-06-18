import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDL1s_4JuIef52lW6MVm5Zy-l0exrvvlh4",
  authDomain: "newcrud-f9932.firebaseapp.com",
  projectId: "newcrud-f9932",
  storageBucket: "newcrud-f9932.appspot.com",
  messagingSenderId: "777127572651",
  appId: "1:777127572651:web:ba0ead606a6e300518f3ee",
  measurementId: "G-SCZS206XNT"
};

const app = initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(app);

// Export the Firestore instance for use in your application
export { db };