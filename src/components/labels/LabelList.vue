<template>
  <q-tree :nodes="store.tree" node-key="name">
    <template v-slot:default-header="prop">
      <q-chip size="md" color="primary" text-color="white">{{ prop.node.name }}</q-chip>
      <q-space />
      <q-badge :label="prop.node.count" color="primary" rounded transparent />
      <q-btn @click.stop="showEditDialog(prop.node.name)" icon="mdi-square-edit-outline" color="primary" flat square>
      </q-btn>
    </template>
  </q-tree>
 </template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLabelsStore } from 'src/stores/Labels';
// import { DisplayConnect } from 'src/stores/ConnectTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useLabelsStore();

// --------------------------------
//  emit
// --------------------------------
// const emit = defineEmits([
//   'showEditDialog',  // show edit dialog via parent component(ContentsPage).
// ]);

// --------------------------------
//  item actions
// --------------------------------
function showEditDialog(name: string) {
  // emit('showEditDialog', connect.id, connect.type);
}
</script>
[]