import {initializeApp} from 'firebase/app' 
import * as dotenv from 'dotenv';
//import { getStorage } from 'firebase/storage';


dotenv.config()

export function firebaseInitializeApp(){
    const service_acount = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    }

    
    initializeApp(service_acount)
    
}

