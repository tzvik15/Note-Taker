const express = require("express");
const path = require("path");
const fs = require("fs");
let autoIterator = 1;

const db = path.join(__dirname, "/db/db.json");

//a process for reading the JSON file containing the array of existing note.
const dbRead = JSON.parse(
  fs.readFileSync(db, (err, data) => {
    if (err) throw err;
  })
);

//a function that reads the existing json file (using the above process), filteres out any "null"s, and writes the filtered array back to the json
const dbWrite = dbRead => {
  let filtered = dbRead.filter(function(el) {
    return el != null;
  });
  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(filtered),
    err => {
      if (err) throw err;
    }
  );
};

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//server processes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/index", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.json(dbRead);
});

//the post method gets the information from the body of the submitted note, adds an id to the note corresponding to an automatically incrementing variable (so each note gets a unique, numbered id), pushes the newnote into the array that dbRead reads (the json file), and callbacks the write function, thus creating a new json file which includes the new note data.
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = autoIterator;
  autoIterator++;
  dbRead.push(newNote);
  dbWrite(dbRead);
  return res.json(dbRead);
});

//the process for deleting a note by note id. Since the notes have id's starting with 1, but the json file is an array (so starting at index 0), the deleted note is actually set to id-1 - to correspond to the way they are stored in the json array
app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  delete dbRead[id - 1];
  dbWrite(dbRead);
  res.send(dbRead);
});

//activate the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
