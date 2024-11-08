const express = require('express');
const router = express.Router();
const db = require('../db');

// Add item to cart
router.post('/', (req, res) => {
    const { userId, productId, quantity } = req.body;

    db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Failed to add item to cart' });
            res.status(201).json({ message: 'Item added to cart' });
        });
});

// Get items in user's cart
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    db.query('SELECT * FROM cart_items WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve cart items' });
        res.json(results);
    });
});

// Update quantity of a cart item
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update cart item quantity' });
        res.json({ message: 'Cart item updated successfully' });
    });
});

// Remove an item from the cart
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM cart_items WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to remove item from cart' });
        res.json({ message: 'Item removed from cart' });
    });
});

module.exports = router;
