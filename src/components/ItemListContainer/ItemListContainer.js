import { useState, useEffect } from "react";
import { getProducts } from "../../Utils/getProducts";
//import { getDocs, collection } from "firebase/firestore"
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
//import { firestoreDb } from "../../services/firebase/index"

const ItemListContainer = (props) => {
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();

  useEffect(() => {
     getProducts(categoryId)
      .then((prods) => {
        setProducts(prods);
      })
      .catch((error) => {
        console.log(error);
      }); 
      /* getDocs(collection(firestoreDb, 'products')).then(res => {
        console.log(res)
        const products = res.docs.map((doc) =>{
          return { id: doc.id, ...doc.data()}
        })
        setProducts(products)
      }) */
  }, [categoryId]);

  return (
    <div>
      <h1>{props.greeting}</h1>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
