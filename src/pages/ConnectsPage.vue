<template>
  <q-page class="col">
    <ConnectList @showEditDialog="showEditDialog"/>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab @click="showAddDialog" round padding="xs">
        <q-avatar square>
          <q-img src="add-link-cuteui-64x64.png" no-spinner />
        </q-avatar>
      </q-btn>
    </q-page-sticky>
    <AddDialog ref="addDialog" />
    <EditDialog ref="editDialog" />
  </q-page>
</template>

<script setup lang="ts">
import AddDialog from 'src/components/connects/AddDialog.vue';
import ConnectList from 'src/components/connects/ConnectsList.vue';
import EditDialog from 'src/components/connects/EditDialog.vue';
import { ref } from 'vue';
import { ConnectType } from 'src/stores/ConnectTypes';

// --------------------------------
//  component ref
// --------------------------------
const addDialog = ref();
const editDialog = ref();

// --------------------------------
//  daialog visibility
// --------------------------------
function showAddDialog() {
  addDialog.value.show();
}

function showEditDialog(id:string, type:ConnectType) {
  editDialog.value.show(id, type);
}
</script>
