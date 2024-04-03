<template>
  <q-virtual-scroll :items="books" virtual-scroll-horizontal v-slot="{ item }">
    <q-card :key="item.id" class="q-mx-none q-mb-md" style="width: 192px;" flat>

      <q-card-section class="q-pa-sm">
        <q-img :src="item.artwork" fit="contain" style="height: 192px;" no-spinner />
      </q-card-section>

      <q-card-section class="text-caption q-px-sm q-py-none title">
        {{ item.title }}
      </q-card-section>

      <q-card-actions align="around">
        <q-btn @click="show(item)" no-caps flat>
          <q-avatar size="md"><img src="show-book-cuteui-64x64.png" /></q-avatar>
          <q-item-label class="q-ml-xs">show</q-item-label>
        </q-btn>
        <q-btn @click="edit(item)" no-caps flat>
          <q-avatar size="md" square><img src="edit-prop-cuteui-64x64.png" /></q-avatar>
          <q-item-label class="q-ml-xs">edit</q-item-label>
        </q-btn>
      </q-card-actions>

    </q-card>
    <q-separator vertical inset />
  </q-virtual-scroll>
</template>

<style scoped>
.title {
  height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useBooksStore } from 'src/stores/Books';
import { BookTypeDef } from 'src/stores/BookTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useBooksStore();

// --------------------------------
//  local var
// --------------------------------
const router = useRouter();
const books = ref(store.latest);

// --------------------------------
//  actions
// --------------------------------
function show(book: BookTypeDef) {
  store.show(book);
}

function edit(book: BookTypeDef) {
  router.push({ path:`/books/${book.id}` });
}
</script>
