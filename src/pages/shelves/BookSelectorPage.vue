<template>
  <q-page padding>
    <BookSelector :books="selectable" mode="select" @click="click" />
    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-btn @click="addBooks" icon="mdi-book-plus-multiple-outline"
             unelevated rounded no-caps color="primary" class="q-px-xl">
        add {{ count }} books to shelf
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import BookSelector from 'src/components/books/BookSelector.vue';
import { SelectableBook } from 'src/components/books/BookSelectorTypes';
import { useBooksStore } from 'src/stores/Books';
import { useShelvesStore } from 'src/stores/Shelves';
const shelves = useShelvesStore();
const books = useBooksStore();
const id = useRoute().params.shelfid as string;
const shelf = shelves.get(id);
const selectable: SelectableBook[] = books.list.filter(book => !shelf.books.includes(book.id))
                                               .map(book => ({ ...book, selected: false }));
const count: Ref<number> = ref(0);

function click(book: SelectableBook) {
  console.log('[BookSelectorPage] book clicked:', book.title);
  book.selected = !book.selected;
  count.value = selectable.filter(book => book.selected).length;
}

function addBooks() {
  console.log('[BookSelectorPage] add book button clicked');
  // todo insert top to shelf books
  // shelf.books.splice(0, 0, ...selectable.filter(book => book.selected).map(book => book.id));
  // shelves.update(shelf);
}
</script>
