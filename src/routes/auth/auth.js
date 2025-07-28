const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const authMiddleware = require('../../middleware/auth');
const get = require('../user/user.query');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, name, firstname, password } = req.body;
    if (!email || !password || !name || !firstname) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const emailExists = await get.getUserByEmail(email);
    if (emailExists != null) {
        return res.status(409).json({ error: '"msg" : "Account already exists"' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [email, hashedPassword, name, firstname], function(error) {
    if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }

    const token = jwt.sign({ email, password: hashedPassword }, process.env.SECRET);
    res.status(201).json({ message: '"token": Token of the newly registered user" ', token });
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await get.getUserByEmail(email);
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!user) {
        return res.status(401).json({ msg: 'Invalid Credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const token = jwt.sign({ email, password}, process.env.SECRET);
    res.sendStatus(200);
});


module.exports = router;
