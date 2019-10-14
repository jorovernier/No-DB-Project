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
      inputName: '',
      inputPers: '',
      edit: false,
      search: false,
      id: '',
      newName: '',
      newPers: ''
    };
    this.getAllPokemon = this.getAllPokemon.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
    this.getPokemonById = this.getPokemonById.bind(this);
    this.getPokemonTeam = this.getPokemonTeam.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
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

  editPokemon(id){
   const updated = {
      newName: this.state.inputName,
      newPers: this.state.inputPers
    }
    axios.put(`/api/edit_pokemon/${id}`, updated).then(response => {
      this.setState({
        pokemonTeam: response.data,
        edit: false
      })
    })
  }

  deletePokemon(id){
    axios.delete(`/api/delete_pokemon/${id}`).then(response => {
      this.setState({
        pokemonTeam: response.data
      })
    }).catch(err => console.log(err))
  }

  setEdit(){
    this.setState({
      edit: !this.state.edit
    })
  }

// --------------------------------------Const Variables-------------------------------------------- //

  render(){
    const {pokemon, pokemonTeam, foundPokemon, id, edit, search} = this.state;

    const mappedPokemon = pokemon.map(pokemon => {
      return (
        <div className='pokedex-display' key={pokemon.id} >

          <div className='pokemon'>
            <span className='sprite-image'>
              <img src={pokemon.sprite} alt='pokemon team member' />
            </span>

            <span className='one'>{pokemon.species} </span>

            <span className='two'>Dex #: {pokemon.id} </span>

            <span className='three'>Type: {pokemon.type} </span>
          </div>

        </div>
      )
    })

    const mappedTeam = pokemonTeam.map(pokemon => {
      return(
        <div className='team-display' key={pokemon.id}>
          <div className='teammate'>
            <h1>{pokemon.name}</h1>

            <h2>{pokemon.species}</h2>

            <div>{pokemon.personality}</div>

            <div>Type: {pokemon.type}</div>

            <div className='image'>
              <img src={pokemon.pokemonImg} alt='pokemon team member' />
            </div>

            {edit ? 
                <span className='edit-inputs'> 
                  <input onChange={(e) => this.universalInput("inputName", e.target.value)} label='Name' placeholder='Name'/> 
                  <input onChange={(e) => this.universalInput("inputPers", e.target.value)} label='Personality' placeholder='Personality'/> 
                  <Button handleClick={() => this.editPokemon(pokemon.id)} label='Save' /> 
                </span> : 
                <></> 
            }

            <Button handleClick={() => this.setEdit()} label='Edit'/>

            <Button handleClick={() => this.deletePokemon(pokemon.id)} label='Remove'/>

          </div>
                
        </div>
      )
    })
    

// --------------------------------------All Function Returns-------------------------------------------- //
    
    return (
      <div className="main">

        <header>
          <span>Pokedex</span>
          <span>Pokemon Finder</span>
          <span>Team</span>
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
                    id: '',
                    search: true
                })
              }}>
                <div className='form'>
                  <label>Who's that Pokemon?</label>
                  <input 
                  placeholder='Dex #'
                  value={id} 
                  onChange={(e) => this.universalInput("id", e.target.value)} />

                  <button>Search</button>
                </div>
            </form>

            <div>
              {search ? 
                <div className='found-pokemon'>
                  <div>Pokemon: {foundPokemon.species}</div>
                  <span>Type: {foundPokemon.type}</span>
                  <div>
                    <img src={foundPokemon.pokemonImg} alt='' />
                  </div>
                  <Button handleClick={this.addPokemon} label='Add To Team!'/> 
                </div>
                : <></>}
            </div>

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
