<template>
  <q-item @click="show" clickable v-ripple>
    <q-item-section avatar>
      <q-img :src="book.artwork" fit="fill" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{book.title}}</q-item-label>
      <q-item-label caption>{{book.author}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn @click.stop="edit" flat square>
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
  book: {
    type: Object,
    required: true,
  }
});

// --------------------------------
//  emit
// --------------------------------
const emit = defineEmits([
  'show', // show book via parent component(ContentsPage).
  'edit', // edit book via parent component(ContentsPage).
]);

// --------------------------------
//  local var
// --------------------------------
const book: Ref<KindleBook> = ref(props.book as KindleBook);

// --------------------------------
//  actions
// --------------------------------
function show(): void {
  emit('show', book.value);
}

function edit(): void {
  emit('edit', book.value);
}
</script>
