<template>
  <q-page>
    <q-list>
      <template v-for="book in list" :key="book.id">
        <template v-if="book.type == 'kindle'">
          <KindleListItem :param="book" @showKindleDialog="showKindleDialog" />
        </template>
        <template v-if="book.type == 'pdf'">
          <PDFListItem :param="book" @showKindleDialog="showKindleDialog" />
        </template>
        <q-separator />
      </template>
    </q-list>
    <KindleDialog ref="kindleDialog" />
  </q-page>
</template>

<script setup lang="ts">
import KindleListItem from 'src/components/books/KindleListItem.vue';
import KindleDialog from 'src/components/books/KindleDialog.vue';
import PDFListItem from 'src/components/books/PDFListItem.vue';
import { ref } from 'vue';
import { useBooksStore } from 'src/stores/Books.js';
import { KindleBook } from 'src/stores/BookTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useBooksStore();

// --------------------------------
//  component ref
// --------------------------------
const list = ref(store.list);
const kindleDialog = ref();

// --------------------------------
//  daialog visibility
// --------------------------------
function showKindleDialog(book: KindleBook) {
  kindleDialog.value.show(book);
}
</script>
