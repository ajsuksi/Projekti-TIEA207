  // Tarkista, onko sijainti vedellä käyttämällä IsItWater API:a
  export const isWater = async (lat, lng) => {
    const url = `https://isitwater-com.p.rapidapi.com/?latitude=${lat}&longitude=${lng}`;
    const options = {
      method: 'GET',
      headers: {
      'x-rapidapi-key': '2e998c5e8fmsheff08ed4f05429ep153ba3jsn8944ce6110fc',
      'x-rapidapi-host': 'isitwater-com.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.text();
  console.log(result);
    return result.includes('"water":true');
  } 
  
  catch (error) {
    console.error("Virhe vesi-tarkistuksessa:", error);
  return false; // Sallitaan lisäys virhetilanteessa
  }
};