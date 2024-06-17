<template>
  <q-page padding>
    <BookCollections :shelfid="id" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="menu" direction="up" vertical-actions-align="right" color="primary">
        <q-fab-action @click="addBook" icon="mdi-book-plus-multiple-outline" label="add books" color="primary"/>
        <q-fab-action @click="sortBook" icon="mdi-book-multiple-outline" label="sort books" color="primary"/>
        <q-fab-action @click="delBook" icon="mdi-book-remove-multiple-outline" label="delete books" color="red"/>
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import BookCollections from 'src/components/shelves/BookCollections.vue';

const router = useRouter();
const id = useRoute().params.shelfid as string;

function addBook() {
  const path = `/shelves/${id}/addBook`;
  console.info(`[ShelfViewPage] add book button clicked. transition to ${path}`);
  router.push({ path });
}

function sortBook() {
  const path = `/shelves/${id}/sortBook`;
  console.info(`[ShelfViewPage] sort book button clicked. transition to ${path}`);
  router.push({ path });
}

function delBook() {
  const path = `/shelves/${id}/delBook`;
  console.info(`[ShelfViewPage] delete book button clicked. transition to ${path}`);
  router.push({ path });
}
</script>
