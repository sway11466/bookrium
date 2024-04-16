<template>
  <q-toolbar>
    <div class="q-mr-md no-wrap">
      <q-btn @click="$router.go(-1)" icon="arrow_back" dense flat round />
    </div>
    <q-separator vertical inset color="white" />
    <q-toolbar-title class="q-ml-md">
      {{ title() }}
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
function title() {
  const mode = route.path.includes('/new') ? 'add' : 'edit';
  switch (mode) {
    case 'add':
      return 'new connect' +
        (route.path.endsWith('/kindle') ? ' (Kindle)' : '') +
        (route.path.endsWith('/pdfls') ? ' (PDF Local Storage)' : '');
    case 'edit':
      return 'edit connect';
  }
  return 'new connect';
}
</script>
