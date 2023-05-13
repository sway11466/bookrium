<template>
  <q-card class="q-gutter-y-md" flat>
    <q-card-section class="q-pa-none">
      path
      <q-input dense v-model="pdfls.path" autofocus />
    </q-card-section>
    <q-card-actions vertical >
      <template v-if="mode === 'add'">
        <q-btn label="Connection Test" @click="test" icon="mdi-account-check-outline" padding="xs lg" color="primary" unelevated no-caps />
        <q-btn label="Save Connection" @click="save" icon="mdi-arrow-down-bold-box-outline" padding="xs lg" color="primary" unelevated no-caps />
        <div class="q-pt-lg"/>
        <q-btn icon="mdi-arrow-left" label="Select Type" @click="back" padding="xs lg" color="primary" outline no-caps />
      </template>
      <template v-if="mode === 'edit'">
        <q-btn label="Collect Books" @click="collect" icon="mdi-book-open-page-variant-outline" padding="xs lg" color="primary" unelevated no-caps />
        <q-btn icon="delete" label="Delete Connection Setting" @click="del" padding="xs lg" color="red" outline no-caps />
      </template>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useConnectsStore } from 'src/stores/Connects';
import { KindleConnect, PDFLocalStorageConnect } from 'src/stores/ConnectTypes';

// --------------------------------
//  store init
// --------------------------------
const connectsStore = useConnectsStore();

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
const pdfls: Ref<PDFLocalStorageConnect> = ref(props.mode === 'add' ? connectsStore.newPDFLocalStorageConnect() : connectsStore.get(props.id) as PDFLocalStorageConnect);

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
async function save() {
  // await connectsStore.saveKindleConnect(pdfls.value);
};

async function collect() {
  // connectsStore.collectKindleBooks(kindle.value).then((ret: boolean) => {
  //   // TODO: show ok message & badge
  //   console.log(ret);
  // }).catch(e => {
  //   // TODO: show ng message & badge
  //   console.log(e);
  // }).finally(() => {
  //   // TODO: close spinner
  //   emit('hideDialog');
  // });
};

async function back() {
  emit('back');
}

async function del() {
  // await connectsStore.deleteKindleSetting(kindle.value.id);
  emit('hideDialog');
};
</script>
