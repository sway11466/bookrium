<template>
  <q-list>
    <template v-for="connect in connects.list" :key="connect.id">
      <template v-if="connect.type == 'kindle'">
        <KindleListItem :id="connect.id" @showEditDialog="showEditDialog"/>
      </template>
      <template v-if="connect.type == 'pdfls'">
        <PDFLocalStorageListItem :id="connect.id" @showEditDialog="showEditDialog"/>
      </template>
      <q-separator />
    </template>
  </q-list>
</template>

<script setup lang="ts">
import { useConnectsStore } from 'src/stores/Connects';
import { ConnectDivision } from 'src/stores/ConnectTypes';
import KindleListItem from 'src/components/connects/KindleListItem.vue';
import PDFLocalStorageListItem from 'src/components/connects/PDFLocalStorageListItem.vue';

// --------------------------------
//  store init
// --------------------------------
const connects = useConnectsStore();

// --------------------------------
//  emit
// --------------------------------
const emit = defineEmits([
  'showEditDialog',  // show edit dialog via parent component(ContentsPage).
]);

// --------------------------------
//  item actions
// --------------------------------
function showEditDialog(id:string, type:ConnectDivision) {
  emit('showEditDialog', id, type);
}
</script>
