import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const usePokemonStore = defineStore("pokemon", () => {
  const favorites = ref<string[]>(JSON.parse(localStorage.getItem("favorites") || "[]"));

  function toggleFavorite(pokemonName: string) {
    if (favorites.value.includes(pokemonName)) {
      favorites.value = favorites.value.filter((name) => name !== pokemonName);
    } else {
      favorites.value.push(pokemonName);
    }
  }
  watch(favorites, (newFavs) => {
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  });

  return { favorites, toggleFavorite };
});
