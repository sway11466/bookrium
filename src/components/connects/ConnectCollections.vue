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
import { useRouter } from 'vue-router';
import { useConnectsStore } from 'src/stores/Connects';
import { ConnectType } from 'src/stores/ConnectTypes';
import KindleListItem from 'src/components/connects/KindleListItem.vue';
import PDFLocalStorageListItem from 'src/components/connects/PDFLocalStorageListItem.vue';

// --------------------------------
//  store init
// --------------------------------
const router = useRouter();
const connects = useConnectsStore();

// --------------------------------
//  item actions
// --------------------------------
function showEditDialog(id:string, type:ConnectType) {
  // emit('showEditDialog', id, type);
  router.push(`/connects/${id}`);
}
</script>
