const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve products' });
        res.json(results);
    });
});

// Get a single product by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(results[0]);
    });
});

// Add a new product (for simplicity, we assume this is done by an admin)
router.post('/', (req, res) => {
    const { name, description, price, inventory, category_id, image_url } = req.body;

    db.query('INSERT INTO products (name, description, price, inventory, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, price, inventory, category_id, image_url],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Failed to add product' });
            res.status(201).json({ message: 'Product added successfully', productId: results.insertId });
        });
});

module.exports = router;
