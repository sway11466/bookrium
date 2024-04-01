<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-for="(shelf, index) in store.list" :key="index">
      <ShelfListItem :shelf="shelf" @edit="edit" />
    </template>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import ShelfListItem from 'src/components/shelves/ShelfListItem.vue';
import { useShelvesStore } from 'src/stores/Shelves';
import { Shelf } from 'src/stores/ShelvesTypes';

const store = useShelvesStore();

const emit = defineEmits([
  'edit',  // show edit dialog via parent component.
]);

function edit(shelf: Shelf) {
  emit('edit', shelf);
}
</script>
