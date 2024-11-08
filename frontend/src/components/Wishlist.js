import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wishlist({ userId }) {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/wishlist/${userId}`)
            .then(response => setWishlist(response.data))
            .catch(error => console.error('Error fetching wishlist:', error));
    }, [userId]);

    const removeFromWishlist = (productId) => {
        axios.delete(`http://localhost:5000/wishlist/${userId}/${productId}`)
            .then(() => setWishlist(wishlist.filter(item => item.id !== productId)))
            .catch(error => console.error('Error removing from wishlist:', error));
    };

    return (
        <div>
            <h2>Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                <ul>
                    {wishlist.map(item => (
                        <li key={item.id}>
                            {item.name}
                            <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Wishlist;
