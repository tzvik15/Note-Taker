const express = require("express");
const path = require("path");
const fs = require("fs");
let autoIterator = 1;

const db = path.join(__dirname, "/db/db.json")

const dbRead = JSON.parse(fs.readFileSync(db,(err, data) => {
    if (err) throw err;
}));

const dbWrite = (dbRead) => {
    fs.writeFileSync(path.join(__dirname, "/db/db.json"),JSON.stringify(dbRead), (err)=>{
    if (err) throw err;
})
}


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

app.post("/api/notes", (req, res)=>{
    let newNote = req.body;
    newNote.id = autoIterator;
    autoIterator++;
    dbRead.push(newNote);
    dbWrite(dbRead);
    return res.json(dbRead);
})

app.delete("/api/notes/:id" , (req,res)=>{
    let id = req.params.id;
    delete dbRead[id-1];
    let filtered = dbRead.filter(function (el) {
        return el != null;
    });
    dbWrite(filtered);
    res.send(filtered);
})












//activate the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });