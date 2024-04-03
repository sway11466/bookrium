<template>
  <q-page padding>
    <BookCollections :books="bookCollection"/>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="menu" direction="up" color="primary">
        <q-fab-action @click="addBook" color="primary" icon="add" />
        <q-fab-action @click="delBook" color="primary" icon="delete" />
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
  router.push({ path:`/shelves/${id}/delBook` });
}
</script>
