<template>
  <q-page padding>
    <BookSelector :books="selectable" mode="select" @click="click" />
    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-btn @click="addBooks" unelevated rounded no-caps color="primary" class="q-px-xl">
        <q-icon :name=" mode === 'add' ? 'mdi-book-plus-multiple-outline' : 'mdi-book-remove-multiple-outline'" />
        <div class="q-pl-md">{{ (mode === 'add' ? 'add' : 'delete') }} {{ count }} books to shelf</div>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BookSelector from 'src/components/books/BookSelector.vue';
import { SelectableBook } from 'src/components/books/BookSelectorTypes';
import { useBooksStore } from 'src/stores/Books';
import { useShelvesStore } from 'src/stores/Shelves';
const route = useRoute();
const router = useRouter();
const shelves = useShelvesStore();
const books = useBooksStore();
const mode = route.path.includes('addBook') ? 'add' : 'del';
const id = route.params.shelfid as string;
const shelf = shelves.get(id);
const selectable: SelectableBook[] = mode === 'add' ?
  books.list.filter(book => !shelf.books.includes(book.id)).map(book => ({ ...book, selected: false })) :
  shelf.books.map(id => books.get(id)).map(book => ({ ...book, selected: false }));
const count: Ref<number> = ref(0);

function click(book: SelectableBook) {
  console.log('[BookSelectorPage] book clicked:', book.title);
  book.selected = !book.selected;
  count.value = selectable.filter(book => book.selected).length;
}

function addBooks() {
  console.log('[BookSelectorPage] add book button clicked');
  switch (mode) {
    case 'add':
      shelf.books.splice(0, 0, ...selectable.filter(book => book.selected).map(book => book.id));
      break;
    case 'del':
      selectable.filter(book => book.selected).forEach(book => {
        const index = shelf.books.indexOf(book.id);
        if (index >= 0) { shelf.books.splice(index, 1); }
      });
      break;
  }
  shelves.update(shelf);
  router.go(-1)
}
</script>
