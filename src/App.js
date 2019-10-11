import React from 'react';
import './App.css';
import axios from 'axios';
import Button from './components/Button';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pokemon: [],
      foundPokemon: [],
      pokemonTeam: [],
      id: ''
    };
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
    this.getPokemonById = this.getPokemonById.bind(this);
    this.getPokemonTeam = this.getPokemonTeam.bind(this);
  }

// -----------------------------------------All Functions----------------------------------------- //

  componentDidMount(){
    this.getAllPokemon();
    this.getPokemonById();
    this.getPokemonTeam();
  }

  getAllPokemon(){
    axios.get('/api/pokemon').then(response => {
      this.setState({
        pokemon: response.data
      })
    }).catch(err => console.log(err))
  }

  getPokemonById(){
      axios.get(`/api/pokemon/${this.state.id}`).then(response => {
        this.setState({
          foundPokemon: response.data
        })
      }).catch(err => console.log(err))
  }

  addPokemon(){
    const {name, species, type, personality, pokemonImg} = this.state.foundPokemon;
    const newPokemon = {name, species, type, personality, pokemonImg};

    axios.post('/api/add_pokemon', newPokemon).then(response => {
      this.setState({
        pokemonTeam: response.data
      })
    }).catch(err => console.log(err));
  }

  getPokemonTeam(){
    axios.get('/api/team').then(response => {
      this.setState({
        pokemonTeam: response.data
      })
    }).catch(err => console.log(err))
  }

  universalInput(prop, val){
    this.setState({
      [prop]: val
    })
  }

// --------------------------------------Const Variables-------------------------------------------- //

  render(){
    const {pokemon} = this.state;
    const {foundPokemon, id} = this.state;
    const {pokemonTeam} = this.state;
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
    const mappedTeam = pokemonTeam.map(pokemon => {
      return(
        <div className='team-display' key={pokemon.name}>

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

// --------------------------------------All Function Returns-------------------------------------------- //
    
    return (
      <div className="main">

        <header>
          Pokedex!
        </header>

        <div className='displays'>

          {/* ----------------------------------------------------------------- */}

          <div className='pokedex'>
            <span>{mappedPokemon}</span>
          </div>

          {/* ----------------------------------------------------------------- */}

          <div className='poke-finder'>

            <form onSubmit={(e) => {
                e.preventDefault();
                this.getPokemonById(id);
                this.setState({
                    foundPokemon: [],
                    id: ''
                })
              }}>
                <label>Who's that Pokemon?</label>
                <input 
                value={id} 
                onChange={(e) => this.universalInput("id", e.target.value)} />

                <button>Search</button>
            </form>

            <div>Pokemon: {foundPokemon.species}</div>
            <span>Type: {foundPokemon.type}</span>
            <div>
              <img src={foundPokemon.pokemonImg} alt='' />
            </div>

            <Button handleClick={this.addPokemon} label='Add To Team!'/>

          </div>

          {/* ----------------------------------------------------------------- */}

          <div className='team'>
            <div className='team-box'>
              <div>{mappedTeam}</div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}

        </div>
      </div>
    );
  }
}

export default App;
