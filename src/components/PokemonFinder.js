import React, { Component } from 'react';
import Button from './Button';
import axios from 'axios';

export default class PokemonFinder extends Component {
    constructor(props){
        super(props)
        this.state = {
            foundPokemon: [],
            id: '',
            pokemonTeam: []
        }
        this.getPokemonById = this.getPokemonById.bind(this);
        this.addPokemon = this.addPokemon.bind(this);
    }

    universalInput(prop, val){
        this.setState({
            [prop]: val
        })
    }

    componentDidMount(){
        this.getPokemonById();
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

    render(){
        const {foundPokemon, id} = this.state;
        return(
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
        )
    }
}