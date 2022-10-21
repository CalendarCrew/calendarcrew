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

// Create Birthday
router.post("/", body('name').not().isEmpty().trim().escape(),
                 body('date').not().isEmpty().trim(),
                 body('birthdayID').not().isEmpty().trim(),
                 async (req, res, next) => {
      try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          return res.status(400).json({ validationErrors: validationErrors.array() });
        }
        const { name, date, birthdayID } = req.body
        const allBirthdays = await Birthday.findAll({where:{birthdayID:ID}})
        if(allBirthdays.length === 0 ){
        const newBirthdays = await Birthday.create({ name, date, birthdayID});
        res.json(newBirthdays);
        }
      } catch (error) {
        next(error);
      }
});

// Get All Birthdays
router.get("/", async (req, res, next) => {
    try {
      if(!req.user) res.sendStatus(401);
      else {
        const birthday = await Birthday.findAll(req.user.role === 'admin' ? {} : { where: { userId: req.user.id } });
        next(birthday);
      }  
    } catch (error) {
      console.error(error);
      next(error)
    }
  })

// Get Specific Birthday
router.get("/:id", async (req, res, next) => {
  try {
    const { name, date } = req.body
    const existingBirthdays = await Birthday.findOne({ where: { ID } }); 
  } catch (error) {
    console.error(error);
    next(error)
  }
})

// Update Birthday
router.put('/role/:id', async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') res.sendStatus(401);
    else {
      await Birthday.update({ role: req.body.role }, {
        where: {
          id: req.params.id,
        }
      });
      const result = await Birthday.findByPk(req.params.id);
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
            await Birthday.destroy({
                where: {
                    birthdayID: req.params.id,
                },  
            });
            const updatedBirthday = await Task.findAll(req.user.role === 'admin' ? {} : { where: { birthdayID: req.user.id } });
            next(updatedBirthday);
        }    
    }
  } catch (err) {
    next(err);
  }
})
module.exports = router;