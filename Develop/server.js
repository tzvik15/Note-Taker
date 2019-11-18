const express = require("express");
const path = require("path");
const fs = require("fs");

const db = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"),(err, data) => {
    if (err) throw err;
}));

const dbWrite = (newRes) => { return fs.writeFile(path.join(__dirname, "/db/db.json"),newRes, (err)=>{
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

app.get("notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(db);
});

app.post("/api/notes", (req, res)=>{
    let newRes = req.body;
    
    dbWrite(newRes);
    
    
    console.log(newRes)

    res.json(newRes);
  
})













//activate the server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });