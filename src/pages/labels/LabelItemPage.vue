<template>
  <q-page padding>
    <LabelEditor :mode="mode" :id="id" />
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import LabelEditor from 'src/components/labels/LabelEditor.vue';
const route = useRoute();
const mode = route.path.endsWith('/new') ? 'add' : 'edit';
const id = (mode === 'add') ? '' : route.params.labelid as string;
</script>
