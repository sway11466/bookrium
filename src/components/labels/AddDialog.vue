<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-toolbar class="q-mb-md">
        <q-avatar square>
          <q-img src="add-tag-cuteui-64x64.png" no-spinner />
        </q-avatar>
        <q-toolbar-title>Add Label</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <LabelSetting :mode="'add'" :id="''" @hideDialog="hide" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import LabelSetting from 'src/components/labels/LabelSetting.vue';
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
