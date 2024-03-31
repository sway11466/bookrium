<template>
  <q-page class="col">
    <ShelfList @showAddDialog="showAddDialog" @showEditDialog="showEditDialog"/>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="showAddDialog" round padding="xs">
        <q-avatar square>
          <q-img src="add-folder-cuteui-64x64.png" no-spinner />
        </q-avatar>
      </q-btn>
    </q-page-sticky>
    <AddDialog ref="addDialog" />
    <EditDialog ref="editDialog" />
  </q-page>
</template>

<script setup lang="ts">
import ShelfList from 'src/components/shelves/ShelfList.vue';
import AddDialog from 'src/components/shelves/AddDialog.vue';
import EditDialog from 'src/components/shelves/EditDialog.vue';
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
