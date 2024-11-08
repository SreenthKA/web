const express = require('express');
const router = express.Router();
const db = require('../db');

// Add product to wishlist
router.post('/', (req, res) => {
    const { userId, productId } = req.body;

    db.query('INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)', [userId, productId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to add to wishlist' });
        res.json({ message: 'Product added to wishlist' });
    });
});

// Get user's wishlist
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    db.query(
        'SELECT p.* FROM products p JOIN wishlist w ON p.id = w.product_id WHERE w.user_id = ?',
        [userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Failed to retrieve wishlist' });
            res.json(results);
        }
    );
});

// Remove product from wishlist
router.delete('/:userId/:productId', (req, res) => {
    const { userId, productId } = req.params;

    db.query('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [userId, productId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to remove from wishlist' });
        res.json({ message: 'Product removed from wishlist' });
    });
});

module.exports = router;
