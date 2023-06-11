<template>
  <q-page>
    <template v-if="book.type == 'kindle'">
      <KindleEdit :id="book.id" />
    </template>
    <template v-if="book.type == 'pdf'">
      <PDFEdit :id="book.id" />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import KindleEdit from 'src/components/books/KindleEdit.vue';
import PDFEdit from 'src/components/books/PDFEdit.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useBooksStore } from 'src/stores/Books.js';

// --------------------------------
//  store init
// --------------------------------
const store = useBooksStore();

// --------------------------------
//  local var
// --------------------------------
const route = useRoute();
const book = ref(store.get(route.params.bookid as string));
</script>
