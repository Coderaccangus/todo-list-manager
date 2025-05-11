const model = require('../models/todoModel');

exports.getAll = async (req, res) => {
  try {
    const { completed, due } = req.query;

    // Filter by completed only
    if (completed !== undefined && due === undefined) {
      if (completed !== 'true' && completed !== 'false') {
        return res.status(400).json({ error: 'Completed must be "true" or "false"' });
      }

      const isCompleted = completed === 'true';
      const todos = await model.getTodosByStatus(isCompleted);
      return res.json(todos);
    }

    // Filter by completed=false and due date
    if (completed === 'false' && due) {
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(due);
      if (!isValidDate) {
        return res.status(400).json({ error: 'Due date must be in YYYY-MM-DD format' });
      }

      const todos = await model.getIncompleteTodosByDueDate(due);
      return res.json(todos);
    }

    // Return all todos if no filters
    const todos = await model.getAllTodos();
    res.json(todos);
  } catch (err) {
    console.error('Error in getAll:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid to-do ID required in URL' });
  }

  const todo = await model.getTodoById(id);
  if (!todo) return res.status(404).json({ error: 'To-do not found' });

  res.json(todo);
};

exports.create = async (req, res) => {
  const { title, description, due_date } = req.body;
  const newTodo = await model.createTodo(title, description, due_date);
  res.status(201).json(newTodo);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, completed } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid to-do ID required in URL' });
  }

  const updated = await model.updateTodo(id, title, description, due_date, completed);

  if (!updated) return res.status(404).json({ error: 'To-do not found' });

  res.json({
    message: 'To-do updated successfully',
    todo: updated,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'To-do ID must be a valid number' });
  }

  const todo = await model.getTodoById(id);
  if (!todo) {
    return res.status(404).json({ error: 'To-do not found' });
  }

  await model.deleteTodo(id);

  res.status(200).json({ message: `To-do with ID ${id} deleted successfully` });
};

exports.getAll = async (req, res) => {
  const { completed } = req.query;

  // If "completed" query param is provided, filter by it
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    const todos = await model.getTodosByStatus(isCompleted);
    return res.json(todos);
  }

  // Otherwise, return all todos
  const todos = await model.getAllTodos();
  res.json(todos);
};