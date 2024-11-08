import React from 'react';
function Cart({ cartItems, updateQuantity, removeFromCart }) {
    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: ${getTotal()}</h3>
        </div>
    );
}

export default Cart;
