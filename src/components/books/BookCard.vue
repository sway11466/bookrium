<template>
  <q-card @click="show" flat bordered class="">

    <q-card-section>
      <q-img :src="props.book.artwork" fit="contain" no-spinner />
    </q-card-section>
  
    <q-card-section class="q-pt-none q-mb-sm text-caption title">
      {{ props.book.title }}
    </q-card-section>

    <q-fab @click.stop direction="down" vertical-actions-align="right"
           color="primary" icon="menu" padding="xs" class="absolute" style="top: 1em; right: 1em;">
      <q-fab-action @click="edit" icon="mdi-file-document-edit" color="primary" label="edit" />
      <q-fab-action @click="del" icon="delete" color="red" label="delete" />
    </q-fab>

  </q-card>
</template>

<style scoped>
.q-card {
  width: 14em;
  cursor: pointer;
}
.q-img {
  height: 14em;
}
.title {
  height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBooksStore } from 'src/stores/Books';
import { Book } from 'src/stores/BookTypes';

const props = defineProps({
  book: {
    type: Object as () => Book,
    required: true,
  }
});

const store = useBooksStore();
const router = useRouter();

function show() {
  console.info('[BookCard] show');
  store.show(props.book);
}

function edit() {
  router.push({ path:`/books/${props.book.id}` });
}

function del() {
  console.info('[BookCard] del');
  // todo delete
}
</script>
