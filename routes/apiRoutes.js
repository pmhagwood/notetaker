// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var db = require("../db/db.json");
const fs = require("fs");
// db.push({title:"Title One", text:"One Text"});
// console.log(db);

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
 app.get("/api/notes", function(req, res){
  res.json(db);
 });


 app.post("/api/notes", function(req, res) {
  console.log(req.body);
  db.push(req.body);
  fs.writeFile('db/db.json', JSON.stringify(db), (error) => {
    if(error) throw error;
    console.log("file saved");
  });
  res.json(db);
});



 
};
