// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var db = require("../db/db.json");
const fs = require("fs");
// db.push({title:"Title One", text:"One Text"});
// console.log(db);

var notesData = getNotes();

function getNotes() {
  let data = fs.readFileSync('./db/db.json');

  let notes = JSON.parse(data);

  // Give each note an ID that matches its index (this gets run for every time the page is refreshed)
  for (let i = 0; i < notes.length; i++) {
      notes[i].id = '' + i;
  }

  return notes;
}

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
 app.get("/api/notes", function(req, res){
  notesData = getNotes();
  res.json(notesData);
 });


 app.post("/api/notes", function(req, res) {
  // console.log("save data: ", req.body);
  // console.log("new obj: ", Object.assign(req.body, {"id": 1}))
  let newId = notesData.length;
  Object.assign(req.body, {"id": newId.toString()});
  // console.log('new note with id ', noteId);
  notesData.push(req.body);
  fs.writeFile('db/db.json', JSON.stringify(notesData), (error) => {
    if(error) throw error;
    console.log("file saved: ", notesData);
  });
  res.json(notesData);
});

app.delete("/api/notes/:id", function(req, res){
  console.log("delete this")
  const requestID = req.params.id;
  console.log("request id: ", requestID);

  notesData = notesData.filter(note => {
    return note.id !== requestID ? note : null ;
  });

  fs.writeFile('db/db.json', JSON.stringify(notesData), (error) => {
    if(error) throw error;
    console.log("file deleted: ", notesData);
  });

});



 
};
