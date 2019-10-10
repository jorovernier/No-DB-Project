const pokedex = require('../data.json');
const team = require('../team.json');
// var id = 1;

// const {id} = req.params;
// const indexFinder = pokedex.findIndex((pokemon) => {
//     return pokemon.id === parseInt(id);
// })

// if(index !== -1){
//     res.status(200).send(pokedex)
// } else {
//     res.status(404).send('Pokemon not found.')
// }

module.exports = {
    getPokemon: (req, res, next) => {
        res.status(200).send(pokedex);
    },
    getPokemonById: (req, res, next) => {
        const {id} = req.params;

        const index = pokedex.findIndex((pokemon) => {
            return pokemon.id === parseInt(id);
        })

        if(index !== -1){
            res.status(200).send(pokedex[index])
        } else {
            res.status(404).send('Pokemon not found.')
        }
    },
    addPokemon: (req, res, next) => {
        const {id, name, species, type, personality, pokemonImg} = req.body;
        const newPokemon = {
            id,
            name,
            species,
            type,
            personality,
            pokemonImg
        }
        team.push(newPokemon);
        // id++;
        console.log(team)

        res.status(200).send(team)
    },
    editPokemon: (req, res, next) => {
        const {id} = req.params;
        const {newName} = req.query;

        const index = team.findIndex((pokemon) => {
            return pokemon.id === parseInt(id);
        })

        if(index !== -1){
            team[index].name = newName || team[index].name;
            res.status(200).send(team)
        } else {
            res.status(404).send('Change name failed.')
        }
    },
    deletePokemon: (req, res, next) => {
        const {id} = req.params;

        const index = team.findIndex((pokemon) => {
            return pokemon.id === parseInt(id);
        })

        if(index !== -1){
            team.splice(index, 1);
            res.status(200).send(team)
        } else {
            res.status(404).send('Remove pokemon failed.')
        }
    }
}