<template>
  <q-card class="q-gutter-y-md" flat>
    <q-card-section>
      label name
      <q-input dense v-model="label.name" autofocus />
    </q-card-section>
    <q-card-section>
      <div>color</div>
      <q-chip :label="label.name" color="teal-123" style="min-width: 128px;" />
      <q-btn padding="xs" round flat>
        <q-avatar>
          <q-img src="color-picker-96x96.png" />
        </q-avatar>
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color v-model="label.color" default-view="palette" no-header no-footer 
          :palette="['#ffcdd2', '#f8bbd0', '#e1bee7', '#c5cae9', '#bbdefb', '#b2dfdb', '#c8e6c9', '#f0f4c3', '#ffecb3', '#ffe0b2',
                     '#ef9a9a', '#f48fb1', 'ce93d8', '', '', '', '', '', '', '',
                     '#e57373', '', '', '', '', '', '', '', '', '', 
                     '#ef5350', '', '', '', '', '', '', '' ,'' ,'' ,
                     '#f44336', '', '', '', '', '', '', '' ,'' ,'' ,
                     '#e53935', '', '', '', '', '', '', '' ,'' ,'' ,
                     '#d32f2f', '', '', '', '', '', '', '' ,'' ,'' ,
                     '#c62828', '', '', '', '', '', '', '' ,'' ,'' ,
                     '#b71c1c', '', '', '', '', '', '', '' ,'' ,'' ,
                     '#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#616161' ,'#424242' ,'#212121' ]" />
                     <!--
                      red-2
                      .
                      .
                      red-10
                      grey-0 grey-1 grey2 ... grey10
                     -->
        </q-popup-proxy>        
      </q-btn>
    </q-card-section>
    <q-card-section>
      parent label
      <q-input dense v-model="label.parent" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useLabelsStore } from 'src/stores/Labels';
import { Label } from 'src/stores/LabelTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useLabelsStore();

// --------------------------------
//  prop
// --------------------------------
// const props = defineProps({
//   id: {
//     type: String,
//     required: true,
//   }
// });

// --------------------------------
//  fire parent component events
// --------------------------------
const emit = defineEmits([
  'showDialog', // show dialog via parent component.
  'hideDialog', // hide dialog via parent component.
]);

// --------------------------------
//  local var
// --------------------------------
const label: Ref<Label> = ref(store.newLabel());

// --------------------------------
//  lifecycle events
// --------------------------------
onMounted(() => {
// 
})

// --------------------------------
//  actions
// --------------------------------
async function save() {
  // await connectsStore.saveKindleConnect(kindle.value);
};

async function del() {
  // await connectsStore.deleteKindleSetting(kindle.value.id);
  // emit('hideDialog');
};
</script>
