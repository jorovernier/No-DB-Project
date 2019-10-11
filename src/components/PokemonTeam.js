import React, { Component } from 'react';
import axios from 'axios';

export default class PokemonTeam extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemonTeam: []
        }
        this.getPokemonTeam = this.getPokemonTeam.bind(this);
    }

    componentDidMount(){
      this.getPokemonTeam();
    }

    getPokemonTeam(){
        axios.get('/api/team').then(response => {
          this.setState({
            pokemonTeam: response.data
          })
        }).catch(err => console.log(err))
      }

    render(){
        const {pokemonTeam} = this.state;
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

        return(
          <div className='team-box'>
            <div>{mappedTeam}</div>
          </div>
        )
    }
}