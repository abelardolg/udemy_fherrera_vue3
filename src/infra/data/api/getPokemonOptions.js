import pokemonApi from "./pokemonApi";


const getPokemons = () => {

    const pokemonNames = Array.from( Array (650) );

    return pokemonNames.map( (_, index ) => index + 1 );
    

}

const getPokemonOptions = async () => {

    const mixedPokemons = getPokemons()
                            .sort( () => Math.random() - 0.5 );
    

    const pokemonNames = await getPokemonNames(mixedPokemons.splice(0,4));

    return pokemonNames;

}

const getPokemonNames = async ( [a, b, c, d] = [] ) => {
    
    const arrPromises = [
        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`),
    ]
    const [ pokemonA, pokemonB, pokemonC, pokemonD ] = await Promise.all( arrPromises );

    return [
        {name: pokemonA.data.name, id: pokemonA.data.id },
        {name: pokemonB.data.name, id: pokemonB.data.id },
        {name: pokemonC.data.name, id: pokemonC.data.id },
        {name: pokemonD.data.name, id: pokemonD.data.id }
    ]
}

export default getPokemonOptions;