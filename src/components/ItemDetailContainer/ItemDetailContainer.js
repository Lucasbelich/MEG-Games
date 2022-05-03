import { useState, useEffect } from "react";
//import { getProductsById } from "../../Utils/getProducts";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.css"
import '../ItemList/ItemList.css'
import { firestoreDb } from '../../services/firebase'
import { getDoc, doc } from 'firebase/firestore'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const { productId } = useParams();

  useEffect(() => {
    /* getProductsById(productId)
      .then((item) => {
        setProduct(item);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      }); */
      getDoc(doc(firestoreDb, 'products', productId)).then(res => {
        
        const product = { id: res.id, ...res.data()}
        setProduct(product)
    })

    return () => {
      setProduct();
    };
  }, [productId]);

  return (
    <div className="ItemDetailContainer">
      {loading ? (
        <div class="spinner"></div>
      ) : product ? (
        <ItemDetail className="ListGroup" {...product} />
      ) : (
        <h1>El producto no existe</h1>
      )}
    </div>
  );
};
export default ItemDetailContainer;
