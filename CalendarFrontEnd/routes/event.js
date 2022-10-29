require('dotenv').config()
const express = require("express");
const router = express.Router();
const crypto = require('crypto'); //native to node
const bcrypt = require('bcrypt'); //npm install
const cors = require('cors');
const cookieParser = require("cookie-parser"); // you need this to access req.cookies
const { body, validationResult } = require('express-validator');
const { User, Event, Birthday } = require("../models");
const SALT_COUNT = 10; //defined by us
const jwt = require('jsonwebtoken');
const console = require('console');

// Create Event
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
        const allEvents = await Event.findAll({where:{event:ID}})
        if(allEvents.length === 0 ){
        const newEvent = await Event.create({ title, date, description, ID});
        res.json(newEvent);
        }
      } catch (error) {
        next(error);
      }
});

// Get All Events
router.get("/", async (req, res, next) => {
    try {
      if(!req.user) res.sendStatus(401);
      else {
        const event = await Event.findAll(req.user.role === 'admin' ? {} : { where: { userId: req.user.id } });
        next(event);
      }  
    } catch (error) {
      console.error(error);
      next(error)
    }
  })

// Get Specific Event
router.get("/:id", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const existingEvent = await Event.findOne({ where: { ID } }); 
  } catch (error) {
    console.error(error);
    next(error)
  }
})

// Update Event
router.put('/role/:id', async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') res.sendStatus(401);
    else {
      await Event.update({ role: req.body.role }, {
        where: {
          id: req.params.id,
        }
      });
      const result = await Event.findByPk(req.params.id);
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
            await Event.destroy({
                where: {
                    id: req.params.id,
                },  
            });
            const updatedEvent = await Event.findAll(req.user.role === 'admin' ? {} : { where: { userId: req.user.id } });
            next(updatedEvent);
        }    
    }
  } catch (err) {
    next(err);
  }
})
module.exports = router;