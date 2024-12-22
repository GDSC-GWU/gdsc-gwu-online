// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import { getStorage} from 'firebase/storage';

import dotenv from 'dotenv';

dotenv.config(); 

const firebaseConfig = {apiKey: process.env.FIREBASE_apiKey,
    authDomain: process.env.FIREBASE_authDomain, 
    projectId: process.env.FIREBASE_projectId,
    storageBucket: process.env.FIREBASE_storageBucket,
    messagingSenderId: process.env.FIREBASE_messagingSenderId,
    appId: process.env.FIREBASE_appId,
    measurementId: process.env.FIREBASE_measurementId,
}


const firebaseApp = initializeApp(firebaseConfig);
const fireStoreDB = getFirestore(firebaseApp); //Fire store. To do CRUD on documents
const fireStorageDB = getStorage(firebaseApp); //Fire storage. TO do CRUD on media
export {firebaseApp, fireStoreDB, fireStorageDB};

