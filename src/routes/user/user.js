const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const get = require('../user/user.query');
const getodos = require('../todos/todos.query');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await get.getAllUsers();
    res.json(users);
});

router.delete('/', async (req, res) => {
    try {
        await get.deleteAllUsers();
        res.json({ msg: 'All users deleted successfully' });
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/todos', async (req, res) => {
    const todos = await getodos.getAllTodos();
    res.json(todos);
});

router.post('/retrieve', async (req, res) => {
    const { email, currentPassword, newPassword, confirmPassword } = req.body;
    const user = await get.getUserByEmail(email);
    if (newPassword !== confirmPassword) {
        return res.status(401).json({ msg: 'Passwords do not match' });
    }
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    db.execute('UPDATE `user` SET password = ? WHERE email = ?', [hashedPassword, email], function(error) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.sendStatus(200);
    });
});

router.get('/:id', async (req, res) => {
    const userId = db.escape(req.params.id);
    const user = await get.getUserById(userId);
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
});

router.get('/:email', async (req, res) => {
    const email = req.params.email;
    const user = await get.getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
});

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { email, password, firstname, name } = req.body;
    const updatedUser = {
        email,
        password,
        firstname,
        name
    };
    await get.updateUser(userId, updatedUser);
    const user = await get.getUserById(userId);
    res.json(user);
});

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    await get.deleteUser(userId);
    res.json({ msg: `Successfully deleted record number: ${userId}` });
});

module.exports = router;
