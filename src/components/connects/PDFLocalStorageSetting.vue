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

    <q-card-actions class="q-mt-xl" vertical>
      <q-btn label="Connection Test" @click="test" icon="mdi-account-check-outline" padding="xs lg" color="primary" unelevated no-caps />
      <div v-if="connect.state.test === 'none'" style="height:2em"></div>
      <div v-if="connect.state.test === 'testing'"><q-spinner color="primary" size="2em" /> Connection Testing...</div>
      <div v-if="connect.state.test === 'ok'"><q-icon name="mdi-check-circle-outline" color="green" size="2em" /> Connection Success.</div>
      <div v-if="connect.state.test === 'error'"><q-icon name="mdi-alert-circle-outline" color="red" size="2em" /> Connection Failed.</div>

      <div class="q-mt-md"/>
      <q-btn label="Save Connection" @click="save" icon="mdi-arrow-down-bold-box-outline" padding="xs lg" color="primary" unelevated no-caps />
      <div v-if="props.mode === 'edit' &&  changed" style="height:2em"><q-icon name="mdi-alert-outline" color="orange" size="2em" /> Need Save Changes.</div>
      <div v-if="props.mode === 'edit' && !changed"><q-icon name="mdi-check-circle-outline" color="green" size="2em" /> Saved.</div>

      <template v-if="mode === 'add'">
        <div class="q-mt-xl"/>
        <q-btn icon="mdi-arrow-left" label="Select Type" @click="back" padding="xs lg" color="primary" outline no-caps />
      </template>

      <template v-if="mode === 'edit'">
        <div class="q-mt-md"/>
        <q-btn label="Collect Books" @click="collect" icon="mdi-book-open-page-variant-outline" padding="xs lg" color="primary" unelevated no-caps />
        <div v-if="connect.state.collect === 'none'" style="height:2em"></div>
        <div v-if="connect.state.collect === 'collecting'"><q-spinner color="primary" size="2em" /> Collecting Books ...</div>
        <div v-if="connect.state.collect === 'ok'"><q-icon name="mdi-check-circle-outline" color="green" size="2em" /> Collected {{ connect.bookCount }} Books.</div>
        <div v-if="connect.state.collect === 'error'"><q-icon name="mdi-alert-circle-outline" color="red" size="2em" /> Collect Failed.</div>

        <div class="q-mt-xl"/>
        <q-btn icon="delete" label="Delete Connection Setting" @click="del" padding="xs lg" color="red" outline no-caps />
      </template>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
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
//  edit control
// --------------------------------
const connect: Ref<PDFLocalStorageConnect> = ref((props.mode === 'add' ? connectsStore.new('pdfls') : connectsStore.clone(props.id)) as PDFLocalStorageConnect);
const changed = computed<boolean>(() => {
  return (
    !connectsStore.has(props.id) ||
    (connect.value.path != (connectsStore.get(props.id) as PDFLocalStorageConnect).path)
  );
})

// --------------------------------
//  actions
// --------------------------------
async function selectDataFolderPath () {
  const { canceled, filePaths } = await settingsStore.selectFolder();
  if (canceled) { return }
  connect.value.path = filePaths[0];
};

function test() {
  connect.value.state.test = 'testing';
  connectsStore.test(connect.value).then(() => {
    connect.value.state.test = 'ok';
  }).catch(reason => {
    console.log(reason);
    connect.value.state.test = 'error';
  });
};

function save() {
  switch (props.mode) {
    case 'add':
      connectsStore.add(connect.value);
      emit('hideDialog');
      break;
    case 'edit':
      connectsStore.update(connect.value);
      break;
  }
};

async function collect() {
  connect.value.state.collect = 'collecting';
  connectsStore.collectPDFLocalStorageConnect(connect.value).then((count: number) => {
    connect.value.bookCount = count;
    connect.value.state.collect = 'ok';
    save();
  }).catch(reason => {
    console.log(reason);
    connect.value.state.collect = 'error';
  })
};

function back() {
  emit('back');
};

async function del() {
  await connectsStore.del(connect.value.id);
  emit('hideDialog');
};
</script>
