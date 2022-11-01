//import connection
import db from "../config/database.js";

//get all tournaments
export const getTournaments = (result)=> {
    db.query("SELECT * FROM Tournaments",(err,results)=>{
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results);
        }
    });
};

//get single tournament
export const getTournamentById=(id, result)=>{
    db.query("SELECT * FROM Tournaments WHERE TournamentID = ?",[id],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results[0]);
        }
    });
};

//insert tournament to database
export const addTournament=(data, result) => {
    db.query("INSERT INTO Tournaments SET?", [data], (err, results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results);
        }
    });
};

//update tournament 
export const updateTournamentById = (data, id, result) => {
    db.query("UPDATE Tournaments SET TournamentName = ?, TournamentDescription = ?, AgeGroup = ?, StartDate = ?, EndDate = ?, Location = ?, GameGuarentee = ?, Cost = ?, TeamMax = ?, ContactName = ?, ContactPhone = ?, CoverImage = ?, ShowTournament = ? WHERE TournamentID = ?", [data.TournamentName, data.TournamentDescription, data.AgeGroup, data.StartDate, data.EndDate, data.Location, data.GameGuarentee, data.Cost, data.TeamMax, data.ContactName, data.ContactPhone, data.CoverImage, data.ShowTournament, id], (err, results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results);
        }
    });
};

//delete tournament
export const deleteTournamentById = (id, result) => {
    db.query("DELETE FROM Tournaments WHERE TournamentID = ?", [id], (err, results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results);
        }
    })
}