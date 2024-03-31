<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-toolbar class="q-mb-md">
        <q-avatar square>
          <q-img src="add-folder-cuteui-64x64.png" no-spinner />
        </q-avatar>
        <q-toolbar-title>Add Shelf</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <ShelfSetting :mode="'add'" :id="''" @hideDialog="hide" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ShelfSetting from 'src/components/shelves/ShelfSetting.vue';
import { ref } from 'vue';

// --------------------------------
//  self visibility
// --------------------------------
let visible = ref(false);

function show() {
  visible.value = true;
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
