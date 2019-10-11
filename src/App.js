import React from 'react';
import './App.css';
import axios from 'axios';
import PokemonTeam from './components/PokemonTeam';
import PokemonFinder from './components/PokemonFinder';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pokemon: []
    };
    this.getAllPokemon = this.getAllPokemon.bind(this);
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

  render(){
    const {pokemon} = this.state;
    const mappedPokemon = pokemon.map(pokemon => {
      return (
        <div className='pokedex-display' key={pokemon.id} >

          <span className='sprite-image'>
            <img src={pokemon.sprite} alt='pokemon team member' />
          </span>

          <span>{pokemon.species} </span>

          <span>Dex #: {pokemon.id} </span>

          <span>Type: {pokemon.type} </span>

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

          <div className='poke-finder'>
            <PokemonFinder />
          </div>

          <div className='team'>
            <PokemonTeam />
          </div>

        </div>

      </div>
    );
  }
}

export default App;
