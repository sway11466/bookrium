<template>
  <q-item @click="test" clickable v-ripple>
    <q-item-section avatar>
      <q-img :src="book.productUrl" fit="fill" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{book.title}}</q-item-label>
      <q-item-label caption>{{book.authors.join(',')}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn @click.stop="showEditDialog" icon="edit" color="primary" outline rounded />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { KindleBook } from 'src/stores/BookTypes';

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
  'showKindleDialog',  // show edit dialog via parent component(ContentsPage).
]);

// --------------------------------
//  local var
// --------------------------------
const book: Ref<KindleBook> = ref(props.param as KindleBook);

// --------------------------------
//  actions
// --------------------------------
function showEditDialog() {
  emit('showKindleDialog', book.value);
}

function test() {
  console.log('called');
}
</script>
