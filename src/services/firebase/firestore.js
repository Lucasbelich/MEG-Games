import { firestoreDb } from "./index";
import {
  getDocs,
  query,
  where,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";

export const getProducts = (categoryId) => {
  return new Promise((resolve, reject) => {
    const collectionRef = categoryId
      ? query(
          collection(firestoreDb, "products"),
          where("category", "==", categoryId)
        )
      : collection(firestoreDb, "products");

    getDocs(collectionRef)
      .then((res) => {
        const products = res.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        resolve(products);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getProductsById = (productId) => {
  return new Promise((resolve, reject) => {
    getDoc(doc(firestoreDb, "products", productId)).then((res) => {
      const product = { id: res.id, ...res.data() };
      resolve(product);
    });

    return () => {
      reject();
    };
  });
};
