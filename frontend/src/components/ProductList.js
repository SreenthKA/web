import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList({ addToCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <h2>Product Listing</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
