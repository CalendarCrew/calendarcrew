require('dotenv').config()
const express = require("express");
const router = express.Router();
const crypto = require('crypto'); //native to node
const bcrypt = require('bcrypt'); //npm install
const cors = require('cors');
const cookieParser = require("cookie-parser"); // you need this to access req.cookies
const { body, validationResult } = require('express-validator');
const { User, Task, Birthday } = require("../models");
const SALT_COUNT = 10; //defined by us
const jwt = require('jsonwebtoken');
const console = require('console');

// Create Task
router.post("/", body('title').not().isEmpty().trim().escape(),
                 body('date').not().isEmpty().trim(),
                 body('id').not().isEmpty().trim(),
                 async (req, res, next) => {
      try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          return res.status(400).json({ validationErrors: validationErrors.array() });
        }
        const { title, date, description, id } = req.body
        const allTasks = await Task.findAll({where:{task:ID}})
        if(allTasks.length === 0 ){
        const newTask = await Task.create({ title, date, description, ID});
        res.json(newTask);
        }
      } catch (error) {
        next(error);
      }
});

// Get All Tasks
router.get("/", async (req, res, next) => {
    try {
      if(!req.user) res.sendStatus(401);
      else {
        const task = await Task.findAll(req.user.role === 'admin' ? {} : { where: { userId: req.user.id } });
        next(task);
      }  
    } catch (error) {
      console.error(error);
      next(error)
    }
  })

// Get Specific Task
router.get("/:id", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const existingTask = await Task.findOne({ where: { ID } }); 
  } catch (error) {
    console.error(error);
    next(error)
  }
})

// Update Task
router.put('/role/:id', async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') res.sendStatus(401);
    else {
      await Task.update({ role: req.body.role }, {
        where: {
          id: req.params.id,
        }
      });
      const result = await Task.findByPk(req.params.id);
      next(result);
    }
  } catch (err) {
    next(err)
  }
})

route.delete('/:id', async (req, res, next) => {
  try {
    if(!req.user) res.sendStatus(401);
    else {
        if(req.user.role != 'admin') res.sendStatus(401);
        else {
            await Task.destroy({
                where: {
                    id: req.params.id,
                },  
            });
            const updatedTask = await Task.findAll(req.user.role === 'admin' ? {} : { where: { userId: req.user.id } });
            next(updatedTask);
        }    
    }
  } catch (err) {
    next(err);
  }
})
module.exports = router;