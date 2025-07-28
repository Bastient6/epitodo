const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
dotenv.config();

app.use(express.static('front'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');
const todoRoutes = require('./routes/todos/todos');

function logRequest(req, res, next) {
    console.log('URL de la requête:', req.url);
    next();
}

app.use(logRequest);
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/user', userRoutes);
app.use('/todos', todoRoutes);
app.use('/TODOS', todoRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
