import { useState, useEffect } from 'react'

const MLListContainer = () => {
    const [products, setProducts] = useState([])
    const [input, setInput] = useState('')

    // useEffect(() => {
    //     fetch('https://api.mercadolibre.com/sites/MLA/search?q=iphone')
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(res => {
    //             setProducts(res.results)
    //         })
    // }, [])

    console.log(products)

    const handleSearch = () => {
        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${input}`)
            .then(response => {
                return response.json()
            })
            .then(res => {
                setProducts(res.results)
            })
    }

    return(
        <div>
            <h1>Mercado Libre</h1>
            <div>
                <input type='text' onChange={(e) => setInput(e.target.value)}/>
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <ul>
                {products.map(p => {
                return (
                    
                    <li key={p.id}>
                        <img src={p.thumbnail} alt={p.title}/>
                        <p>{p.title}</p>
                        <p>${p.price}</p>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default MLListContainer