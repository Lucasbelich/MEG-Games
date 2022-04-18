import { useState } from 'react'

const Count = ({initial = 0, stock, onConfirm}) => {
    const [count, setCount] = useState(initial)
 
        


    const decrement = () => {
        setCount(count - 1)
    }

    const increment = () => {
        setCount(count + 1)
    }

    
    return(
        <div>
            <div>
                <button onClick={decrement}>-</button> 
                <p>{count}</p>
                <button onClick={increment}>+</button>
            </div>
            <button onClick={() => onConfirm(count)}>Agregar al carrito</button>
        </div>
    )
    }


export default Count