<template>
  <q-virtual-scroll :items="store.latest" virtual-scroll-horizontal v-slot="{ item }">
    <q-card :key="item.id" class="q-mx-none q-mb-md" style="width: 192px;" flat>

      <q-card-section class="q-pa-sm">
        <q-img :src="item.productUrl" fit="contain" style="height: 192px;" no-spinner />
      </q-card-section>

      <q-card-section class="text-caption q-px-sm q-py-none title">
        {{ item.title }}
      </q-card-section>

      <q-card-actions align="around">
        <q-btn @click="showBook(item)" flat>
          <q-avatar size="md"><img src="show-book-cuteui-64x64.png" /></q-avatar>
          <q-item-label>show</q-item-label>
        </q-btn>
        <q-btn @click="editBook(item)" flat>
          <q-avatar size="md" square><img src="edit-prop-cuteui-64x64.png" /></q-avatar>
          <q-item-label>edit</q-item-label>
        </q-btn>
      </q-card-actions>

    </q-card>
    <q-separator vertical inset />
  </q-virtual-scroll>
  <KindleDialog ref="kindleDialog" />
</template>

<style>
.title {
  height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

<script setup lang="ts">
import KindleDialog from 'src/components/books/KindleDialog.vue';
import { ref } from 'vue';
import { useBooksStore } from 'src/stores/Books';
import { BookTypeDef } from 'src/stores/BookTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useBooksStore();

// --------------------------------
//  component ref
// --------------------------------
const kindleDialog = ref();

// --------------------------------
//  actions
// --------------------------------
function showBook(book: BookTypeDef) {
  store.show(book);
}

function editBook(book: BookTypeDef) {
  kindleDialog.value.show(book);
}
</script>
