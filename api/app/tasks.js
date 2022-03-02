const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.find().populate('user');
        res.send(tasks);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate('user');
        if (!task) {
            return res.status(404).send({error: 'task is not found'});
        }
        return res.send(task);
    } catch (e) {
        next(e);
    }
});

router.post('/',async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({error: 'Fill in title'});
        }
        const taskData = {
            user: req.body.user,
            title: req.body.title,
            status: 'new'
        }

        const task = new Task(taskData);
        await task.save();
        return res.send({task: task});
    } catch (e) {
        next(e);
    }
});

router.delete('/:id',async (req, res, next) => {
    try {
        await Task.findOneAndDelete({_id: req.params.id});
        return res.send({message: `Task with id=${req.params.id} was deleted`});
    } catch (e) {
        next(e);
    }
});


router.put('/:id',async (req, res, next) => {
    try {
        let updateParams;
        if (!req.body.user) {
            updateParams = {
                status: req.body.status,
            }
        } else if (req.body.user === 'N/A') {
            updateParams = {
                status: req.body.status,
                user: null,
            }
        } else {
            updateParams = {
                status: req.body.status,
                user: req.body.user,
            }
        }

        await Task.updateOne({_id: req.params.id},updateParams);
        return res.send({message: `Task with id=${req.params.id} was updated`, });
    } catch (e) {
        next(e);
    }
});

module.exports = router;