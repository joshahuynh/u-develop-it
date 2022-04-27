const fs = require("fs");
const express = require("express");
const path = require("path");
const uniqid = require('uniqid');

const app = express();
const PORT = process.env.PORT || 3001;
let notedata = require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));



app.get("/api/notes", (req, res) => {
    res.json(notedata);
});

app.post("/api/notes", (req, res) => {
    req.body.id=uniqid();
   const newNote = addNewNote(req.body,notedata)
   fs.writeFileSync('./db/db.json',JSON.stringify(notedata))
   res.JSON(notedata)

  
})

function addNewNote(body,notesArray){
    const newNote=body;
    notesArray.push(newNote)
    fs.writeFileSync(path.join(__dirname,'./db/db.json'),JSON.stringify({noteDB: notesArray}))
    return newNote
}

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, ("public/notes.html")));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, ("./public/index.html")));
});



app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));