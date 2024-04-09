<template>
  <q-page padding>
    <BookCollections :books="bookCollection" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="menu" direction="up" vertical-actions-align="right" color="primary">
        <q-fab-action @click="addBook" icon="mdi-book-plus-multiple-outline" label="add books" color="primary"/>
        <q-fab-action @click="delBook" icon="mdi-book-remove-multiple-outline" label="delete books" color="red"/>
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import BookCollections from 'src/components/books/BookCollections.vue';
import { useBooksStore } from 'src/stores/Books';
import { useShelvesStore } from 'src/stores/Shelves';
const router = useRouter();
const shelves = useShelvesStore();
const books = useBooksStore();
const id = useRoute().params.shelfid as string;
const shelf = shelves.get(id);
const bookCollection = shelf.books.map((id) => books.get(id));

function addBook() {
  router.push({ path:`/shelves/${id}/addBook` });
}

function delBook() {
  console.log('[ShelfViewPage] delete book button clicked');
  router.push({ path:`/shelves/${id}/delBook` });
}
</script>
