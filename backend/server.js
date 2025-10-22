//import express from "express";
//import cors from "cors";
//import dotenv from "dotenv";

require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json()); // Sallii JSON-datan vastaanoton
const cors = require("cors");
app.use(cors());

//yhdistä mongodb
const connectDB = require("./db.js");
const placesModel = require("./models/places.js");
connectDB(); //yhdistä database

//Get ja Post ->>> MUUTA
app.get("/api/places", async (req, res) => {
  try {
    const places = await placesModel.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Tietojen haku epäonnistui" });
  }
  //res.send("<h1>Tervetuloa  API:in!");
});

/*  Hae kaikki paikat
app.get("/api/places", (req, res) => {
  res.json(places);
}); */

// Hae yksittäinen paikka ID:n perusteella
app.get("/api/places/:id", async (req, res) => {
  try {
    const place = await placesModels.findById(req.params.id);
    if (place) res.json(place);
    else res.status(404).json({ error: "Paikkaa ei löytynyt" });
  } catch (error) {
    res.status(400).json({ error: "Virheellinen ID" });
  }
});

/* // Lisää uusi paikka
const generateId = () => {
  const maxId =
    places.length > 0 ? Math.max(...places.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
}; */

//TODO:
app.post("/api/places", async (request, response) => {
  console.log("inside post function");
  const body = request.body;

  const place = new placesModel({
    tyyppi: body.tyyppi,
    maksu: body.maksu,
    maksutapa: body.maksutapa,
    //id: generateId(),
  });

  const val = await place.save();
  console.log("Saved place:", val);

  response.json(place);
});

// Käynnistää palvelimen
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
