import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const [results] = await pool.query('SELECT id, name, price, delivery, price + delivery AS TOTAL FROM sales');
    res.json(results);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query('SELECT id, name, price, delivery, price + delivery AS TOTAL FROM sales WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching sale:', error);
    res.status(500).json({ error: 'Failed to fetch sale' });
  }
});

router.post('/', async (req, res) => {
  const { name, price, delivery } = req.body;
  if (!name || typeof price !== 'number' || typeof delivery !== 'number') {
    return res.status(400).json({ error: 'Name, price, and delivery are required and must be valid' });
  }
  try {
    const [result] = await pool.query('INSERT INTO sales (name, price, delivery) VALUES (?, ?, ?)', [name, price, delivery]);
    res.status(201).json({ id: result.insertId, name, price, delivery, TOTAL: price + delivery });
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Failed to create sale' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, delivery } = req.body;
  if (!name || typeof price !== 'number' || typeof delivery !== 'number') {
    return res.status(400).json({ error: 'Name, price, and delivery are required and must be valid' });
  }
  try {
    const [result] = await pool.query('UPDATE sales SET name = ?, price = ?, delivery = ? WHERE id = ?', [name, price, delivery, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json({ id: parseInt(id), name, price, delivery, TOTAL: price + delivery });
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ error: 'Failed to update sale' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM sales WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ error: 'Failed to delete sale' });
  }
});

export default router;