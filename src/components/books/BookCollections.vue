<template>
  <q-infinite-scroll ref="list" @load="next" class="q-pa-md row items-start q-gutter-md">
    <template v-slot:loading>
      <q-spinner color="primary" size="40px" />
    </template>
    <template v-for="(book, index) in books" :key="index">
      <BookCard :book="book" />
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import { PropType, Ref, ref } from 'vue';
import BookCard from 'src/components/books/BookCard.vue';
import { Book } from 'src/stores/BookTypes';

const props = defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true,
  },
});

defineExpose({ reset });

const list = ref();
const books: Ref<Book[]> = ref([] as Book[]);
function next(index: number, done: (stop?: boolean) => void) {
  const items = props.books.slice((index-1)*10, index*10);
  books.value.push(...items);
  done(items.length === 0);
}
function reset () {
  books.value = [];
  list.value.reset();
  list.value.trigger();
}
</script>
