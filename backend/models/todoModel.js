const db = require('../db');

const getAllTodos = async () => {
  const result = await db.query('SELECT * FROM todos ORDER BY id');
  return result.rows;
};

const getTodoById = async (id) => {
  const result = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
  return result.rows[0];
};

const getTodosByStatus = async (completed) => {
  const result = await db.query('SELECT * FROM todos WHERE completed = $1 ORDER BY id', [completed]);
  return result.rows;
};

const createTodo = async (title, description, due_date) => {
  const result = await db.query(
    'INSERT INTO todos (title, description, due_date) VALUES ($1, $2, $3) RETURNING *',
    [title, description, due_date]
  );
  return result.rows[0];
};

const updateTodo = async (id, title, description, due_date, completed) => {
  const result = await db.query(
    `UPDATE todos SET title = $1, description = $2, due_date = $3, completed = $4 WHERE id = $5 RETURNING *`,
    [title, description, due_date, completed, id]
  );
  return result.rows[0];
};

const deleteTodo = async (id) => {
  await db.query('DELETE FROM todos WHERE id = $1', [id]);
};

const getIncompleteTodosByDueDate = async (due_date) => {
  const result = await db.query(
    'SELECT * FROM todos WHERE completed = false AND due_date = $1 ORDER BY id',
    [due_date]
  );
  return result.rows;
};


module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, getTodosByStatus, getIncompleteTodosByDueDate };
