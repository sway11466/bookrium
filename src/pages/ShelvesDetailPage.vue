<template>
  <ShelfSetting :mode="mode" :id="id" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ShelfSetting from 'src/components/shelves/ShelfSetting.vue';
const route = useRoute();
const mode = route.path.endsWith('/new') ? 'add' : 'edit';
const id = route.params.shelfid as string;
</script>
