<template>
  <q-item @click="show" clickable v-ripple>
    <q-item-section avatar>
      <q-img src="pdf-94x94.png" fit="fill" />
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
import { useRouter } from 'vue-router'
import { PDFBook } from 'src/stores/BookTypes';

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
  'showBook', // show book via parent component(ContentsPage).
]);

// --------------------------------
//  local var
// --------------------------------
const router = useRouter();
const book: Ref<PDFBook> = ref(props.book as PDFBook);

// --------------------------------
//  actions
// --------------------------------
function show(): void {
  emit('showBook', book.value);
}

function edit(): void {
  router.push({ path:`/books/${book.value.id}` });
}
</script>
