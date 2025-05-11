const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoController');

// Main routes
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

// Explicitly catch DELETE /api/todos (no ID)
router.delete('/', (req, res) => {
  res.status(400).json({ error: 'To-do ID must be specified in the URL (e.g. /api/todos/1)' });
});

// Catch all unmatched DELETE routes (e.g. /api/todos/something/weird)
router.use((req, res, next) => {
  if (req.method === 'DELETE') {
    return res.status(404).json({
      error: 'Invalid DELETE route. Use /api/todos/:id where :id is a number.',
    });
  }
  next();
});

module.exports = router;
