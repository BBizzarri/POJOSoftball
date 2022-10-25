//import functions from tournament model
import {
    getTournaments,
    getTournamentById,
    addTournament,
    updateTournamentById,
    deleteTournamentById,
} from "../models/TournamentModel.js";


//get all tournaments
export const showTournaments = (req, res) => {
    getTournaments((err, results) =>{
        if(err){
           res.send(err);
        } else {
            res.json(results);
        }
    });
};

//get single tournament
export const showTournamentById = (req, res) => {
    getTournamentById(req.params.id, (err, results) =>{
      if(err){
        res.send(err);
      } else {
          res.json(results);
      }
    });
};

//create new tournamnet
export const createTournament = (req, res) => {
  const data = req.body;
  addTournament(data, (err, results) => {
    if(err){
      res.send(err);
    } else {
        res.json(results);
    }
  });
};

//update tournament 
export const updateTournamnet = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateTournamentById(data, id, (err, results) => {
    if(err){
      res.send(err);
    } else {
        res.json(results);
    }
  });
};

//delete tournament
export const deleteTournament = (req, res) => {
  const id = req.params.id;
  deleteTournamentById(id, (err, results) => {
    if(err){
      res.send(err);
    } else {
        res.json(results);
    }
  });
};