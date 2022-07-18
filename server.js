const fs = require('fs');
const express = require('express');
const path = require('path');
const { response } = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json');

app.use(express.static('./public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// initialize empty array in which to store notes
let userNotes = [];

function addNote(data) {
    userNotes.push(data);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({db: userNotes}, null, 2)
    );
    return data;
};

// send stored notes to user
app.get('/api/notes', (req, res) => {
    res.json(userNotes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = 1; //insert note ID function here
    const data = req.body;
    addNote(data);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});