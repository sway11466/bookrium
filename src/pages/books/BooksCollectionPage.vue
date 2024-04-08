<template>
  <q-page>
    <BookCollections :books="books.list" />
  </q-page>
</template>

<script setup lang="ts">
import BookCollections from 'src/components/books/BookCollections.vue';
import KindleListItem from 'src/components/books/KindleListItem.vue';
// import KindleDialog from 'src/components/books/KindleDialog.vue';
import PDFListItem from 'src/components/books/PDFListItem.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useBooksStore } from 'src/stores/Books.js';
import { Book } from 'src/stores/BookTypes';

// --------------------------------
//  store init
// --------------------------------
const books = useBooksStore();

// --------------------------------
//  component ref
// --------------------------------
// const kindleDialog = ref();

// --------------------------------
//  local var
// --------------------------------
// const router = useRouter();
// const books = ref([] as Book[]);

// --------------------------------
//  actions
// --------------------------------
// function next(index: number, done: (stop?: boolean) => void) {
//   const items = store.slice((index-1)*10, index*10);
//   books.value.push(...items);
//   done(items.length === 0);
// }

// function show(book: Book) {
//   store.show(book);
// }

// function edit(book: Book) {
//   router.push({ path:`/books/${book.id}` });
// }
</script>
