<template>
  <q-page padding>
    <LabelSetting :mode="mode" :id="id" />
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import LabelSetting from 'src/components/labels/LabelSetting.vue';
const route = useRoute();
const mode = route.path.endsWith('/new') ? 'add' : 'edit';
const id = route.params.labelid as string;
</script>
