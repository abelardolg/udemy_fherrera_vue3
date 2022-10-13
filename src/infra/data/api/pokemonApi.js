import axios from "axios";

const API = `https://pokeapi.co/api/v2/pokemon/`;

const pokemonApi = axios.create({
    baseURL: API
})

export default pokemonApi;