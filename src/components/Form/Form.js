import "./Form.css";
import { useContext, useState } from "react";
import CartContext from "../../Context/CartContext";
import { NavLink } from "react-router-dom";
import {
  getDocs,
  writeBatch,
  query,
  where,
  collection,
  documentId,
  addDoc,
} from "firebase/firestore";
import { firestoreDb } from "../../services/firebase/index";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const onNameChange = (event) => {
    setInputName(event.target.value);
  };
  const onPhoneChange = (event) => {
    setInputPhone(event.target.value);
  };
  const onEmailChange = (event) => {
    setInputEmail(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      e.preventDefault();
    }
  };

  const { cart, getTotal, clearCart } = useContext(CartContext);

  const createOrder = () => {
    setLoading(true);

    const objOrder = {
      items: cart,
      buyer: {
        name: inputName,
        phone: inputPhone,
        email: inputEmail,
      },
      total: getTotal(),
      date: new Date(),
    };

    const ids = cart.map((prod) => prod.id);

    const batch = writeBatch(firestoreDb);

    const collectionRef = collection(firestoreDb, "products");

    const outOfStock = [];

    getDocs(query(collectionRef, where(documentId(), "in", ids)))
      .then((response) => {
        response.docs.forEach((doc) => {
          const dataDoc = doc.data();
          const prodQuantity = cart.find(
            (prod) => prod.id === doc.id
          )?.quantity;

          if (dataDoc.stock >= prodQuantity) {
            batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity });
          } else {
            outOfStock.push({ id: doc.id, ...dataDoc });
          }
        });
      })
      .then(() => {
        if (outOfStock.length === 0) {
          const collectionRef = collection(firestoreDb, "orders");
          return addDoc(collectionRef, objOrder);
        } else {
          return Promise.reject({
            name: "outOfStockError",
            products: outOfStock,
          });
        }
      })
      .then(({ id }) => {
        batch.commit();
        setOrderId(id);
        console.log(`El id de la orden es ${id}`);
        clearCart();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div>
        <div className="spinner "></div>
        <h1 className="text">Se esta generando su orden</h1>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="py-5 text-center mt-5 text">
        <h2 className="mt-5">¡Gracias por elegirnos!</h2>
        <h5 className="my-5">La compra se ha realizado exitosamente.</h5>
        <strong>El ID de su compra es {orderId}</strong>
        <p className="danger">MEGGames</p>
        <NavLink className="ButtonDetailForm" to={"/"}>
          <strong>Volver al inicio</strong>
        </NavLink>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center py-5 mt-5">
        <h4 className="mt-5 text">
          Completa el formulario con tus datos para confirmar la compra.
        </h4>
      </div>

      <div>
        <div>
          <form className="form">
            <input
              className="input"
              style={{ padding: "10px" }}
              type="text"
              id="inputName"
              placeholder="Nombre y Apellido"
              onChange={onNameChange}
            />
            <input
              className="input"
              style={{ padding: "10px" }}
              type="text"
              id="inputPhone"
              placeholder="1133445566"
              onChange={onPhoneChange}
              onKeyDown={handleKeyDown}
            />
            <input
              className="input"
              style={{ padding: "10px" }}
              type="email"
              id="inputEmail"
              placeholder="mail@ejemplo.com"
              onChange={onEmailChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
        <button
          className="ButtonDetail"
          type="submit"
          disabled={!inputName || !inputPhone || !inputEmail}
          onClick={createOrder}
          style={{ marginBottom: "30px", marginLeft: "48%", marginTop: "10px" }}
        >
          <strong>Confirmar</strong>
        </button>
      </div>
    </div>
  );
};

export default Form;
