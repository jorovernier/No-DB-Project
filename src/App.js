import React from 'react';
import './App.css';
import axios from 'axios';
import PokemonForm from './components/PokemonForm';
import PokemonFinder from './components/PokemonFinder';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pokemon: [],
      pokemonTeam: []
    };
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
  }

  componentDidMount(){
    this.getAllPokemon();
  }

  getAllPokemon(){
    axios.get('/api/pokemon').then(response => {
      this.setState({
        pokemon: response.data
      })
    }).catch(err => console.log(err))
  }

  addPokemon(id,
    name,
    species,
    type,
    personality,
    pokemonImg){
    const newPokemon = {id,
      name,
      species,
      type,
      personality,
      pokemonImg}

    axios.post('/api/add_pokemon', newPokemon).then(response => {
      this.setState({
        pokemonTeam: response.data
      })
    }).catch(err => console.log(err));
  }

  render(){
    console.log(this.state.pokemonTeam)
    const {pokemon, pokemonTeam} = this.state;

    const mappedTeam = pokemonTeam.map(pokemon => {
      return(
        <div className='team-display'>
          <h1>{pokemon.name}</h1>
          <h2>{pokemon.species}</h2>
          <div>{pokemon.personality}</div>
          <div>Type: {pokemon.type}</div>
          <div className='image'>
            <img src={pokemon.pokemonImg} alt='pokemon team member' />
          </div>
        </div>
      )
    })

    const mappedPokemon = pokemon.map(pokemon => {
      return (
        <div className='pokedex-display' key={pokemon.id} >
          <h1>{pokemon.species}</h1>
          <span>Dex #: {pokemon.id} Type: {pokemon.type}</span>
          <div className='image'>
            <img src={pokemon.pokemonImg} alt='pokemon team member' />
          </div>
        </div>
      )
    })
    
    return (
      <div className="main">

        <header>
          Pokemon are cool!
        </header>

        <div className='displays'>

          <div className='pokedex'>
            <span>{mappedPokemon}</span>
          </div>

          <div>
            <PokemonFinder />
          </div>

          <div className='team'>
            <PokemonForm addPokemon={this.addPokemon}/>
            <span>{mappedTeam}</span>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
