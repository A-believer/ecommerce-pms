import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDeR7fZ3LOkv6TICnpBb7-yemMIS__4yTg",
  authDomain: "ecommerceapp-1bae0.firebaseapp.com",
  projectId: "ecommerceapp-1bae0",
  storageBucket: "ecommerceapp-1bae0.appspot.com",
  messagingSenderId: "485315924225",
  appId: "1:485315924225:web:9ef684bc66773c69168b00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
export { auth, db, storage };