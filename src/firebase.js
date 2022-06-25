
//This is the initial configuration of firebase with react.

import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import firebaseConfig from "./config/firebaseConfig";


//This firebaseApp is a variable that can act as a entry point between our project and firebase.
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export {auth, db}