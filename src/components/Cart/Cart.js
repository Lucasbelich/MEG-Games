import { useContext } from "react";
import CartContext from "../../Context/CartContext";
import ItemCart from "../ItemCart/ItemCart";
import { NavLink } from "react-router-dom";
import "./Cart.css";
const Cart = () => {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  return (
    <div>
      {cart.length ? (
        <div>
          <h1 className="text">Carrito</h1>
          <div className="ListGroup">
            {cart.map((prod) => (
              <ItemCart key={prod.id} {...prod} />
            ))}
          </div>
          <h3 className="text">Total: ${getTotal()}</h3>
          <div className="footerCart">
            <NavLink className="ButtonDetail" to="/form">
              Checkout
            </NavLink>
            <button onClick={() => clearCart()} className="ButtonDetail">
              Limpiar carrito
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text">No hay productos</h1>
          <NavLink className={"buttonCount"} to="/">
            Volver al inicio
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
