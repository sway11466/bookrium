<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-toolbar class="q-mb-md">
        <q-avatar square>
          <q-img src="add-tag-blue-80x80.png" />
        </q-avatar>
        <q-toolbar-title>Edit Label</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <LabelSetting :mode="'edit'" :id="id" @hideDialog="hide" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import LabelSetting from 'src/components/labels/LabelSetting.vue';
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
