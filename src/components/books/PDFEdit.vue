<template>
  <q-card flat>

    <q-card-section class="text-center">
      <vue-pdfjs :src="book.extends.path" />
      <img :url="book.extends.artworkPath" height="160px" />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-caption grey">title</div>
      <q-input v-model="book.title" class="q-pl-sm" dense />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-caption grey">author</div>
      <q-input v-model="book.author" class="q-pl-sm" dense />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-caption grey">tags</div>
      <div class="row wrap">
        <template v-for="tag in book.labels" :key="tag">
          <q-chip removable @remove="remove(tag)" color="primary" text-color="white">
            {{ tag }}
          </q-chip>
        </template>
        <div class="col" style="max-width: 7em;">
        <q-input v-model="tag" @keydown.enter="add" rounded standout dense />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-list bordered>
        <q-expansion-item label="PDF Embeded Properties (not edit)">
          <q-item class="q-py-none">
            <q-item-section>
              <q-item-label caption>title</q-item-label>
              <q-item-label>{{ book.extends.title }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat no-caps>Copy to Title</q-btn>
            </q-item-section>
          </q-item> 
          <q-item class="q-py-none">
            <q-item-section>
              <q-item-label caption>author</q-item-label>
              <q-item-label>{{ book.extends.author }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat no-caps>Copy to Author</q-btn>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-card-section>

    <q-card-actions vertical>
      <!-- <q-btn label="Save Edit" @click="save" icon="mdi-arrow-down-bold-box-outline" padding="xs lg" color="primary" unelevated no-caps /> -->
      <div class="q-mt-md"/>
      <!-- <q-btn label="Cancel Edit" @click="collect" icon="mdi-cancel" padding="xs lg" color="primary" outline no-caps /> -->
       <div class="q-mt-md"/>
      <!-- <q-btn icon="delete" label="Delete Book" @click="del" padding="xs lg" color="red" outline no-caps /> -->
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
// import vuePdfjs from 'vue-pdfjs'
import { PDFBook } from 'src/stores/BookTypes';
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
const book: Ref<PDFBook> = ref(store.get(props.id) as PDFBook);
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
