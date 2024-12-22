// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import { getStorage} from 'firebase/storage';

import dotenv from 'dotenv';

dotenv.config(); 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {apiKey: process.env.FIREBASE_apiKey,
//     authDomain: process.env.FIREBASE_authDomain, 
//     projectId: process.env.FIREBASE_projectId,
//     storageBucket: process.env.FIREBASE_storageBucket,
//     messagingSenderId: process.env.FIREBASE_messagingSenderId,
//     appId: process.env.FIREBASE_appId,
//     measurementId: process.env.FIREBASE_measurementId,
// }

const firebaseConfig = {
    apiKey: "AIzaSyA6tnEpUl7lxQ-T0htpaM5CSXtkjf0Bmhc",
    authDomain: "gdsc-db.firebaseapp.com",
    databaseURL: "https://gdsc-db-default-rtdb.firebaseio.com",
    projectId: "gdsc-db",
    storageBucket: "gdsc-db.firebasestorage.app",
    messagingSenderId: "326477529436",
    appId: "1:326477529436:web:97d9ebbbce09aa37ebc199",
    measurementId: "G-FEYEB9LCT3"
  };
  
console.log(firebaseConfig)
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// module.exports.database = getDatabase(app);
const fireStoreDB = getFirestore(firebaseApp)
const fireStorageDB = getStorage(firebaseApp)
export {firebaseApp, fireStoreDB, fireStorageDB};

