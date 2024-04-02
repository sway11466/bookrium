<template>
  <q-page padding>
    <ShelfEditor :mode="mode" :id="id" />
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ShelfEditor from 'src/components/shelves/ShelfEditor.vue';
const route = useRoute();
const mode = route.path.endsWith('/new') ? 'add' : 'edit';
const id = route.params.shelfid as string;
</script>
