// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var db = require("../db/db.json");
const fs = require("fs");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
 app.get("/api/notes", function(req, res){
  res.json(db);
 });


 app.post("/api/notes", function(req, res) {
  console.log(req.body);
});



 
};
