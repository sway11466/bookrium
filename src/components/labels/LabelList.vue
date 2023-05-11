<template>
  <template v-if="store.labels.size > 0">
    <q-tree :nodes="store.tree" node-key="name">
      <template v-slot:default-header="prop">
        <q-chip size="md" :style="{ color: prop.node.fore_color, backgroundColor: prop.node.back_color }">{{ prop.node.name }}</q-chip>
        <q-space />
        <q-badge :label="prop.node.count" color="primary" rounded transparent />
        <q-btn @click.stop="showEditDialog(prop.node.id)" icon="mdi-square-edit-outline" color="primary" flat square>
        </q-btn>
      </template>
    </q-tree>
  </template>
  <template v-else>
    <div class="q-pa-lg text-h5">The label is not registered.</div>
    <div class="q-pa-lg">
      <q-btn @click="showAddDialog" padding="xs lg" no-caps>
        <q-avatar square>
          <q-img src="add-tag-color-96x96.png" />
        </q-avatar>
        <span class="q-px-lg">Add Label</span>
      </q-btn>
    </div>
  </template>
 </template>

<script setup lang="ts">
import { useLabelsStore } from 'src/stores/Labels';

// --------------------------------
//  store init
// --------------------------------
const store = useLabelsStore();

// --------------------------------
//  emit
// --------------------------------
const emit = defineEmits([
  'showAddDialog',   // show add dialog via parent component(LabelPage).
  'showEditDialog',  // show edit dialog via parent component(LabelPage).
]);

// --------------------------------
//  item actions
// --------------------------------
function showAddDialog() {
  emit('showAddDialog');
}

function showEditDialog(id: string) {
  emit('showEditDialog', id);
}
</script>
