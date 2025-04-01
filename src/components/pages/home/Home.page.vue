<template>
  <HomeTemplate :dataHome="dataHome" />
</template>
<script setup lang="ts">
import {
  createApp,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  Ref,
  watch,
} from "vue";
import HomeTemplate from "../../templates/home/Home.template.vue";
import { useRouter } from "vue-router";
const router: any = useRouter();
const dataHome: any = reactive({
  isLoading: false,
  redirectToSearch: () => {
    redirectToSearch();
  },
});

function redirectToSearch() {
  router.push('/search');
}
</script>
<style scoped></style>
