<template>
  <SearchTemplate :dataSearch="dataSearch" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import SearchTemplate from "../../templates/search/Search.template.vue";
import PokemonApi from "../../../services/PokemonApi";
let allPokemons: any = ref([]);
const pokemonApi: any = PokemonApi;
const dataSearch: any = reactive({
  inputSearch: {
    value: "",
    onChange: (event: any) => {
      console.log("onChange", event);
      getPokemonsByValue();
    },
  },
  listFav: false,
  listAll: false,
  arrayResultList: [],
  setAll: () => {
    setAll();
  },
  setFav: () => {
    setFav();
  },
});

onMounted(() => {
  console.log("Search page mounted");
  loadAllPokemons();
});
function loadAllPokemons() {
  console.log("ingresa");
  pokemonApi
    .getAllPokemons()
    .then((response: any) => {
      allPokemons.value = response.results;
      dataSearch.arrayResultList = response.results;
      console.log("consulta", allPokemons.value);
    })
    .catch((error: any) => {
      console.error("Error al cargar la lista de Pokémon:", error);
    });
}

function getPokemonsByValue() {
  const value: any = dataSearch.inputSearch.value;
  if (!value) {
    dataSearch.arrayResultList = [];
    return;
  }
  const filteredPokemons = allPokemons.value.filter((pokemon: any) =>
    pokemon.name.includes(value.toLowerCase())
  );
  console.log("Resultados filtrados:", filteredPokemons);
  dataSearch.arrayResultList = filteredPokemons;
}

function fetchPokemonByIdOrName(value: string) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error al buscar el Pokémon:", error);
    });
}

function setAll() {}
function setFav() {}
</script>
