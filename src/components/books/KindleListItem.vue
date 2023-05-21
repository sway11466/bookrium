<template>
  <q-item @click="test" clickable v-ripple>
    <q-item-section avatar>
      <q-img :src="book.productUrl" fit="fill" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{book.title}}</q-item-label>
      <q-item-label caption>{{authors()}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn @click.stop="showEditDialog" flat square>
        <q-avatar square>
          <q-img src="edit-prop-cuteui-64x64.png" no-spinner />
        </q-avatar>
      </q-btn>
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
function showEditDialog(): void {
  emit('showKindleDialog', book.value);
}

function authors(): string {
  return book.value.authors.join(':').split(':').join(',').replace(/,$/, '');
}

function test(): void {
  window.open(book.value.webReaderUrl);
  //Todo: auto login if not logined.
}
</script>
