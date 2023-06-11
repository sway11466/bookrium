<template>
  <q-card>
    <q-card-section class="text-center">
      <img :src="book.artwork" />
    </q-card-section>
    <q-card-section class="row">
      <div class="text-h6">{{ book.title }}</div>
      <template v-for="author in book.author" :key="author">
        <div>{{ author.replace(':','') }}</div>
      </template>
    </q-card-section>
    <q-card-section class="row wrap">
      <template v-for="tag in book.labels" :key="tag">
        <q-chip removable @remove="remove(tag)" color="primary" text-color="white">
          {{ tag }}
        </q-chip>
      </template>
      <div class="col" style="max-width: 7em;">
      <q-input v-model="tag" @keydown.enter="add" rounded standout dense />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { KindleBook } from 'src/stores/BookTypes';
import { useBooksStore } from 'src/stores/Books.js';

// --------------------------------
//  prop
// --------------------------------
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

// --------------------------------
//  store init
// --------------------------------
const store = useBooksStore();

// --------------------------------
//  local var
// --------------------------------
const book: Ref<KindleBook> = ref(store.get(props.id) as KindleBook);
const tag: Ref<string> = ref('');

// --------------------------------
//  actions
// --------------------------------
function add() {
  book.value.labels.push(tag.value);
  tag.value = '';
  //TODO: save to file from store
  //TODO: modify label
}

function remove(param: string) {
  const index = book.value.labels.indexOf(param);
  book.value.labels.splice(index, 1);
  //TODO: save to file from store
  //TODO: modify label
}
</script>
