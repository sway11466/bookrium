<template>
  <q-infinite-scroll @load="next" class="q-pa-md row items-start q-gutter-md">
    <template v-slot:loading>
      <q-spinner color="primary" size="40px" />
    </template>
    <template v-for="(book, index) in books" :key="index">
      <BookCard :book="book" @show="show" @edit="edit" />
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { PropType, Ref, ref } from 'vue';
import { useRouter } from 'vue-router'
import BookCard from 'src/components/books/BookCard.vue';
import { useBooksStore } from 'src/stores/Books.js';
import { Book, BookTypeDef } from 'src/stores/BookTypes';

const props = defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true,
  },
});

const store = useBooksStore();
const router = useRouter();

const books: Ref<Book[]> = ref([] as Book[]);
function next(index: number, done: (stop?: boolean) => void) {
  const items = props.books.slice((index-1)*10, index*10);
  books.value.push(...items);
  done(items.length === 0);
}

function show(book: BookTypeDef) {
  store.show(book);
}

function edit(book: BookTypeDef) {
  router.push({ path:`/books/${book.id}` });
}
</script>
src/components/books/BookCollectionsOption