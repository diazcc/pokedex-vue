import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const usePokemonStore = defineStore("pokemonStore", () => {
  const allPokemons = ref<any[]>([]);
  const favorites = ref<any[]>(JSON.parse(localStorage.getItem("favorites") || "[]"));
  const isShowingFavorites = ref(false);

  // Cargar todos los Pokémon
  function setAllPokemons(pokemons: any[]) {
    allPokemons.value = pokemons;
  }

  // Alternar entre favoritos y todos
  function setAll() {
    isShowingFavorites.value = false;
  }
  function setFav() {
    isShowingFavorites.value = true;
  }

  // Agregar/Quitar favoritos
  function toggleFavorite(pokemon: any) {
    
    const index = favorites.value.findIndex((fav) => fav.name === pokemon.name);
    if (index === -1) {
      favorites.value.push(pokemon);
    } else {
      favorites.value.splice(index, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites.value)); // Persistir favoritos
  }

  // Lista filtrada según el estado
  const filteredList = computed(() => {
    return isShowingFavorites.value ? favorites.value : allPokemons.value;
  });

  return {
    allPokemons,
    favorites,
    filteredList,
    isShowingFavorites,
    setAllPokemons,
    setAll,
    setFav,
    toggleFavorite,
  };
});
