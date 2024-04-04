<template>
  <q-infinite-scroll @load="next" class="q-pa-md row items-start q-gutter-md">
    <template v-slot:loading>
      <q-spinner color="primary" size="40px" />
    </template>
    <template v-for="(book, index) in books" :key="index">
      <q-card @click="emit('click', book)" flat bordered :class="{selected: book.selected}">
        <q-card-section>
          <q-img :src="book.artwork" fit="contain" no-spinner />
        </q-card-section>
        <q-card-section class="q-pt-none q-mb-sm text-caption title">
          {{ book.title }}
        </q-card-section>
      </q-card>    
    </template>
  </q-infinite-scroll>
</template>

<style scoped>
.q-card {
  width: 14em;
  cursor: pointer;
}
.q-img {
  height: 14em;
}
.title {
  height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.selected {
  opacity: 0.5;
  background-color: gray;
}
</style>

<script setup lang="ts">
import { PropType, Ref, ref } from 'vue';
import { SelectableBook } from './BookSelectorTypes';

const props = defineProps({
  books: {
    type: Array as PropType<SelectableBook[]>,
    required: true,
  },
});

const emit = defineEmits(['click']);

const books: Ref<SelectableBook[]> = ref([] as SelectableBook[]);
function next(index: number, done: (stop?: boolean) => void) {
  const items = props.books.slice((index-1)*10, index*10);
  books.value.push(...items);
  done(items.length === 0);
}
</script>
