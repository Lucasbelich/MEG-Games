import { useContext } from "react";
import { BsCart2 } from "react-icons/bs";
import "./CartWidget.css";
import CartContext from "../../Context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { getQuantity } = useContext(CartContext);

  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return <div></div>;
  } else {
    return (
      <Link to="/cart" className="CartWidget">
        <button className="Button" variant="solid" size="md">
          <BsCart2 className="btnCart" />
          {getQuantity()}
        </button>
      </Link>
    );
  }
};
export default CartWidget;
