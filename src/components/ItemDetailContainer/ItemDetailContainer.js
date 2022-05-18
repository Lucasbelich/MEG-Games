import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.css";
import "../ItemList/ItemList.css";
import { getProductsById } from "../../services/firebase/firestore";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const { productId } = useParams();

  useEffect(() => {
    getProductsById(productId)
      .then((item) => {
        setProduct(item);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  return (
    <div className="ItemDetailContainer">
      {loading ? (
        <h1>El producto no existe</h1>
      ) : product ? (
        <ItemDetail className="ListGroup" {...product} />
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
};
export default ItemDetailContainer;
