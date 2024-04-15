<template>
  <q-page padding>
    <BookReorder :books="createSortableBook()" @shift="shift" />
    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-btn @click="complete" unelevated rounded no-caps color="primary" class="q-px-xl">
        <q-icon name="mdi-check-outline" />
        <div class="q-pl-md">complete sort</div>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template> 

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import BookReorder from 'src/components/books/BookReorder.vue';
import { SortableBook } from 'src/components/books/BookReorderTypes';
import { useBooksStore } from 'src/stores/Books';
import { useShelvesStore } from 'src/stores/Shelves';
const route = useRoute();
const router = useRouter();
const shelves = useShelvesStore();
const books = useBooksStore();

const id = route.params.shelfid as string;
const shelf = shelves.get(id);

function createSortableBook(): SortableBook[] {
  return shelf.books.map(id => books.get(id)).map(book => ({ ...book, dragging: false }));
}

function shift(from: SortableBook, to: SortableBook) {
  const fromInde = shelf.books.findIndex(bookid => bookid === from.id);
  const toIndex = shelf.books.findIndex(bookid => bookid === to.id);
  const fromItem = shelf.books.splice(fromInde, 1)[0];
  shelf.books.splice(toIndex, 0, fromItem);
}

function complete() {
  shelves.update(shelf);
  router.go(-1);
}
</script>
src/components/books/BookReorderTypes