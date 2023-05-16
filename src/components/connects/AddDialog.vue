<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-toolbar class="q-mb-md">
        <q-avatar square>
          <q-img src="add-link-cuteui-64x64.png" no-spinner />
        </q-avatar>
        <q-toolbar-title>Add Connection</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step :name="1" title="1.select type" :done="step > 1">
          <div>select collection type.</div>
          <q-list>
            <q-item tag="label" class="q-px-none" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="type" val="kindle" />
              </q-item-section>
              <q-item-section>
                <div>
                  <q-img src="kindle-48x48.svg" width="32px" />
                  kindle
                </div>
              </q-item-section>
            </q-item>
            <q-item tag="label" class="q-px-none" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="type" val="pdfls" />
              </q-item-section>
              <q-item-section>
                <div>
                  <q-img src="pdf-48x48.png" width="32px" />
                  PDF(Local Storage)
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="q-pt-lg">
                <q-btn icon="mdi-arrow-right" label="Detail Setting"
                       :disable="type === ''" @click="step = 2"
                       padding="xs lg" color="primary" unelevated no-caps />
              </q-item-section>
            </q-item>
          </q-list>
        </q-step>

        <q-step :name="2" title="2.detail setting" :done="step > 2">
          <template v-if="type === 'kindle'">
            <KindleSetting mode="add" id="" @back="step = 1" @hideDialog="hide" />
          </template>
          <template v-if="type === 'pdfls'">
            <PDFLocalStorageSetting mode="add" id="" @back="step = 1" @hideDialog="hide" />
          </template>
        </q-step>
      </q-stepper>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import KindleSetting from 'src/components/connects/KindleSetting.vue';
import PDFLocalStorageSetting from 'src/components/connects/PDFLocalStorageSetting.vue';
import { ref } from 'vue';

// --------------------------------
//  self visibility
// --------------------------------
let visible = ref(false);

function show() {
  visible.value = true;
  step.value = 1;
  type.value = '';
}

function hide() {
  visible.value = false;
}

// --------------------------------
//  tab
// --------------------------------
const step = ref(1);
const type = ref('');

// --------------------------------
//  call from parent components
// --------------------------------
defineExpose({
  show,
  hide,
});
</script>
