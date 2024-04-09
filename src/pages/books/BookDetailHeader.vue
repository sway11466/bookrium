<template>
  <q-toolbar>
    <div class="q-mr-md no-wrap">
      <q-btn @click="$router.go(-1)" icon="arrow_back" dense flat round />
    </div>
    <q-separator vertical inset color="white" />
    <q-toolbar-title class="q-ml-md">
      {{ book.title }}
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useBooksStore } from 'src/stores/Books.js';
const books = useBooksStore();
const route = useRoute();
const book = ref(books.get(route.params.bookid as string));
</script>
