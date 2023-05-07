<template>
  <q-dialog v-model="visible" persistent>
    <q-btn icon="close" flat round dense v-close-popup />
    <LabelSetting />
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
