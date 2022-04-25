import { useState, useEffect } from "react";
import { getProductsById } from "../../Utils/getProducts";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.css"
import '../ItemList/ItemList.css'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

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
