<template>
  <q-item @click="view" clickable v-ripple>
    <q-item-section avatar>
      <q-img src="pdf-94x94.png" fit="fill" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{book.title}}</q-item-label>
      <q-item-label caption>{{book.author}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn @click.stop="showEditDialog" flat square>
        <q-avatar square>
          <q-img src="detail-cuteui-64x64.png" no-spinner />
        </q-avatar>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { PDFBook } from 'src/stores/BookTypes';

// --------------------------------
//  prop
// --------------------------------
const props = defineProps({
  param: {
    type: Object,
    required: true,
  }
});

// --------------------------------
//  emit
// --------------------------------
const emit = defineEmits([
  'showBook',       // show book via parent component(ContentsPage).
  'showPDFDialog',  // show edit dialog via parent component(ContentsPage).
]);

// --------------------------------
//  local var
// --------------------------------
const book: Ref<PDFBook> = ref(props.param as PDFBook);

// --------------------------------
//  actions
// --------------------------------
function showEditDialog(): void {
  emit('showPDFDialog', book.value);
}

function view(): void {
  emit('showBook', book.value);
}
</script>
