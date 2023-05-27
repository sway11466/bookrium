<template>
  <q-card class="q-gutter-y-md" flat>
    <q-card-section class="q-pa-none">
      user name
      <q-input dense v-model="connect.email" autofocus />
    </q-card-section>
    <q-card-section class="q-pa-none">
      password
      <q-input dense v-model="connect.password" />
    </q-card-section>

    <q-card-actions vertical>
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
import { KindleConnect } from 'src/stores/ConnectTypes';

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
  'back',       // back step via parent component.
  'hideDialog', // hide dialog via parent component.
]);

// --------------------------------
//  local var
// --------------------------------
const connect: Ref<KindleConnect> = ref((props.mode === 'add' ? connectsStore.new('kindle') : connectsStore.get(props.id)) as KindleConnect);

// --------------------------------
//  actions
// --------------------------------

function test() {
  // TODO: show spinner
  connectsStore.test(connect.value).then((ret) => {
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

function save() {
  switch (props.mode) {
    case 'add':
      connectsStore.add(connect.value);
      break;
    case 'edit':
      connectsStore.update(connect.value);
      break;
  }
};

function collect() {
  connectsStore.collectKindleBooks(connect.value).then((ret: boolean) => {
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

function back() {
  emit('back');
}

async function del() {
  await connectsStore.del(connect.value.id);
  emit('hideDialog');
};
</script>
