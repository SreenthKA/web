const express = require('express');
const router = express.Router();
const db = require('../db');

// Place an order
router.post('/', (req, res) => {
    const { userId, total, items } = req.body;

    // Start transaction for placing an order
    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: 'Transaction failed' });

        db.query('INSERT INTO orders (user_id, total, status) VALUES (?, ?, "Pending")',
            [userId, total],
            (err, results) => {
                if (err) return db.rollback(() => res.status(500).json({ error: 'Failed to create order' }));
                const orderId = results.insertId;

                const orderItems = items.map(item => [orderId, item.productId, item.quantity, item.price]);
                db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
                    [orderItems],
                    (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ error: 'Failed to add order items' }));
                        db.commit((err) => {
                            if (err) return db.rollback(() => res.status(500).json({ error: 'Failed to complete transaction' }));
                            res.json({ message: 'Order placed successfully', orderId });
                        });
                    });
            });
    });
});

// Get user orders
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve orders' });
        res.json(results);
    });
});

module.exports = router;
