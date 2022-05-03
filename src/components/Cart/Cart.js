import { useContext, useState } from "react";
import CartContext from "../../Context/CartContext";
import ItemCart from "../ItemCart/ItemCart";
import { NavLink } from "react-router-dom";
import { getDocs, writeBatch, query, where, collection, documentId, addDoc } from 'firebase/firestore'
import { firestoreDb } from '../../services/firebase/index'

const Cart = () => {

  const [loading, setLoading] = useState(false)


  const { cart, getTotal, clearCart, } = useContext(CartContext);

  const createOrder = () => {
    setLoading(true)

    const objOrder = {
        items: cart,
        buyer: {
            name: 'Lucas Belich',
            phone: '11-1234-1234',
            email: 'lucasbelich1@gmail.com'
        },
        total: getTotal(),
        date: new Date()
    }

    const ids = cart.map(prod => prod.id)

    const batch = writeBatch(firestoreDb)

    const collectionRef = collection(firestoreDb, 'products')

    const outOfStock = []

    getDocs(query(collectionRef, where(documentId(), 'in', ids)))
        .then(response => {
            response.docs.forEach(doc => {
                const dataDoc = doc.data()
                const prodQuantity = cart.find(prod => prod.id === doc.id)?.quantity

                if(dataDoc.stock >= prodQuantity) {
                    batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity})
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })
        }).then(() => {
            if(outOfStock.length === 0) {
                const collectionRef = collection(firestoreDb, 'orders')
                return addDoc(collectionRef, objOrder)
            } else {
                return Promise.reject({ name: 'outOfStockError', products: outOfStock})
            }
        }).then(({ id }) => {
            batch.commit()
            console.log(`El id de la orden es ${id}`)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
}

if(loading) {
  return <h1>Se esta generando su orden</h1>
}

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
            <button onClick={() => clearCart()} className="Button">Limpiar carrito</button>
            <button onClick={() => createOrder()} className="Button">Generar Orden</button>
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
