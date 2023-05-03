<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div>{{ book.title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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
