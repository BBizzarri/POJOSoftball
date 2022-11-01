//import connection
import db from "../config/database.js";

//get all tournaments
export const getEvents = (result)=> {
    db.query("SELECT * FROM Events",(err,results)=>{
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results);
        }
    });
};

//get single tournament
export const getEventById=(id, result)=>{
    db.query("SELECT * FROM Events WHERE EventID = ?",[id],(err,results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results[0]);
        }
    });
};

//insert tournament to database
export const addEvent=(data, result) => {
    db.query("INSERT INTO Events SET?", [data], (err, results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results);
        }
    });
};

//update tournament 
export const updateEventById = (data, id, result) => {
    db.query("UPDATE Events SET EventName = ?, EventDescription = ?, StartTime = ?, EndTime = ?,  StartDate = ?, EndDate = ?, Location = ?, ContactName = ?, ContactPhone = ?, CoverImage = ?, ShowEvent = ? WHERE EventID = ?", [data.EventName, data.EventDescription, data.StartTime, data.EndTime, data.StartDate, data.EndDate, data.Location, data.ContactName, data.ContactPhone, data.CoverImage, data.ShowEvent, id], (err, results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results);
        }
    });
};

//delete tournament
export const deleteEventById = (id, result) => {
    db.query("DELETE FROM Events WHERE EventID = ?", [id], (err, results) => {
        if(err){
            console.log(err);
            result(err,null)
        } else {
            result(null, results);
        }
    })
}