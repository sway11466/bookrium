<template>
  <q-page class="col">
    <LabelList @showAddDialog="showAddDialog" @showEditDialog="showEditDialog"/>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="showAddDialog" round padding="xs">
        <q-avatar square>
          <q-img src="add-tag-cuteui-64x64.png" no-spinner />
        </q-avatar>
      </q-btn>
    </q-page-sticky>
    <AddDialog ref="addDialog" />
    <EditDialog ref="editDialog" />
  </q-page>
</template>

<script setup lang="ts">
import LabelList from 'src/components/labels/LabelList.vue';
import AddDialog from 'src/components/labels/AddDialog.vue';
import EditDialog from 'src/components/labels/EditDialog.vue';
import { ref } from 'vue';

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

function showEditDialog(id: string) {
  editDialog.value.show(id);
}
</script>
