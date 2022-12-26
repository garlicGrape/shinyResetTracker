const axios = require('axios');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

let resetCounter = 0;
//let currentPokemon = 25;
let pokemonNumber = 25;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Pokemon Soft Reset Counter</h1>
        <p>Current reset count: ${resetCounter}</p>
        <button onclick="window.location.href='/reset'">Reset</button>
        <br><br>
        <img src="/pokemon" alt="Pokemon" id="pokemon-image" width="200" height="200">
        <br><br>
        <form action="/set-pokemon" method="POST">
          <label for="pokemon-number">Set Pokemon:</label>
          <input type="text" id="pokemon-number" name="pokemonNumber">
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

// app.post('/set-pokemon', (req, res) => {
//   currentPokemon = req.body.pokemonName;
//   res.redirect('/');
// });



app.post('/set-pokemon', (req, res) => {
    console.log(req.body.pokemonNumber);
    pokemonNumber = req.body.pokemonNumber;
    res.redirect('/');
  });

app.get('/pokemon', async (req, res) => {
  try {
    // Make a GET request to the image URL to download the image
    const imageResponse = await axios.get(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg`, { responseType: 'arraybuffer' });

    // Set the response headers
    res.set('Content-Type', 'image/svg+xml');

    // Send the image data in the response
    res.send(imageResponse.data);
  } catch (error) {
    console.error(`Error getting image for Pokemon ${currentPokemon}:`, error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
