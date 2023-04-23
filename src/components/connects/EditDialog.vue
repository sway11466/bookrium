<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <template v-if="type == 'kindle'">
          <q-img src="icons/icons8-amazon-kindle-48.svg" width="32px" />kindle Setting
        </template>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="kindle">
          <KindleSetting :id="id" @hideDialog="hide" />
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
import { Ref, ref } from 'vue';
import { ConnectType } from 'src/stores/ConnectTypes';

// --------------------------------
//  local var
// --------------------------------
let tab = ref('kindle')
let id = ref('');
let type :Ref<ConnectType> = ref('kindle');
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
