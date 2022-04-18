import './ItemDetail.css'
import Count from '../ItemCount/ItemCount'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const ItemDetail = ({ id, nombre, img, category, descripcion, precio, stock }) => {

    const [quantity, setQuantity] = useState(0)

    const handleAdd = (count) => {
        setQuantity(count)
    }

    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {nombre}
                </h2>
            </header>
            <picture>
                <img src={img} alt={nombre} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Categoria: {category}
                </p>
                <p className="Info">
                    Descripción: {descripcion}
                </p>
                <p className="Info">
                    Precio: ${precio}
                </p>
            </section>           
            <footer className='ItemFooter'>
                {quantity > 0 ? <Link to='/cart'>Ir al carrito</Link> : <Count onConfirm={handleAdd} stock={stock}/>} 
            </footer>
        </article>
    )
}

export default ItemDetail