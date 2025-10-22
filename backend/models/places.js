const mongoose = require("mongoose");

//------Skeema-----

const placeSchema = new mongoose.Schema({
  tyyppi: { type: String,   required: true },
  maksu: { type: Boolean, required: true },
  maksutapa: [{ type: String }], 
  aikarajoitus: { type: Number, required: false }, 
  sijainti: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  lisatiedot: { type: String }
});

module.exports = mongoose.model("Place", placeSchema);