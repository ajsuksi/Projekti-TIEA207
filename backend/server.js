import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Sallii JSON-datan vastaanoton

// Esimerkkidata
let places = [
  {
    id: "1",
    tyyppi: "parkkihalli",
    maksu: "1,30",
    maksutapa: "moovy",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Tervetuloa  API:in!");
});

// Hae kaikki paikat
app.get("/api/places", (req, res) => {
  res.json(places);
});

// Hae yksittäinen paikka ID:n perusteella
app.get("/api/places/:id", (req, res) => {
  const id = req.params.id;
  const place = places.find((p) => p.id === id);

  if (place) {
    res.json(place);
  } else {
    res.status(404).json({ error: "Paikkaa ei löytynyt" });
  }
});

// Käynnistää palvelimen
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
