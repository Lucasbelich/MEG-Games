import { useContext } from "react";
import CartContext from "../../Context/CartContext";

const ItemCart = ({ id, nombre, quantity, precio }) => {
  const { removeItem } = useContext(CartContext);

  return (
    <li className="CardItem Li">
      <header>
        <h2 className="ItemHeader">{nombre}</h2>
      </header>

      <section>
        <p className="Info">cantidad: {quantity}</p>
        <p className="Info">Precio uni: ${precio}</p>
        <p className="Info">Subtotal: ${precio * quantity}</p>
      </section>
      <footer className="ItemFooter">
        <button className="ButtonDetail" onClick={() => removeItem(id)}>
          X
        </button>
      </footer>
    </li>
  );
};

export default ItemCart;
