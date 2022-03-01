const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const config = require('./config');
const users = require('./app/users');
const tasks = require('./app/tasks');
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/users', (users));
app.use('/tasks', (tasks));

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server is listening port ${port}...`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
}

run().catch(e => console.log(e));

