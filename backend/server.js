import express from "express"
import mongoose from "mongoose";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json()); //Sallii json datan vastaanoton

let notes = [
  // ...
];


//TODO: GET ja POST
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.get('/api/notes:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
 if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

//Käynnistää palvelimen
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
