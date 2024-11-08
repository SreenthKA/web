const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a review and rating for a product
router.post('/', (req, res) => {
    const { userId, productId, rating, reviewText } = req.body;

    db.query(
        'INSERT INTO reviews (user_id, product_id, rating, review_text) VALUES (?, ?, ?, ?)',
        [userId, productId, rating, reviewText],
        (err) => {
            if (err) return res.status(500).json({ error: 'Failed to add review' });
            res.json({ message: 'Review added successfully' });
        }
    );
});

// Get all reviews for a specific product
router.get('/:productId', (req, res) => {
    const { productId } = req.params;

    db.query(
        'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = ?',
        [productId],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Failed to retrieve reviews' });
            res.json(results);
        }
    );
});

module.exports = router;
