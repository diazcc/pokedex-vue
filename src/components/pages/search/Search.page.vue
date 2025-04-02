<template>
  <SearchTemplate :dataSearch="dataSearch" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import SearchTemplate from "../../templates/search/Search.template.vue";
import PokemonApi from "../../../services/PokemonApi";
import { usePokemonStore } from "../../../stores/pokemonStore.ts";

const pokemonStore = usePokemonStore();
let allPokemons = ref<any[]>([]);
const pokemonApi: any = PokemonApi;

const dataSearch: any = reactive({
  inputSearch: {
    value: "",
    onChange: () => {
      getPokemonsByValue();
    },
  },
  listFav: false,
  listAll: true,
  arrayResultList: [],
  setAll: () => setAll(),
  setFav: () => setFav(),
  dataModalCardPokemon: {
    isActive: false,
    pokemon: {
      name:'',
    },
    searchPokemon :(pokemon:any) =>{},
    addFav: () => {},
    shareFriends: () => {},
  },
  openPokemon: (name: any) => {
    openCardPokemon(name);
  },
});

onMounted(() => {
  loadAllPokemons();
});

function loadAllPokemons() {
  pokemonApi
    .getAllPokemons()
    .then((response: any) => {
      allPokemons.value = response.results;
      dataSearch.arrayResultList = response.results;
    })
    .catch((error: any) => {
      console.error("Error al cargar la lista de Pokémon:", error);
    });
}

function getPokemonsByValue() {
  const value = dataSearch.inputSearch.value;
  if (!value) {
    loadAllPokemons()
    return;
  }
  dataSearch.arrayResultList = allPokemons.value.filter((pokemon: any) =>
    pokemon.name.includes(value.toLowerCase())
  );
}

function setAll() {
  dataSearch.arrayResultList = [];
  dataSearch.listAll = true;
  dataSearch.listFav = false;
  loadAllPokemons();
}

function setFav() {
  dataSearch.arrayResultList = allPokemons.value.filter((pokemon) =>
    pokemonStore.favorites.some((fav) => fav.name === pokemon.name)
  );
  dataSearch.listAll = false;
  dataSearch.listFav = true;
}

function openCardPokemon(pokemon:any) {
  
  dataSearch.dataModalCardPokemon.searchPokemon(pokemon);
}
</script>
