const axios = require('axios');
const fs = require('fs');
const express = require('express');
const app = express();

let resetCounter = 0;
let currentPokemon = 'pikachu';

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Pokemon Soft Reset Counter</h1>
        <p>Current reset count: ${resetCounter}</p>
        <button onclick="window.location.href='/reset'">Reset</button>
        <br><br>
        <img src="/pokemon" alt="Pokemon" id="pokemon-image">
        <br><br>
        <form action="/set-pokemon" method="POST">
          <label for="pokemon-name">Set Pokemon:</label>
          <input type="text" id="pokemon-name" name="pokemonName">
          <button type="submit">Set</button>
        </form>
      </body>
    </html>
  `);
});

app.get('/reset', (req, res) => {
  resetCounter++;
  res.redirect('/');
});

app.post('/set-pokemon', (req, res) => {
  currentPokemon = req.body.pokemonName;
  res.redirect('/');
});

app.get('/pokemon', async (req, res) => {
  try {
    // Make a GET request to the PokeAPI to get the Pokemon data
    //const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`);
    //const response = await axios.get("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png");

    // Get the image URL from the response
    //const imageUrl = response.data.sprites.front_default;
    //const imageUrl = response.data.

    // Make a GET request to the image URL to download the image
    const imageUrl = "https://adansinacento.github.io/Shiny-Hunt-Tool/sprites/498.png";
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Set the response headers
    res.set('Content-Type', 'image/png');

    // Send the image data in the response
    console.log(imageResponse.data);
    res.send(imageResponse.data);
    //res.send("<img src = \"" + imageUrl + "\">");
  
  } catch (error) {
    console.error(`Error getting image for Pokemon ${currentPokemon}:`, error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
