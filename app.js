const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let notesData = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');

})
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
  
  })
app.get('/api/notes', (req, res) => {
  notesData = fs.readFileSync("/db/db.json");
  notesData = JSON.parse(notesData);
  res.json(notesData);
 
  })

app.post('/api/notes', function (req, res) {
  let newNote = req.body
  notesData = fs.readFileSync("/db/db.json");
  newNote.id = notesData.length;
  notesData.push(newNote);
  notesData = JSON.stringify (notesData);
  fs.writeFile("/db/db.json", notesData);
  res.json(newNote);

    // res.send('Got a POST request')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})