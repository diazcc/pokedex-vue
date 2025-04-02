<template>
  <main class="search">
    <nav class="search__navbar limit-horizontal">
      <input
        type="text"
        @input="props.dataSearch.inputSearch.onChange"
        v-model="props.dataSearch.inputSearch.value"
        placeholder="Buscar Pokémon..."
        class="search__navbar__search"
      />
    </nav>
    <ul class="search__results limit-horizontal">
      <li class="search__results__option" v-if="visibleResults.length == 0">
        <p class="search__results__option__name">No data</p>
      </li>
      <li
        class="search__results__option"
        v-else
        v-for="(pokemon, index) in visibleResults"
        :key="index"
        ref="pokemonItems"
      >
        <p class="search__results__option__name">{{ pokemon.name ?? 'UNDEFINED' }}</p>
        <img class="search__results__option__star" src="/src/assets/images/star-gray.svg" alt="" />
      </li>
    </ul>
    <footer class="search__footer">
      <nav class="search__footer__container limit-horizontal">
        <button class="search__footer__container__btn btn-red" @click="dataSearch.setFav">
          Button
        </button>
        <button class="search__footer__container__btn btn-gray" @click="dataSearch.setAll">
          Button
        </button>
      </nav>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";


//Template variables
const props = defineProps(["dataSearch"]);
const visibleResults = ref<any[]>([]);
const itemsPerPage = 7;
const currentIndex = ref(0);
const pokemonItems = ref<HTMLElement[]>([]);

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

function observeLastItem() {
  nextTick(() => {
    if (pokemonItems.value.length >= 5) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { rootMargin: "50px", threshold: 0.5 }
      );
      const antepenultimoIndex = pokemonItems.value.length - 3;
      if (pokemonItems.value[antepenultimoIndex]) {
        observer.observe(pokemonItems.value[antepenultimoIndex]);
      }
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
});
</script>

<style scoped src="./Search.template.scss"></style>
