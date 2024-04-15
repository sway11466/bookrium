<template>
  <q-page>
    <BookCollections :books="books.list" />
  </q-page>
</template>

<script setup lang="ts">
import BookCollections from 'src/components/books/BookCollections.vue';
import { useBooksStore } from 'src/stores/Books.js';
const books = useBooksStore();
</script>
