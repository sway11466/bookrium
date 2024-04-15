<template>
  <q-infinite-scroll @load="next" class="q-pa-md row items-start q-gutter-md">
    <template v-slot:loading>
      <q-spinner color="primary" size="40px" />
    </template>
    <template v-for="(book, index) in books" :key="index">
      <q-card draggable="true"
              @dragstart="(event: DragEvent)=>start(event, book)"
              @dragend="(event: DragEvent)=>end(event, book)"
              @dragover="over"
              @drop="(event: DragEvent)=>drop(event, book)"
              flat bordered :class="{dragging: book.dragging}">
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

<style scoped lang="scss">
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
.dragging {
  border: 2px dotted black;
  visibility: hidden;
  transition: visibility linear 0.1s;
}
</style>

<script setup lang="ts">
import { PropType, Ref, ref } from 'vue';
import { SortableBook } from './BookReorderTypes';

const props = defineProps({
  books: {
    type: Array as PropType<SortableBook[]>,
    required: true,
  },
});

const emit = defineEmits(['shift']);

const books: Ref<SortableBook[]> = ref([] as SortableBook[]);
function next(index: number, done: (stop?: boolean) => void) {
  const items = props.books.slice((index-1)*10, index*10);
  books.value.push(...items);
  done(items.length === 0);
}

function start(event: DragEvent, book: SortableBook) {
  console.log('start');
  book.dragging = true;
}

function end(event: DragEvent, book: SortableBook) {
  console.log('end');
  book.dragging = false;
}

function over(event: DragEvent) {
  event.preventDefault();
}

function drop(event: DragEvent, to: SortableBook) {
  console.log('drop');
  const from = books.value.find(book => book.dragging);
  if (from === undefined) { return; }
  const fromIndex = books.value.findIndex(book => book.id === from.id);
  const toIndex = books.value.findIndex(book => book.id === to.id);
  const fromItem = books.value.splice(fromIndex, 1)[0];
  books.value.splice(toIndex, 0, fromItem);
  from.dragging = false;
  emit('shift', from, to); // todo: Reconsider whether a double update is needed
}
</script>
./BookReorderTypes