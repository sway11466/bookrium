<template>
  <q-infinite-scroll ref="list" @load="next" class="q-pa-md row items-start q-gutter-md">
    <template v-slot:loading>
      <q-spinner color="primary" size="40px" />
    </template>
    <template v-for="(book, index) in part" :key="index">
      <BookCard :book="book" />
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useBooksStore } from 'src/stores/Books.js';
import { useShelvesStore } from 'src/stores/Shelves';
import BookCard from 'src/components/books/BookCard.vue';
import { Book, BookSortType } from 'src/stores/BookTypes';

const props = defineProps({
  shelfid: {
    type: String,
    required: true,
  }
});

const route = useRoute();
const store = {
  books: useBooksStore(),
  shelves: useShelvesStore(),
}
const shelf = store.shelves.get(props.shelfid);
const books = shelf.books.map((id) => store.books.get(id));

const list = ref();
const all: Ref<Book[]> = ref(books);
const part: Ref<Book[]> = ref([] as Book[]);
function next(index: number, done: (stop?: boolean) => void) {
  const items = all.value.slice((index-1)*10, index*10);
  part.value.push(...items);
  done(items.length === 0);
}

watch(
  () => route.query,
  () => {
    // todo: sort shelf books
    // const sort = (route.query.sort ?? 'none') as BookSortType;
    // all.value = (sort === 'none') ? all : books.sort(sort);
    // part.value = [];
    // list.value.reset();
    // list.value.trigger();
  }
)
</script>
