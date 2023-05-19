<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <template v-if="type == 'kindle'">
          <q-img src="kindle-48x48.svg" width="32px" />kindle Setting
        </template>
        <template v-if="type == 'pdfls'">
          <q-img src="pdf-47x47.png" width="32px" />PDF (Local Storage) Setting
        </template>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <template v-if="type == 'kindle'">
          <KindleSetting mode="edit" :id="id" @hideDialog="hide" />
        </template>
        <template v-if="type == 'pdfls'">
          <PDFLocalStorageSetting mode="edit" :id="id" @hideDialog="hide" />
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import KindleSetting from 'src/components/connects/KindleSetting.vue';
import PDFLocalStorageSetting from 'src/components/connects/PDFLocalStorageSetting.vue';
import { Ref, ref } from 'vue';
import { ConnectType } from 'src/stores/ConnectTypes';

// --------------------------------
//  local var
// --------------------------------
let id = ref('');
let type: Ref<ConnectType | ''> = ref('');
let visible = ref(false);

// --------------------------------
//  visibility
// --------------------------------
function show(targetId:string, targetType:ConnectType) {
  id.value = targetId;
  type.value = targetType;
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
