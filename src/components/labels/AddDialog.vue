<template>
  <q-dialog v-model="visible">
    <q-card style="min-width: 350px">
      <q-toolbar class="q-mb-lg">
        <q-avatar square>
          <q-img src="add-tag-blue-80x80.png" />
        </q-avatar>
        <q-toolbar-title>Add Label</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <LabelSetting />
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
