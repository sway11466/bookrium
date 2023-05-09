<template>
  <q-page class="col">
    <LabelList @showEditDialog="showEditDialog"/>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="showAddDialog" round padding="xs">
        <q-avatar>
          <q-img src="add-tag-color-96x96.png" />
        </q-avatar>
      </q-btn>
    </q-page-sticky>
    <AddDialog ref="addDialog" />
    <!-- 
    <EditDialog ref="editDialog" />
     -->
  </q-page>
</template>

<script setup lang="ts">
import AddDialog from 'src/components/labels/AddDialog.vue';
import LabelList from 'src/components/labels/LabelList.vue';
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
