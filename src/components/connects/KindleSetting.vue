<template>
  <div>
    <q-card-section class="q-pa-none">
      user name
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-input dense v-model="address" autofocus @keyup.enter="hide" />
    </q-card-section>
    <q-card-section class="q-pa-none q-pt-lg">
      password
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-input dense v-model="address" autofocus @keyup.enter="hide" />
    </q-card-section>
    <q-card-actions align="around" class="q-pa-none q-pt-lg">
      <q-btn label="Cancel" @click="hide" padding="xs lg" outline no-caps />
      <q-space />
      <q-btn label="Test" @click="hide" padding="xs lg" color="primary" unelevated no-caps />
      <q-btn label="OK" @click="hide" padding="xs lg" color="primary" unelevated no-caps />
    </q-card-actions>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --------------------------------
// use store
// --------------------------------
// import { useConnectsStore } from 'src/stores/Connects.js';
// const connects = useConnectsStore();

// --------------------------------
//  parent dialog visibility
// --------------------------------
const emit = defineEmits(['hideDialog']);
const hideDialog = () => emit('hideDialog');
function hide() {
  hideDialog();
}

// --------------------------------
//  
// --------------------------------
let address = ref('')

</script>
