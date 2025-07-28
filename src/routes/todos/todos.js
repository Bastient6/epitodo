const express = require('express');
const db = require('../../config/db');
const get = require('../user/user.query');
const getodos = require('../todos/todos.query');
const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await getodos.getAllTodos();
    console.log(todos);
    res.json(todos);
});

router.get('/:id', async (req, res) => {
    const todoId = req.params.id;
    const todo = await getodos.getTodoById(todoId);
    if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
    }

    res.json(todo);
});

router.post('/', async (req, res) => {
  const { title, description, user_id } = req.body;
  const sql = `INSERT INTO todo (title, description, user_id) VALUES (?, ?, ?)`;
  const values = [title, description, user_id];

  db.query(sql, values, (err, result) => {
    res.status(201).json({ message: 'Todo created successfully' });
  });
});

router.put('/:id', async (req, res) => {
    const todoId = req.params.id;
    const { title, description, due_time, user_id, status } = req.body;
    const updatedTodo = {
        title,
        description,
        due_time,
        user_id,
        status
    };
    await getodos.updateTodo(todoId, updatedTodo);
    const todo = await getodos.getTodoById(todoId);
    res.json(todo);
});

router.delete('/:id', async (req, res) => {
    const todoId = req.params.id;
    await getodos.deleteTodo(todoId);
    res.json({ msg: `Successfully deleted record number: ${todoId}` });
});

router.delete('/', async (req, res) => {
    await getodos.deleteAllTodos();
    res.json({ msg: 'All todos deleted successfully' });
});

module.exports = router;
