<template>
  <q-page>
    <BookCollections ref="child" :books="collection" />
  </q-page>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import BookCollections from 'src/components/books/BookCollections.vue';
import { useBooksStore } from 'src/stores/Books.js';
import { Book, BookSortType } from 'src/stores/BookTypes';
const route = useRoute();
const books = useBooksStore();
const collection: Ref<Book[]> = ref(books.list);
const child = ref();
watch(
  () => route.query,
  () => {
    const sort = (route.query.sort ?? 'none') as BookSortType;
    collection.value = (sort === 'none') ? books.list : books.sort(sort);
    child.value.reset();
  }
)
</script>
