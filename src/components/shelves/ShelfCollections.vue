<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-for="(shelf, index) in shelves.list" :key="index">
      <ShelfCard :shelf="shelf" />
    </template>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import ShelfCard from 'src/components/shelves/ShelfCard.vue';
import { useShelvesStore } from 'src/stores/Shelves';
const shelves = useShelvesStore();
</script>
