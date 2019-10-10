const express = require('express');
const app = express();
app.use(express.json());

const { getPokemon, getPokemonById, addPokemon, editPokemon, deletePokemon } = require('./controller/pokemonController');

app.get('/api/pokemon', getPokemon)
app.get('/api/pokemon/:id', getPokemonById)
app.post('/api/add_pokemon', addPokemon)
app.put('/api/edit_pokemon/:id', editPokemon)
app.delete('/api/delete_pokemon/:id', deletePokemon)

const port = 6000;
app.listen(port, () => console.log(`Listening on port ${port}`));