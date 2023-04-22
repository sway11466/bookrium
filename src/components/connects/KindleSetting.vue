<template>
  <div>
    <q-card-section class="q-pa-none">
      user name
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-input dense v-model="email" autofocus />
    </q-card-section>
    <q-card-section class="q-pa-none q-pt-lg">
      password
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-input dense v-model="password" />
    </q-card-section>
    <q-card-actions class="q-pa-none q-pt-lg" vertical >
      <q-btn icon="mdi-account-check-outline" label="Connection Test" @click="test" padding="xs lg" color="primary" unelevated no-caps />
      <div class="q-pa-sm" />
      <q-btn icon="mdi-arrow-down-bold-box-outline" label="Collect Books" @click="add" padding="xs lg" color="primary" unelevated no-caps />
      <div class="q-pa-lg" />
      <q-btn icon="delete" label="Delete Connection Setting" @click="hide" padding="xs lg" color="red" outline no-caps />
    </q-card-actions>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --------------------------------
//  use store
// --------------------------------
import { useConnectsStore } from 'src/stores/Connects.js';
const connects = useConnectsStore();

// --------------------------------
//  parent dialog visibility
// --------------------------------
const emit = defineEmits(['hideDialog']);
const hideDialog = () => emit('hideDialog');
function hide() {
  hideDialog();
}

// --------------------------------
//  kindle login setting
// --------------------------------
let email = ref('');
let password = ref('')

function test() {
  console.log('not implements.');
}

function add() {
  connects.addKindleSetting({email:email.value, password:password.value});
  hide();
}

</script>
