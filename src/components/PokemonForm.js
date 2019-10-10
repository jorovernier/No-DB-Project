import React, { Component } from 'react';
// import axios from 'axios';

export default class PokemonForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            species: '',
            type: '',
            personality: '',
            pokemonImg: ''
        }
        // this.getPokemonById = this.getPokemonById.bind(this);
    }

    universalInput(prop, val){
        this.setState({
            [prop]: val
        })
    }

    // getPokemonById(){
    //     axios.get(`/api/pokemon/${this.state.id}`).then(response => {
    //       this.setState({
    //         id: response.data.id,
    //         species: response.data.species,
    //         type: response.data.type,
    //         pokemonImg: response.data.pokemonImg
    //       })
    //     }).catch(err => console.log(err))
    //   }

    render(){
        return(
            <form onSubmit={(e) => {
                e.preventDefault();
                this.props.addPokemon(
                    this.state.id,
                    this.state.name,
                    this.state.species,
                    this.state.type,
                    this.state.personality
                );
                this.setState({
                    id: '',
                    name: '',
                    species: '',
                    type: '',
                    personality: ''
                })
                // this.getPokemonById();
            }}>
                <label>Name</label>
                <input 
                value={this.state.name}
                onChange={(e) => this.universalInput('name', e.target.value)} />

                {/* <label>Species</label>
                <input 
                value={this.state.species}
                onChange={(e) => this.universalInput('species', e.target.value)} /> */}

                <label>Dex #</label>
                <input
                value={this.state.id}
                onChange={(e) => this.universalInput('id', e.target.value)} />

                {/* <label>Type</label>
                <input
                value={this.state.type}
                onChange={(e) => this.universalInput('type', e.target.value)} /> */}

                <label>Personality</label>
                <input 
                value={this.state.personality}
                onChange={(e) => this.universalInput('personality', e.target.value)} />

                {/* <label>Image</label>
                <input 
                value={this.state.pokemonImg}
                onChange={(e) => this.universalInput('pokemonImg', e.target.value)} /> */}

                <button>Add</button>

            </form>
        )
    }
}

// getPokemonById(){
//     axios.get(`/api/pokemon/${this.state.id}`).then(response => {
//       axios.post('/api/add_pokemon', {...response.data}).then((res) => {
//         this.props.addPokemon(res.data)
//       })
//     }).catch(err => console.log(err))
//   }

// getPokemonById(){
//     axios.get(`/api/pokemon/${this.state.id}`).then(response => {
//       this.setState({
//         species: response.data.species,
//         id: response.data.id,
//         type: response.data.type,
//         pokemonImg: response.data.pokemonImg
//       })
//     }).catch(err => console.log(err))
//   }