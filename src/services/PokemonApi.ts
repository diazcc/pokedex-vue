// LangServices.ts
import axios from 'axios';

const PokemonApi = {
    async getAllPokemons() {
        return axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000")
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error.response.data;
            });
    },
    async getPokemon(pokemon:any) {
        return axios.get("https://pokeapi.co/api/v2/pokemon/"+pokemon)
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error.response.data;
            });
    },
};

export default PokemonApi;