<template>
  <q-page padding>
    <ShelfEditor v-if="editorVisible" :mode="mode" :id="id" />
    <BookSelector v-if="selectorVisible" :mode="mode" :shelfid="id" />
    <BookReorder v-if="reorderVisible" :shelfid="id" />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ShelfEditor from 'src/components/shelves/ShelfEditor.vue';
import BookReorder from 'src/components/shelves/BookReorder.vue';
import BookSelector from 'src/components/shelves/BookSelector.vue';
const route = useRoute();
const mode = computed<string>(() => {
  if (route.path.endsWith('/shelves/new')) { return 'add'; }
  if (route.path.endsWith('/edit')) { return 'edit'; }
  if (route.path.endsWith('/addBook')) { return 'add'; }
  if (route.path.endsWith('/delBook')) { return 'del'; }
  return '';
})
const id = route.params.shelfid as string;
const editorVisible = route.path.endsWith('/edit') || route.path.endsWith('/new');
const selectorVisible = route.path.endsWith('/addBook') || route.path.endsWith('/delBook');
const reorderVisible = route.path.endsWith('/sortBook');
</script>   
