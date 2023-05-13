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
import { useConnectsStore } from 'src/stores/Connects';
import { ConnectType, KindleConnect } from 'src/stores/ConnectTypes';

// --------------------------------
//  store init
// --------------------------------
const connectsStore = useConnectsStore();
// const books = useBooksStore();  // Todo: for count badge

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
  'showDialog', // show dialog via parent component.
  'hideDialog', // hide dialog via parent component.
]);

// --------------------------------
//  local var
// --------------------------------
const kindle: Ref<KindleConnect> = ref(props.mode === 'add' ? connectsStore.newKindleConnect() : connectsStore.get(props.id) as KindleConnect);

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
  await connectsStore.saveKindleConnect(kindle.value);
};

async function test() {
  // TODO: show spinner
  connectsStore.testKindleSetting(kindle.value).then((ret) => {
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
  connectsStore.collectKindleBooks(kindle.value).then((ret: boolean) => {
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

async function del() {
  await connectsStore.deleteKindleSetting(kindle.value.id);
  emit('hideDialog');
};
</script>
