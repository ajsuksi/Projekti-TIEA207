const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json()); // Sallii JSON-datan vastaanoton
const cors = require("cors");
app.use(cors());

//yhdistä Mongodb
const connectDB = require("./db.js");
const placesModel = require("./models/places.js");
connectDB(); //yhdistä database

//Get Method
app.get("/api/places", async (req, res) => {
  try {
    const places = await placesModel.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Tietojen haku epäonnistui" });
  }
});

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


//Post method
app.post("/api/places", async (request, response) => {
  try{
   const { osoite, tyyppi, maksu, hinta, maksutapa, aikarajoitus, sijainti, lisatiedot } = request.body;

  // Tarkistetaan että pakolliset kentät on annettu
  if (!tyyppi || maksu === undefined) {
    return response.status(400).json({ error: "Puuttuvia kenttiä (tyyppi tai maksu)" });
  }

    const place = new placesModel({
      osoite,
      tyyppi,
      maksu,
      hinta,
      maksutapa,
      aikarajoitus,
      sijainti,
      lisatiedot,
    });
const val = await place.save(); 
console.log("Saved place:", val); 
console.log("Lähetetään takaisin frontendille:", val.toObject());
response.status(201).json(val);

  }catch (error) {
    console.error("Virhe tallennettaessa paikkaa:", error.message);
    response.status(500).json({ error: "Paikan tallennus epäonnistui" });
  }
 
});

// PUT method - Päivitä olemassa oleva paikka
app.put("/api/places/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    const { osoite, tyyppi, maksu, hinta, maksutapa, aikarajoitus, sijainti, lisatiedot } = req.body;

    // Tarkistetaan että pakolliset kentät on annettu
    if (!tyyppi || maksu === undefined) {
      return res.status(400).json({ error: "Puuttuvia kenttiä (tyyppi tai maksu)" });
    }

    const updated = await placesModel.findByIdAndUpdate(
      id,
      {
        osoite,
        tyyppi,
        maksu,
        hinta,
        maksutapa,
        aikarajoitus,
        sijainti,
        lisatiedot,
      },
      { new: true } // Palauta päivitetty dokumentti
    );

    if (!updated) {
      return res.status(404).json({ error: "Paikkaa ei löytynyt" });
    }

    console.log("Paikka päivitetty onnistuneesti:", updated);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Virhe paikan päivityksessä:", error.message);
    res.status(500).json({ error: "Paikan päivitys epäonnistui" });
  }
});

app.delete("/api/places/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log("Saapuva ID:", id);

    const deleted = await placesModel.findByIdAndDelete(id);

    if (!deleted) {
      console.log("Paikkaa ei löytynyt poistettavaksi");
      return res.status(404).json({ error: "Paikkaa ei löytynyt" });
    }

    console.log("Paikka poistettu onnistuneesti!");
    res.status(200).json({ message: "Paikan poisto onnistui" });
  } catch (err) {
    console.error("Virhe paikan poistossa:", err);
    res.status(500).json({ error: "Paikan poisto epäonnistui" });
  }
});

// Käynnistää palvelimen
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
