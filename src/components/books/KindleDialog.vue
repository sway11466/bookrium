<template>
  <q-dialog v-model="visible">
    <q-card style="min-width: 350px">
      <q-card-section>
        <q-img :src="book.productUrl" fit="fill" />
      </q-card-section>
      <q-card-section class="row">
        <div class="text-h6">{{ book.title }}</div>
        <template v-for="author in book.authors" :key="author">
          <div>{{ author }}</div>
        </template>
      </q-card-section>
      <q-card-section>
        <template v-for="tag in book.tags" :key="tag">
          <q-chip removable @remove="debug" color="primary" text-color="white">
            {{ tag }}
          </q-chip>
        </template>
        <q-input v-model="tag" rounded standout dense />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { KindleBook } from 'src/stores/BookTypes';
import { useBooksStore } from 'src/stores/Books.js';

// --------------------------------
//  store init
// --------------------------------
const store = useBooksStore();

// --------------------------------
//  local var
// --------------------------------
const book: Ref<KindleBook> = ref(store.blankKindle);
const tag: Ref<string> = ref('');

// --------------------------------
//  actions
// --------------------------------
function debug() {
  console.log('callde!');
}

// --------------------------------
//  self visibility
// --------------------------------
let visible = ref(false);

function show(kindle: KindleBook) {
  book.value = kindle;
  visible.value = true;
}

function hide() {
  visible.value = false;
}

// --------------------------------
//  call from parent components
// --------------------------------
defineExpose({
  show,
  hide,
});
</script>
