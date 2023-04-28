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
import { ref, Ref, onMounted } from 'vue';
import { useBooksStore } from 'src/stores/Books';
import { useConnectsStore } from 'src/stores/Connects';
import { KindleConnect } from 'src/stores/ConnectTypes';

// --------------------------------
//  store init
// --------------------------------
const connects = useConnectsStore();
const books = useBooksStore();

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
let kindle :Ref<KindleConnect> = ref({
  id: '',
  email: '',
  password: '',
});

// --------------------------------
//  lifecycle events
// --------------------------------
onMounted(() => {
  if (props.id) {
    const kindleSetting = connects.getKindleSetting(props.id);
    kindle.value = kindleSetting;
  } else {
    console.log('not implements.');
    // TODO: Assign uuid as id
  }
})

// --------------------------------
//  actions
// --------------------------------
async function test() {
  // TODO: show spinner
  connects.testKindleSetting(kindle.value).then((ret) => {
    if (ret) {
      // TODO: show ok message & badge
      console.log('test ok');
    } else {
      // TODO: show ng message & badge
      console.log('test ng');
    }
  }).catch(e => {
    // TODO: show ng message & badge
    console.log(e);
  }).finally(() => {
    // TODO: close spinner
  });
};

async function collect() {
  connects.collectKindleBooks(kindle.value).then((books) => {
      console.log('result');
      console.log(books);
  }).catch(e => {
    // TODO: show ng message & badge
    console.log(e);
  }).finally(() => {
    // TODO: close spinner
    emit('hideDialog');
  });
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
