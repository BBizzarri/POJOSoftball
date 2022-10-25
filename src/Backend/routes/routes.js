import express from "express";

import {
    showTournaments, 
    showTournamentById,
    createTournament,
    updateTournamnet,
    deleteTournament,
} from "../controllers/Tournament.js";

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

//export default router
export default router