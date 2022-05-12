// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMQ7au1aeoK_3xUzN8ttk_1NGskjM813o",
    authDomain: "unipe-3ab5f.firebaseapp.com",
    projectId: "unipe-3ab5f",
    storageBucket: "unipe-3ab5f.appspot.com",
    messagingSenderId: "1011475246517",
    appId: "1:1011475246517:web:f39c544cb6e6e0a090fdfc",
    measurementId: "G-RGT6M8X8E9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default db;
