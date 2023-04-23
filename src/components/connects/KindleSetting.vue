<template>
  <q-card flat>
    <q-card-section class="q-pa-none">
      user name
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-input dense v-model="kindle.email" autofocus />
    </q-card-section>
    <q-card-section class="q-pa-none q-pt-lg">
      password
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-input dense v-model="kindle.password" />
    </q-card-section>
    <q-card-actions class="q-pa-none q-pt-lg" vertical >
      <q-btn icon="mdi-account-check-outline" label="Connection Test" @click="test" @blur="debug" padding="xs lg" color="primary" unelevated no-caps />
      <div class="q-pa-sm" />
      <q-btn icon="mdi-arrow-down-bold-box-outline" label="Collect Books" @click="collect" padding="xs lg" color="primary" unelevated no-caps />
      <div class="q-pa-lg" />
      <q-btn icon="delete" label="Delete Connection Setting" @click="del" padding="xs lg" color="red" outline no-caps />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useConnectsStore } from 'src/stores/Connects';

// --------------------------------
//  store init
// --------------------------------
const connects = useConnectsStore();

// --------------------------------
//  prop
// --------------------------------
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

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
let kindle = ref({
  email: '',
  password: '',
});

// --------------------------------
//  lifecycle events
// --------------------------------
onMounted(() => {
  console.log(props.id);
  const kindleSetting = connects.getKindleSetting(props.id);
  console.log(kindleSetting);
  kindle.value = kindleSetting;
  console.log(kindle.value);
})

// --------------------------------
//  actions
// --------------------------------
function test() {
  console.log('not implements.');
};

function collect() {
  console.log('not implements.');
  emit('hideDialog');
};

function del() {
  console.log('not implements.');
  emit('hideDialog');
};

// --------------------------------
//  debug functions
// --------------------------------
function debug() {
  console.log('==== Conncts Srote State ====');
  connects.logState();
}

</script>
