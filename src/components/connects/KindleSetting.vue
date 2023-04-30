<template>
  <q-card class="q-gutter-y-md" flat>
    <q-card-section class="q-pa-none">
      user name
      <q-input dense v-model="kindle.email" autofocus />
    </q-card-section>
    <q-card-section class="q-pa-none">
      password
      <q-input dense v-model="kindle.password" />
    </q-card-section>
    <q-card-actions vertical>
      <q-btn label="Save Connection" @click="save" icon="mdi-arrow-down-bold-box-outline" padding="xs lg" color="primary" unelevated no-caps />
    </q-card-actions>
    <q-separator />
    <q-card-actions vertical >
      <q-btn label="Connection Test" @click="test" icon="mdi-account-check-outline" padding="xs lg" color="primary" unelevated no-caps />
      <q-btn label="Collect Books" @click="collect" icon="mdi-book-open-page-variant-outline" padding="xs lg" color="primary" unelevated no-caps />
    </q-card-actions>
    <q-separator />
    <q-card-actions vertical >
      <q-btn icon="delete" label="Delete Connection Setting" @click="del" padding="xs lg" color="red" outline no-caps />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
// import { useBooksStore } from 'src/stores/Books';
import { useConnectsStore } from 'src/stores/Connects';
import { KindleConnect } from 'src/stores/ConnectTypes';
import { ConnectApi } from 'src-electron/modules/connects/connect-api'

// --------------------------------
//  suppress ts lint message.
// --------------------------------
export interface Window {
  connectApi: ConnectApi
};
export declare var window: Window;

// --------------------------------
//  store init
// --------------------------------
const connects = useConnectsStore();
connects.bind(window.connectApi);
// const books = useBooksStore();

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
    kindle.value = connects.getKindleSetting(props.id);
  } else {
    console.log('not implements.');
    // TODO: Assign uuid as id
  }
})

// --------------------------------
//  actions
// --------------------------------
async function save() {
  let connectSettings = await connects.loadConnectsSetting();
  for (let i=0; i<connectSettings.kindle.length; i++) {
    if (connectSettings.kindle[i].id == kindle.value.id) {
      Object.assign(connectSettings.kindle[i], kindle);
    }
  }
  await connects.saveConnectsSetting(connectSettings);
};

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
