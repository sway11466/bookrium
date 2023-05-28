<template>
  <q-page>
    <q-list>
      <q-infinite-scroll @load="next" :offset="250">
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" size="40px" />
          </div>
        </template>
        <template v-for="(item, index) in books" :key="index">
          <template v-if="item.type == 'kindle'">
            <KindleListItem :param="item" @showKindleDialog="showKindleDialog" />
          </template>
          <template v-if="item.type == 'pdf'">
            <PDFListItem :param="item" @showBook="showBook" @showKindleDialog="showKindleDialog" />
          </template>
          <q-separator />
        </template>
      </q-infinite-scroll>
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
import { BookTypeDef, KindleBook } from 'src/stores/BookTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useBooksStore();

// --------------------------------
//  component ref
// --------------------------------
const books = ref([] as BookTypeDef[]);
const kindleDialog = ref();

// --------------------------------
//  actions
// --------------------------------
function next(index: number, done: (stop?: boolean) => void) {
  const items = store.list((index-1)*10, index*10);
  books.value.push(...items);
  done(items.length === 0);
}

function showBook(book: BookTypeDef) {
  store.show(book);
}

function showKindleDialog(book: KindleBook) {
  kindleDialog.value.show(book);
}
</script>
