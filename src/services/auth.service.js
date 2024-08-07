import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const authService = {
    async register(username, email, password) {
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: email,
        role: 'user',
        username: username,
        userId: userCredential.user.uid
    });
    return userCredential.user;
    },

    async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async logout() {
    await signOut(auth);
  },

  async getUserRole(uid) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().role;
    }
    return null;
  }
}