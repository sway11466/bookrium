<template>
  <q-infinite-scroll @load="next" class="q-pa-md row items-start q-gutter-md">
    <template v-slot:loading>
      <q-spinner color="primary" size="40px" />
    </template>
    <template v-for="(book, index) in part" :key="index">
      <q-card draggable="true"
              @dragstart="(event: DragEvent)=>start(event, book)"
              @dragend="(event: DragEvent)=>end(event, book)"
              @dragover="over"
              @drop="(event: DragEvent)=>drop(event, book)"
              flat bordered :class="{dragging: dragging ? dragging.id === book.id : false}">
        <q-card-section>
          <q-img :src="book.artwork" fit="contain" no-spinner />
        </q-card-section>
        <q-card-section class="q-pt-none q-mb-sm text-caption title">
          {{ book.title }}
        </q-card-section>
      </q-card>    
    </template>
  </q-infinite-scroll>
  <q-page-sticky position="bottom" :offset="[0, 18]">
    <q-btn @click="complete" unelevated rounded no-caps color="primary" class="q-px-xl">
      <q-icon name="mdi-check-outline" />
      <div class="q-pl-md">complete sort</div>
    </q-btn>
  </q-page-sticky>
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
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBooksStore } from 'src/stores/Books';
import { useShelvesStore } from 'src/stores/Shelves';
import { Book } from 'src/stores/BookTypes';

const props = defineProps({
  shelfid: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const shelves = useShelvesStore();
const books = useBooksStore();

const shelf = shelves.clone(shelves.get(props.shelfid));
const all = shelf.books.map(id => books.get(id));

const part: Ref<Book[]> = ref([] as Book[]);
function next(index: number, done: (stop?: boolean) => void) {
  const items = all.slice((index-1)*10, index*10);
  part.value.push(...items);
  done(items.length === 0);
}

const dragging: Ref<Book | null> = ref(null);

function start(event: DragEvent, book: Book) {
  console.log('start');
  dragging.value = book;
}

function end(event: DragEvent, book: Book) {
  console.log('end');
  dragging.value = null;
}

function over(event: DragEvent) {
  event.preventDefault();
}

function drop(event: DragEvent, to: Book) {
  console.log('drop');
  if (!dragging.value) { return; }
  swapBook(part.value, dragging.value, to);
  swapBookId(shelf.books, dragging.value.id, to.id);
  dragging.value = null;
}

function swapBook(arr: Book[], from: Book, to: Book) {
  const fromIndex = arr.findIndex(book => book.id === from.id);
  const toIndex = arr.findIndex(book => book.id === to.id);
  const fromItem = arr.splice(fromIndex, 1)[0];
  arr.splice(toIndex, 0, fromItem);
}

function swapBookId(arr: string[], from: string, to: string) {
  const fromIndex = arr.findIndex(id => id === from);
  const toIndex = arr.findIndex(id => id === to);
  const fromItem = arr.splice(fromIndex, 1)[0];
  arr.splice(toIndex, 0, fromItem);
}

function complete() {
  shelves.update(shelf);
  router.go(-1);
}
</script>
