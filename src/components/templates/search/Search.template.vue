<template>
  <main class="search">
    <nav class="search__navbar limit-horizontal">
      <a class="search__navbar__search">
        <img src="/src/assets/images/lupa.svg" alt="" />
        <input
          type="text"
          @input="props.dataSearch.inputSearch.onChange"
          v-model="props.dataSearch.inputSearch.value"
          placeholder="Search"
        />
      </a>
    </nav>
    <ul class="search__results limit-horizontal">
      <li class="search__results__option" v-if="visibleResults.length === 0">
        <p class="search__results__option__name">No data</p>
      </li>
      <li
        class="search__results__option"
        v-else
        v-for="(pokemon, index) in visibleResults"
        :key="pokemon.name"
        :ref="(el:any) => setPokemonItem(el, index)"
      >
        <p
          class="search__results__option__name"
          @click="dataSearch.openPokemon(pokemon.name)"
        >
          {{ capitalizeFirstLetter(pokemon.name) ?? "UNDEFINED" }}
        </p>
        <img
          class="search__results__option__fav icon__star"
          :src="
            pokemonStore.favorites.some((fav) => fav.name === pokemon.name)
              ? '/src/assets/images/star-yellow.svg'
              : '/src/assets/images/star-gray.svg'
          "
          alt="Favorito"
          @click="pokemonStore.toggleFavorite(pokemon)"
        />
      </li>
    </ul>
    <footer class="search__footer">
      <nav class="search__footer__container limit-horizontal">
        <button
          class="search__footer__container__btn btn-red"
          @click="dataSearch.setAll"
        >
          <img src="/src/assets/images/list-white.svg" alt="" />
          <p>All</p>
        </button>
        <button
          class="search__footer__container__btn btn-gray"
          @click="dataSearch.setFav"
        >
          <img src="/src/assets/images/star-white.svg" alt="" />
          <p>Favorites</p>
        </button>
      </nav>
    </footer>
    <ModalCardPokemonModal
      :data-modal-card-pokemon="dataSearch.dataModalCardPokemon"
    />
    <section :class="'loader-view loader-view--' + (isLoading?'show':'hidde')">
      <img class="loader-view__icon" src="/src/assets/images/pokemon.svg" alt="">
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import { usePokemonStore } from "../../../stores/pokemonStore";
import ModalCardPokemonModal from "../../modals/cardPokemon/ModalCardPokemon.modal.vue";
const pokemonStore = usePokemonStore();
const props = defineProps(["dataSearch"]);
let isLoading :any = ref(true);
const visibleResults = ref<any[]>([]);
const itemsPerPage = 14; // Ahora se cargan 14 elementos en lugar de 7
const currentIndex = ref(0);
const pokemonItems = ref<HTMLElement[]>([]);
let observer: IntersectionObserver | null = null;
function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function loadMore() {
  if (currentIndex.value < props.dataSearch.arrayResultList.length) {
    const nextItems = props.dataSearch.arrayResultList.slice(
      currentIndex.value,
      currentIndex.value + itemsPerPage
    );
    visibleResults.value.push(...nextItems);
    currentIndex.value += itemsPerPage;
    observeLastItem();
  }
}

function setPokemonItem(el: HTMLElement | null, index: number) {
  if (el) {
    pokemonItems.value[index] = el;
  }
}

function observeLastItem() {
  nextTick(() => {
    if (pokemonItems.value.length < 3) return;

    if (observer) observer.disconnect(); 

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            loadMore();
          }
        });
      },
      { rootMargin: "50px", threshold: 0.5 }
    );

    const antepenultimoIndex = pokemonItems.value.length - 3;
    if (pokemonItems.value[antepenultimoIndex]) {
      observer.observe(pokemonItems.value[antepenultimoIndex]);
    }
  });
}

watch(
  () => props.dataSearch.arrayResultList,
  () => {
    visibleResults.value = [];
    currentIndex.value = 0;
    loadMore();
  }
);

onMounted(() => {
  loadMore();
  validationLoaderView();
});

function validationLoaderView(){
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}
</script>

<style scoped src="./Search.template.scss"></style>
