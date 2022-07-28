import "./ItemDetail.css";
import Count from "../ItemCount/ItemCount";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CartContext from "../../Context/CartContext";

const ItemDetail = ({
  id,
  nombre,
  img,
  category,
  description,
  precio,
  stock,
}) => {
  const { addItem, isInCart } = useContext(CartContext);

  const handleAdd = (count) => {
    const productObj = {
      id,
      nombre,
      precio,
      quantity: count,
    };

    addItem(productObj);
  };

  return (
    <div className="ListGroup">
      <article className="CardItem">
        <header className="Header">
          <h2 className="ItemHeader">{nombre}</h2>
        </header>
        <picture>
          <img src={img} alt={nombre} className="ItemImg" />
        </picture>
        <section>
          <p className="Info">Categoria: {category}</p>
          <p className="Info">{description}</p>
          <p className="Info">Precio: ${precio}</p>
        </section>
        <footer className="ItemFooter">
          {isInCart(id) ? (
            <NavLink className="ButtonDetail" to="/cart">Ir al carrito</NavLink>
          ) : (
            <Count onConfirm={handleAdd} stock={stock} />
          )}
        </footer>
      </article>
    </div>
  );
};

export default ItemDetail;
