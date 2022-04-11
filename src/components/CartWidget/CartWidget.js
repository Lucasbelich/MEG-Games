import React from "react";
import { BsCart2 } from "react-icons/bs";
import "./CartWidget.css";


const CartWidget = () => {
  return (
    <div className="CartWidget">
      <button className="Button" variant="solid" size="md">
        <BsCart2 className="btnCart" />
        0
      </button>
    </div>
  );
};

export default CartWidget;