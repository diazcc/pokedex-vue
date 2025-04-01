<template>
  <main class="home">
    <section class="home__icon">
      <a class="home__icon__bg">
      </a>
      <img src="/src/assets/images/pikachu.svg" alt="" class="home__icon__img">
    </section>
    <h1 class="home__title">Welcome to Pokedex</h1>
    <p class="home__description">
      The digital encyclopedia created by Andres Diaz is an invaluable tool to Trainers in the Pokémon world.
    </p>
    <button class="home__button btn-red" @click="dataHome.redirectToSearch">Get started</button>
  </main>
</template>
<script setup lang="ts">
const props :any = defineProps(['dataHome']);

</script>
<style scoped src="./Home.template.scss"></style>
