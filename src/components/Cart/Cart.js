import { useContext } from "react";
import CartContext from "../../Context/CartContext";
import ItemCart from "../ItemCart/ItemCart";
import { NavLink } from "react-router-dom";
const Cart = () => {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  return (
    <div>
      {cart.length ? (
        <div>
          <h1>Carrito</h1>
          <div className="ListGroup">
            {cart.map((prod) => (
              <ItemCart key={prod.id} {...prod} />
            ))}
          </div>
          <h3>Total: ${getTotal()}</h3>
          <div className="footerCart">
            <NavLink className="Button" to="/form">
              Checkout
            </NavLink>
            <button onClick={() => clearCart()} className="Button">
              Limpiar carrito
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>No hay productos</h1>
          <NavLink className={"buttonCount"} to="/">
            Volver al inicio
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
