<template>
  <q-toolbar>
    <div class="q-mr-md no-wrap">
      <q-btn @click="$router.go(-1)" icon="arrow_back" dense flat round />
    </div>
    <q-separator vertical inset color="white" />
    <q-toolbar-title class="q-ml-md">
      {{ mode === 'add' ? 'new shelf' : shelfName }}
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useShelvesStore } from 'src/stores/Shelves';
const route = useRoute();
const shelves = useShelvesStore();
const mode = route.path.endsWith('/new') ? 'add' : 'edit';
const id = route.params.shelfid as string;
const shelfName = mode === 'add' ? '' : shelves.get(id).name;
</script>
