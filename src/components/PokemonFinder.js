import React, { Component } from 'react';
import axios from 'axios';

export default class PokemonFinder extends Component {
    constructor(props){
        super(props)
        this.state = {
            foundPokemon: [],
            id: ''
        }
        this.getPokemonById = this.getPokemonById.bind(this);
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

    render(){
        const {foundPokemon, id} = this.state;
        return(
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.getPokemonById(id);
                    this.setState({
                        foundPokemon: [],
                        id: ''
                    })
                }}>
                    <label>Find Pokemon</label>
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
            </div>
        )
    }
}