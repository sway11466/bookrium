<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div>Select collection pattern and enter source settings.</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-tabs v-model="tab" no-caps>
        <q-tab name="kindle">
          <div><q-img src="icons/icons8-amazon-kindle-48.svg" width="32px" />kindle</div>
        </q-tab>
        <q-tab label="Local Strage" name="localstrage" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="kindle">
          <KindleSetting id="" @hideDialog="hide" />
        </q-tab-panel>

        <q-tab-panel name="localstrage">
          Not Implements.
        </q-tab-panel>
      </q-tab-panels>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import KindleSetting from 'src/components/connects/KindleSetting.vue';
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
//  tab
// --------------------------------
let tab = ref('kindle')

// --------------------------------
//  call from parent components
// --------------------------------
defineExpose({
  show,
  hide,
});
</script>
