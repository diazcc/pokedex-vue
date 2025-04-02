<template>
  <SearchTemplate :dataSearch="dataSearch" />
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import axios from "axios";
import SearchTemplate from "../../templates/search/Search.template.vue";
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

// Lista de todos los Pokémon cargada al inicio
let allPokemons: { name: string; url: string }[] = [];

function loadAllPokemons() {
  console.log("ingresa");

  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=10000")
    .then((response) => {
      dataSearch.arrayResultList = response.data.results;
      console.log("consulta", response.data.results);
    })
    .catch((error) => {
      console.error("Error al cargar la lista de Pokémon:", error);
    });
}

function getPokemonsByValue() {
  const value: any = dataSearch.inputSearch.value;
  if (!value) {
    dataSearch.arrayResultList = [];
    return;
  }

  // Buscar por ID exacto o nombre exacto
  if (!isNaN(Number(value))) {
    fetchPokemonByIdOrName(value);
  } else {
    // Filtrar nombres similares en la lista local
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.includes(value.toLowerCase())
    );

    dataSearch.arrayResultList = filteredPokemons.slice(0, 10); // Limita a 10 resultados
    console.log("Resultados filtrados:", dataSearch.arrayResultList);
  }
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

onMounted(() => {
  console.log("Search page mounted");
  loadAllPokemons();
});
</script>
