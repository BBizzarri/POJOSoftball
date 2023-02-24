//import functions from tournament model
import {
    getEvents,
    getEventById,
    addEvent,
    updateEventById,
    deleteEventById,
} from "../models/EventsModel.js";


//get all events
export const showEvents = (req, res) => {
    getEvents((err, results) =>{
        if(err){
           res.send(err);
        } else {
            res.json(results);
        }
    });
};

//get single event
export const showEventById = (req, res) => {
    getEventById(req.params.id, (err, results) =>{
      if(err){
        res.send(err);
      } else {
          res.json(results);
      }
    });
};

//create new event
export const createEvent = (req, res) => {
  console.log(req.body);
  const data = req.body;
  addEvent(data, (err, results) => {
    if(err){
      res.send(err);
    } else {
        res.json(results);
    }
  });
};

//update event 
export const updateEvent = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateEventById(data, id, (err, results) => {
    if(err){
      res.send(err);
    } else {
        res.json(results);
    }
  });
};

//delete event
export const deleteEvent = (req, res) => {
  const id = req.params.id;
  deleteEventById(id, (err, results) => {
    if(err){
      res.send(err);
    } else {
        res.json(results);
    }
  });
};