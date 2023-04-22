<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        Enter the collection destination settings.
      </q-card-section>

      <q-tabs v-model="tab" no-caps>
        <q-tab label="Kindle" name="kindle" />
        <q-tab label="Local Strage" name="localstrage" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="kindle">
          <kindle-setting @hideDialog="hide" />
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
//  visibility
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
