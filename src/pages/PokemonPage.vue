<template>
  
  <h1 v-if="!pokemon">Espere, por favor...</h1>

  <div v-else>
    <h1>¿Quién es este Pokemon?</h1>
    <PokemonImage 
        :pokemon-id="pokemon.id" 
        :show-pokemon="showPokemon"
    />

    <PokemonOptions 
      :pokemon-options="pokemonOptionsCollection"
      @selected-pokemon="checkAnswer"
      v-if="!showAnswer"
    />

    <button v-else @click="newGame">Nuevo juego</button>
  </div>
</template>

<script>
import PokemonImage from '@/components/PokemonImage';
import PokemonOptions from '@/components/PokemonOptions';

import getPokemonOptions from "@/infra/data/api/getPokemonOptions";


export default {
    components: { 
        PokemonOptions
        , PokemonImage
    }
    , data() {
        return {
          pokemonOptionsCollection: [],
          pokemon: null,
          showPokemon: false,
          showAnswer: false
        }
    }
    , methods: {
      async mixPokemonOptions() {
        this.pokemonOptionsCollection = await getPokemonOptions();

        const randomPokemon = Math.floor( Math.random() * 4 );

        this.pokemon = this.pokemonOptionsCollection[randomPokemon];
      }
      , checkAnswer(pokemonId) {
        this.showAnswer = true;
        this.showPokemon = (this.pokemon.id === pokemonId);
      }
      , newGame() {
        this.showPokemon = false;
        this.pokemon = null;
        this.showAnswer = false;
        this.mixPokemonOptions();
       
      }
    }
    , mounted() {
      this.mixPokemonOptions();
    }
}
</script>

<style>

</style>