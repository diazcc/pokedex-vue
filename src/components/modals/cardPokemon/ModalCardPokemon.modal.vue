<template>
  <article
    :class="
      'card-pokemon-modal-background card-pokemon-modal-background--' +
      (dataModalCardPokemon.isActive ? 'show' : 'hidde')
    "
  >
    <section
      :class="
        'card-pokemon-modal-background__container card-pokemon-modal-background__container--' +
        (dataModalCardPokemon.isActive ? 'show' : 'hidde')
      "
    >
      <img
        src="/src/assets/images/close.svg"
        class="card-pokemon-modal-background__container__close"
        @click="closeModal"
      />

      <a class="card-pokemon-modal-background__container__bg-image">
        <img
          src="/src/assets/images/image.png"
          class="card-pokemon-modal-background__container__bg-image__bg"
          alt=""
        />
        <img
  :src="pokemonImage"
  class="card-pokemon-modal-background__container__bg-image__pokemon"
  alt="Pokemon"
/>
      </a>
      <ul class="card-pokemon-modal-background__container__description">
        <li class="card-pokemon-modal-background__container__description__card">
          <label
            class="card-pokemon-modal-background__container__description__card__title"
            >Name:</label
          >
          <p
            :class="'card-pokemon-modal-background__container__description__card__text '+ (pokemonData?.name ? '': 'loading-component')"
          >
            {{ capitalizeFirstLetter(pokemonData?.name) }}
          </p>
        </li>
        <li class="card-pokemon-modal-background__container__description__card">
          <label
            class="card-pokemon-modal-background__container__description__card__title"
            >Weight: </label
          >
          <p
            :class="'card-pokemon-modal-background__container__description__card__text '+ (pokemonData?.name ? ' ': 'loading-component')"
          >
            {{pokemonData?.id  }}
          </p>
        </li>
      </ul>
      <nav class="card-pokemon-modal-background__container__nav">
        <button class="btn-red" @click="copyToClipboard">Share friends</button>
        <img
          class="icon__star"
          :src="
            pokemonStore.favorites.some(
              (fav:any) => fav.name === dataModalCardPokemon.pokemon.name
            )
              ? '/src/assets/images/star-yellow.svg'
              : '/src/assets/images/star-gray.svg'
          "
          alt="Favorito"
          @click="pokemonStore.toggleFavorite(dataModalCardPokemon.pokemon)"
        />
      </nav>
    </section>
  </article>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, computed } from "vue";
import PokemonApi from "../../../services/PokemonApi"; 
import { usePokemonStore } from "../../../stores/pokemonStore";
const pokemonStore: any = usePokemonStore();
const pokemonData :any = ref<any>(null);

const props = defineProps(['dataModalCardPokemon']);


onUnmounted(() => {
  clearData();
});
const pokemonImage = computed(() => {
  return pokemonData.value?.id
    ? `https://www.shinyhunters.com/images/shiny/${pokemonData.value.id}.gif`
    : "/src/assets/images/random.png";
});
props.dataModalCardPokemon.searchPokemon = (pokemon:any) =>{
  getPokemonData(pokemon);
  props.dataModalCardPokemon.isActive =true;
}
function  validateUrlImage() {
  
  console.log(pokemonData.id ? `https://www.shinyhunters.com/images/shiny/${pokemonData.id}.gif`: "/src/assets/images/random.png");
  console.log(pokemonData);
  return pokemonData.id
    ? `https://www.shinyhunters.com/images/shiny/${pokemonData.id}.gif`
    : "/src/assets/images/random.png";
};
function closeModal() {
  props.dataModalCardPokemon.isActive = false;
  pokemonData.value = null;
}

async function getPokemonData(pokemon:any) {
  if (pokemon) {
    PokemonApi.getPokemon(pokemon)
      .then((response: any) => {
        console.log(response);
        pokemonData.value = response;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}

function clearData() {
  pokemonData.value = {};
}
function capitalizeFirstLetter(word: string): string {
  console.log(word);
  console.log(typeof word);
  
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }else{
    return word;
  }
}
function copyToClipboard() {
  if (!pokemonData.value) return;

  const { name, height, weight, abilities } = pokemonData.value;
  const abilitiesList = abilities.map((a: any) => a.ability.name).join(", ");

  const textToCopy = `Nombre: ${name}, Altura: ${height}, Peso: ${weight}, Habilidades: ${abilitiesList}`;

  navigator.clipboard.writeText(textToCopy)
    .then()
    .catch(err => console.error("Error al copiar:", err));
}
watch(() => props.dataModalCardPokemon.pokemon.name, getPokemonData);
watch(() => pokemonData, validateUrlImage);
</script>

<style src="./ModalCardPokemon.modal.scss"></style>
