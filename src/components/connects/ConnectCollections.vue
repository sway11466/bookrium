<template>
  <q-list>
    <template v-for="connect in connects.list" :key="connect.id">
      <template v-if="connect.type === 'kindle'">
        <KindleListItem :id="connect.id" />
      </template>
      <template v-if="connect.type === 'pdfls'">
        <PDFLocalStorageListItem :id="connect.id" />
      </template>
      <q-separator />
    </template>
  </q-list>
</template>

<script setup lang="ts">
import KindleListItem from 'src/components/connects/KindleListItem.vue';
import PDFLocalStorageListItem from 'src/components/connects/PDFLocalStorageListItem.vue';
import { useConnectsStore } from 'src/stores/Connects';
const connects = useConnectsStore();
</script>
