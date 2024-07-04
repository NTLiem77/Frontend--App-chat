import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDcJ6OdONHAhrU4rOb7hIFPqi55BddHMkg",
    authDomain: "uploadingfile-eb7e8.firebaseapp.com",
    projectId: "uploadingfile-eb7e8",
    storageBucket: "uploadingfile-eb7e8.appspot.com",
    messagingSenderId: "917254235172",
    appId: "1:917254235172:web:2f243975f95053c772e4b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)