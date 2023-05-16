<template>
  <q-card class="q-gutter-y-md" flat>
    <q-card-section class="q-pa-none">
      path
      <q-input dense v-model="connect.path" autofocus>
        <template v-slot:append>
          <q-btn icon="mdi-folder-settings" @click="selectDataFolderPath" round unelevated />
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions vertical >
        <q-btn label="Connection Test" @click="test" icon="mdi-account-check-outline" padding="xs lg" color="primary" unelevated no-caps />
        <q-btn label="Save Connection" @click="save" icon="mdi-arrow-down-bold-box-outline" padding="xs lg" color="primary" unelevated no-caps />
        <div class="q-pt-lg"/>
      <template v-if="mode === 'add'">
        <q-btn icon="mdi-arrow-left" label="Select Type" @click="back" padding="xs lg" color="primary" outline no-caps />
      </template>
      <template v-if="mode === 'edit'">
        <q-btn label="Collect Books" @click="collect" icon="mdi-book-open-page-variant-outline" padding="xs lg" color="primary" unelevated no-caps />
        <div class="q-pt-lg"/>
        <q-btn icon="delete" label="Delete Connection Setting" @click="del" padding="xs lg" color="red" outline no-caps />
      </template>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useConnectsStore } from 'src/stores/Connects';
import { useSettingsStore } from 'src/stores/Settings';
import { PDFLocalStorageConnect } from 'src/stores/ConnectTypes';

// --------------------------------
//  store init
// --------------------------------
const connectsStore = useConnectsStore();
const settingsStore = useSettingsStore();

// --------------------------------
//  prop
// --------------------------------
const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator(value: string) {
      return ['add', 'edit'].includes(value);
    }
  },
  id: {
    type: String,
    required: true,
  }
});

// --------------------------------
//  fire parent component events
// --------------------------------
const emit = defineEmits([
  'back',       // back step via parent component.
  'hideDialog', // hide dialog via parent component.
]);

// --------------------------------
//  local var
// --------------------------------
const connect: Ref<PDFLocalStorageConnect> = ref(props.mode === 'add' ? connectsStore.newPDFLocalStorageConnect() : connectsStore.get(props.id) as PDFLocalStorageConnect);

// --------------------------------
//  lifecycle events
// --------------------------------
onMounted(() => {
  // if (props.id) {
  //   kindle.value = connectsStore.connectors.get(props.id) as KindleConnect;
  // } else {
  //   kindle.value = connectsStore.newKindleConnect();
  // }
})

// --------------------------------
//  actions
// --------------------------------
async function selectDataFolderPath () {
  console.log('not implements.');
  const { canceled, filePaths } = await settingsStore.selectFolder();
  if (canceled) { return }
  connect.value.path = filePaths[0];
}

async function test() {
  connectsStore.testPDFLocalStorageConnect(connect.value).then(ret => {
    console.log('collect ok!'); //Todo: implements
    console.log(ret);
  }).catch(reason => {
    console.log(reason); //Todo: implements
  });
};

async function save() {
  await connectsStore.save(connect.value);
};

async function collect() {
  connectsStore.collectPDFLocalStorageConnect(connect.value).then((ret: boolean) => {
    // TODO: show ok message & badge
    console.log(ret);
  }).catch(e => {
    // TODO: show ng message & badge
    console.log(e);
  }).finally(() => {
    // TODO: close spinner
    emit('hideDialog');
  });
};

async function back() {
  emit('back');
}

async function del() {
  // await connectsStore.deleteKindleSetting(kindle.value.id);
  emit('hideDialog');
};
</script>
