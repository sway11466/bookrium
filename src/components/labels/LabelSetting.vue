<template>
  <q-card class="q-gutter-y-md" flat>
    <q-card-section>
      label name
      <q-input dense v-model="label.name" autofocus />
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
