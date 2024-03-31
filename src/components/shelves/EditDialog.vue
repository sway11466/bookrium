<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-toolbar class="q-mb-md">
        <q-avatar square>
          <q-img src="edit-cuteui-64x64.png" no-spinner />
        </q-avatar>
        <q-toolbar-title>Edit Shelf</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <ShelfSetting :mode="'edit'" :id="id" @hideDialog="hide" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ShelfSetting from 'src/components/shelves/ShelfSetting.vue';
import { ref, Ref } from 'vue';

// --------------------------------
//  local var
// --------------------------------
const id: Ref<string> = ref('');

// --------------------------------
//  self visibility
// --------------------------------
let visible: Ref<boolean> = ref(false);

function show(editId: string) {
  visible.value = true;
  id.value = editId;
}

function hide() {
  visible.value = false;
}

// --------------------------------
//  call from parent components
// --------------------------------
defineExpose({
  show,
  hide,
});
</script>
