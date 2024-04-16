<template>
  <div>

    <div class="q-ma-md">
      name
      <q-input dense v-model="connect.name" autofocus />
    </div>

    <div class="q-ma-md">
      path
      <q-input dense v-model="connect.extends.path" autofocus>
        <template v-slot:append>
          <q-btn icon="mdi-folder-settings" @click="selectDataFolderPath" round unelevated />
        </template>
      </q-input>
    </div>

    <div class="q-mt-xl" />

    <div class="q-ma-md text-center">
      <q-btn label="Connection Test" @click="test" icon="mdi-account-check-outline" padding="xs lg" color="primary" unelevated no-caps />
      <div v-if="connect.state.test === 'none'" style="height:2em"></div>
      <div v-if="connect.state.test === 'testing'"><q-spinner color="primary" size="2em" /> Connection Testing...</div>
      <div v-if="connect.state.test === 'ok'"><q-icon name="mdi-check-circle-outline" color="green" size="2em" /> Connection Success.</div>
      <div v-if="connect.state.test === 'error'"><q-icon name="mdi-alert-circle-outline" color="red" size="2em" /> Connection Failed.</div>
    </div>

    <div class="q-ma-md text-center">
      <q-btn label="Save Connection" @click="save" icon="mdi-arrow-down-bold-box-outline" color="primary" unelevated no-caps />
      <div v-if=" changed"><q-icon name="mdi-alert-outline" color="orange" size="2em" /> Need Save Changes.</div>
      <div v-if="!changed"><q-icon name="mdi-check-circle-outline" color="green" size="2em" /> Saved.</div>
    </div>

    <div class="q-ma-md text-center">
      <q-btn label="Collect Books" @click="collect" icon="mdi-book-open-page-variant-outline" :disable="collectable" color="primary" unelevated no-caps />
      <div v-if="connect.state.collect === 'none'" style="height:2em"></div>
      <div v-if="connect.state.collect === 'collecting'"><q-spinner color="primary" size="2em" /> Collecting Books ...</div>
      <div v-if="connect.state.collect === 'ok'"><q-icon name="mdi-check-circle-outline" color="green" size="2em" /> Collected {{ connect.bookCount }} Books.</div>
      <div v-if="connect.state.collect === 'error'"><q-icon name="mdi-alert-circle-outline" color="red" size="2em" /> Collect Failed.</div>
    </div>

    <div class="q-ma-md text-center">
      <template v-if="mode === 'edit'">
        <q-btn icon="delete" label="Delete Connection Setting" @click="del" padding="xs lg" color="red" outline no-caps />
      </template>
    </div>

  </div>
</template>

<style scoped>
.q-btn {
  width: 40%;
}
</style>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useConnectsStore } from 'src/stores/Connects';
import { useSettingsStore } from 'src/stores/Settings';
import { PDFLocalStorageConnect } from 'src/stores/ConnectTypes';

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
  }
});

// --------------------------------
//  store init
// --------------------------------
const route = useRoute();
const connects = useConnectsStore();
const settings = useSettingsStore();

// --------------------------------
//  edit control
// --------------------------------
const connectid = route.params.connectid as string;
const connect: Ref<PDFLocalStorageConnect> = ref((props.mode === 'add' ? connects.new('pdfls') : connects.clone(connectid)) as PDFLocalStorageConnect);
const changed = computed<boolean>(() => {
  return (
    props.mode === 'add' ?
      (!connects.has(connect.value.id))
      :
      (connect.value.extends.path != (connects.get(connect.value.id) as PDFLocalStorageConnect).extends.path)
  );
})
const collectable = computed<boolean>(() => {
  return connect.value.state.test !== 'ok';
})

// --------------------------------
//  actions
// --------------------------------
async function selectDataFolderPath () {
  const { canceled, filePaths } = await settings.selectFolder();
  if (canceled) { return }
  connect.value.extends.path = filePaths[0];
};

function test() {
  connect.value.state.test = 'testing';
  connects.test(connect.value).then(() => {
    connect.value.state.test = 'ok';
  }).catch(reason => {
    console.log(reason);
    connect.value.state.test = 'error';
  });
};

function save() {
  switch (props.mode) {
    case 'add':
      connects.add(connect.value);
      break;
    case 'edit':
      connects.update(connect.value);
      break;
  }
};

async function collect() {
  connect.value.state.collect = 'collecting';
  connects.collectPDFLocalStorageConnect(connect.value).then((count: number) => {
    connect.value.bookCount = count;
    connect.value.state.collect = 'ok';
    save();
  }).catch(reason => {
    console.log(reason);
    connect.value.state.collect = 'error';
  })
};

async function del() {
  await connects.del(connect.value.id);
};
</script>
