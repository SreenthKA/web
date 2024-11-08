import React, { useState } from 'react';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Reviews from './components/Review';
import './App.css';

function App() {
    const [token, setToken] = useState(null); // Store JWT token after login
    const [cartItems, setCartItems] = useState([]);
    const userId = 1; // Set to 1 for the test user, or use dynamic user ID after login

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(
                cartItems.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(
                cartItems.map(item => 
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    return (
        <div className="App">
            {!token ? (
                <Login setToken={setToken} />
            ) : (
                <>
                    <ProductList addToCart={addToCart} />
                    <Cart 
                        cartItems={cartItems} 
                        updateQuantity={updateQuantity} 
                        removeFromCart={removeFromCart} 
                    />
                    
                    {/* Add Wishlist and Reviews components */}
                    <Wishlist userId={userId} />
                    
                    {/* For demonstration, assume productId = 1 for reviews */}
                    <Reviews productId={1} userId={userId} />
                </>
            )}
        </div>
    );
}

export default App;
