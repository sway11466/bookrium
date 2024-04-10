<template>
  <q-toolbar>
    <div class="q-mr-md no-wrap">
      <q-btn @click="$router.go(-1)" icon="arrow_back" dense flat round />
    </div>
    <q-separator vertical inset color="white" />
    <q-toolbar-title class="q-ml-md">
      {{ title }}
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useLabelsStore } from 'src/stores/Labels';
const labels = useLabelsStore();
const route = useRoute();
const mode = route.path.endsWith('/new') ? 'add' : 'edit';
const id = route.params.labelid as string;
const title = mode === 'add' ? 'new label' : labels.get(id).name;
</script>
