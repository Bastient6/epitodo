const db = require('../../config/db');

async function getAllTodos() {
    return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM todo';

    db.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
  });
}

async function getTodoById(todoId) {
    return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM todo WHERE id = ?';
    db.query(query, [todoId], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    });
  });
}

async function createTodo(newTodo) {
    return new Promise((resolve, reject) => {
    const query = 'INSERT INTO todo SET ?';
    db.query(query, [newTodo], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results.insertId);
        }
    });
  });
}

async function updateTodo(todoId, updatedTodo) {
    return new Promise((resolve, reject) => {
    const query = 'UPDATE todo SET ? WHERE id = ?';
    db.query(query, [updatedTodo, todoId], (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
  });
}

async function deleteTodo(todoId) {
    return new Promise((resolve, reject) => {
    const query = 'DELETE FROM todo WHERE id = ?';
    db.query(query, [todoId], (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
  });
}

async function deleteAllTodos() {
    return new Promise((resolve, reject) => {
    const query = 'DELETE FROM todo';
    db.query(query, (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
  });
}

module.exports = {
    deleteAllTodos,
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
