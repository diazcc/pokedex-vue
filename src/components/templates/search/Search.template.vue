<template>
  <main class="search">
    <nav class="search__navbar limit-horizontal">
      <input
        type="text"
        @input="dataSearch.inputSearch.onChange"
        v-model="dataSearch.inputSearch.value"
        placeholder="hola"
        class="search__navbar__search"
      />
    </nav>
    <ul class="search__results limit-horizontal">
      <li class="search__results__option" v-if="dataSearch.arrayResultList.length <= 0" >
        <p class="search__results__option__name">No data</p>
      </li>
      <li class="search__results__option" v-else v-for="(pokemon,index) in dataSearch.arrayResultList">
        <p class="search__results__option__name">{{ pokemon.name ??  'UNDEFINED' }}</p>
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
const props = defineProps(["dataSearch"]);
function write(data: any) {
  console.log("write", data);
}
</script>
<style scoped src="./Search.template.scss"></style>
