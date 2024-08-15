import { db } from '@/firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc
} from 'firebase/firestore';

const storage = getStorage();

export const productService = {
  async getAllProducts() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getProductById(id) {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  async addProduct(id,productData) {
    try {
      await setDoc(doc(db, 'products', id), productData);
      
    } catch (error) {
      console.error('Error adding product: ', error);
      throw error;
    }
  },

  async updateProduct(id, productData) {
    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, productData);
    } catch (error) {
      console.error('Error updating product: ', error);
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error('Error deleting product: ', error);
      throw error;
    }
  },

  async uploadProductImage(file) {
    try {
      const fileRef = storageRef(storage, `product-images/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image: ', error);
      throw error;
    }
  }
};