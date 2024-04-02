<template>
  <q-tree :nodes="store.tree" node-key="name">
    <template v-slot:default-header="prop">
      <q-chip size="md" :style="{ color: prop.node.fore_color, backgroundColor: prop.node.back_color }">{{ prop.node.name }}</q-chip>
      <q-space />
      <q-badge :label="prop.node.count" color="primary" rounded transparent />
      <q-btn @click.stop="edit(prop.node)" icon="mdi-square-edit-outline" color="primary" flat square>
      </q-btn>
    </template>
  </q-tree>
 </template>

<script setup lang="ts">
import { useLabelsStore } from 'src/stores/Labels';
import { Shelf } from 'src/stores/ShelvesTypes';

const store = useLabelsStore();
const emit = defineEmits(['edit']);

function edit(shelf: Shelf) {
  emit('edit', shelf);
}
</script>
