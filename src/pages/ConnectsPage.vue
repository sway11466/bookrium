<template>
  <q-page class="col">
    <connect-list />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="showAddDialog" />
    </q-page-sticky>
    <add-dialog ref="addDialog" />
  </q-page>
</template>

<script setup lang="ts">
import AddDialog from 'src/components/connects/AddDialog.vue';
import ConnectList from 'src/components/connects/ConnectsList.vue';
import { ref } from 'vue';
const addDialog = ref();
function showAddDialog() {
  addDialog.value.show();
}
</script>
