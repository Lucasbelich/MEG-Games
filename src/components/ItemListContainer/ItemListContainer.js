import { useState, useEffect } from "react";
import { getProducts } from "../../services/firebase/firestore";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = (prods) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    getProducts(categoryId)
      .then((prods) => {
        setProducts(prods);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div>
      {loading ? (
        <div className="spinner"></div>
      ) : products ? (
        <ItemList products={products} />
      ) : (
        <h1>El listado no existe</h1>
      )}
    </div>
  );
};

export default ItemListContainer;
