import express from "express";

import {
    showTournaments, 
    showTournamentById,
    createTournament,
    updateTournamnet,
    deleteTournament,
} from "../controllers/Tournament.js";

import {
    showEvents, 
    showEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} from "../controllers/Events.js";

//init express router 
const router = express.Router();

//get all tournaments
router.get("/Tournaments", showTournaments);

//get singe tournament
router.get("/Tournamnets/:id", showTournamentById);

//create new tournament
router.post('/Tournaments', createTournament);

//update tournamnet
router.put('/Tournaments/:id', updateTournamnet);

//delete tournament
router.delete('/Tournaments/:id', deleteTournament);

//get all events
router.get("/Events", showEvents);

//get singe tournament
router.get("/Events/:id", showEventById);

//create new tournament
router.post('/Events', createEvent);

//update tournamnet
router.put('/Events/:id', updateEvent);

//delete tournament
router.delete('/Events/:id', deleteEvent);

//export default router
export default router