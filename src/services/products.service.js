import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebaseConfig.js";
import Product from "../models/Product.js";

export const productsService = {
  getAll: async () => {
    const productsRef = collection(db, "products").withConverter(
      Product.converter,
    );
    const querySnapshot = await getDocs(productsRef);
    return querySnapshot.docs.map((doc) => doc.data());
  },

  getById: async (id) => {
    const productRef = doc(db, "products", id).withConverter(Product.converter);
    const docSnapshot = await getDoc(productRef);
    if (!docSnapshot.exists()) return null;
    return docSnapshot.data();
  },

  create: async (productData) => {
    const { name, price, category, stock, description } = productData;
    const productCollectionRef = collection(db, "products").withConverter(
      Product.converter,
    );
    const newProduct = new Product(
      null,
      name,
      price,
      category,
      stock,
      description,
    );
    const docRef = await addDoc(productCollectionRef, newProduct);
    return docRef.id;
  },

  update: async (id, data) => {
    return Product.update(id, data);
  },

  delete: async (id) => {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    return true;
  },
};
