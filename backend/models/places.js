const mongoose = require("mongoose");

//------Skeema-----

const placeSchema = new mongoose.Schema({
  tyyppi: { type: String, required: true },
  maksu: { type: Boolean, required: false },
  maksutapa: [{ type: String }],
  aikarajoitus: { type: Number, required: false },
  sijainti: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  lisatiedot: { type: String },
});

module.exports = mongoose.model("Place", placeSchema);
