import products from "../Mock/asyncmock.js";
import {categories} from "../Mock/asyncmock"

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    const ok = true;
    setTimeout(() => {
      if (ok) {
        resolve(products);
      } else {
        reject("error");
      }
    }, 2000);
  });
};

export const getProductsById = (id) => {
  return new Promise((resolve, reject) => {
    const ok = true;
    setTimeout(() => {
      if (ok) {
        resolve(products.find((prod) => prod.id === id));
      } else {
        reject("error");
      }
    }, 2000);
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 500);
  });
};


