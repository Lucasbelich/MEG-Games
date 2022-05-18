import { useState } from "react";
import "./ItemCount.css";

const Count = ({ initial = 1, stock = 0, onConfirm }) => {
  const [count, setCount] = useState(initial);

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
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
      <button className="Button" onClick={() => onConfirm(count)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default Count;
