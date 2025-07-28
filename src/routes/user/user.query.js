const db = require('../../config/db');

async function getMailByName(name) {
    return new Promise((resolve, reject) => {
    const query = 'SELECT email FROM user WHERE name = ?';
    db.query(query, [name], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    });
  });
}

async function getUserTodos(userId) {
    return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM todo WHERE user_id = ?';
    db.query(query, [userId], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
  });
}

async function getUserById(userId) {
    return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    db.query(query, [userId], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    });
  });
}

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    });
  });
}

async function updateUser(userId, updatedUser) {
    return new Promise((resolve, reject) => {
    const query = 'UPDATE user SET ? WHERE id = ?';
    db.query(query, [updatedUser, userId], (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
  });
}

async function deleteUser(userId) {
    return new Promise((resolve, reject) => {
    const query = 'DELETE FROM user WHERE id = ?';
    db.query(query, [userId], (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
  });
}

async function deleteAllUsers() {
    return new Promise((resolve, reject) => {
    const query = 'DELETE FROM user';
    db.query(query, (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
  });
}

async function getAllUsers() {
    return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user';
    db.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
  });
}

async function updatePassword(mail, newPassword) {
    return new Promise((resolve, reject) => {
    const query = 'UPDATE user SET password = ? WHERE id = ?';
    db.query(query, [newPassword, mail], (error) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
  });
}

module.exports = {
    updatePassword,
    getMailByName,
    getAllUsers,
    deleteAllUsers,
    getUserTodos,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
