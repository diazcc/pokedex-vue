<template>
  <article
    :class="
      'card-pokemon-modal-background card-pokemon-modal-background--' +
      (dataModalCardPokemon.isActive ? 'show' : '')
    "
  >
    <section
      :class="
        'card-pokemon-modal-background__container card-pokemon-modal-background__container--' +
        (dataModalCardPokemon.isActive ? 'show' : '')
      "
    >
      <button class="card-pokemon-modal-background__container__close">x</button>
      <a class="card-pokemon-modal-background__container__bg-image">
        <img src="/src/assets/images/image.png" class="card-pokemon-modal-background__container__bg-image__bg" alt="" />
        <img src="/src/assets/images/pikachu.svg" class="card-pokemon-modal-background__container__bg-image__pokemon" alt="" />
      </a>
      <ul class="card-pokemon-modal-background__container__description">
        <li class="card-pokemon-modal-background__container__description__card">
          <label class="card-pokemon-modal-background__container__description__card__title">Nombre:</label>
          <p class="card-pokemon-modal-background__container__description__card__text">Squirtle</p>
        </li>
      </ul>
      <nav class="card-pokemon-modal-background__container__nav">
        <button class="btn-red">Share friends</button>
        <img
            class="icon__star"
            :src="
              pokemonStore.favorites.some((fav) => fav.name === dataModalCardPokemon.pokemon.name)
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
import { usePokemonStore } from '../../../stores/pokemonStore';

const pokemonStore = usePokemonStore();

defineProps(["dataModalCardPokemon"]);
</script>

<style src="./ModalCardPokemon.modal.scss"></style>
