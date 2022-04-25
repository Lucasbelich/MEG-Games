import { useContext } from "react";
import CartContext from "../../Context/CartContext";
import ItemCart from "../ItemCart/ItemCart";

const Cart = () => {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return <h1>No hay productos</h1>;
  }

  return (
    <div>
      <h1>Carrito</h1>
      <div className="ListGroup">
        {cart.map((prod) => (
          <ItemCart key={prod.id} {...prod} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
