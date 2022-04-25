import { useState } from "react";
import "./ItemCount.css";

const Count = ({ initial = 0, stock, onConfirm }) => {
  const [count, setCount] = useState(initial);

  const decrement = () => {
    setCount(count - 1);
  };

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div className="Count">
        <button onClick={decrement} className="buttonCount">
          -
        </button>
        <p>{count}</p>
        <button onClick={increment} className="buttonCount">
          +
        </button>
      </div>
      <button className="Button" onClick={() => onConfirm(count)}>Agregar al carrito</button>
    </div>
  );
};

export default Count;
