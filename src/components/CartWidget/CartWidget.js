import { useContext } from "react";
import { BsCart2 } from "react-icons/bs";
import "./CartWidget.css";
import CartContext from "../../Context/CartContext";

const CartWidget = () => {
  const { getQuantity } = useContext(CartContext);

  return (
    <div className="CartWidget">
      <button className="Button" variant="solid" size="md">
        <BsCart2 className="btnCart" />
        {getQuantity()}
      </button>
    </div>
  );
};

export default CartWidget;
