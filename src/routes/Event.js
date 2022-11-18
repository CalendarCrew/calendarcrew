const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Event} = require("../models");
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
        const allEvents = await Event.findAll({where:{event:id}})
        if(allEvents.length === 0 ){
        const newEvent = await Event.create({ title, date, description, id});
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
    const existingEvent = await Event.findByPk(req.params.id); 
    next(existingEvent);
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

router.delete('/:id', async (req, res, next) => {
  try {
    if(!req.user) res.sendStatus(401);
    else {
        if(req.user.role !== 'admin') res.sendStatus(401);
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