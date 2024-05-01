<template>
  <q-page class="col">
    <ConnectCollections />
  </q-page>
</template>

<script setup lang="ts">
import ConnectCollections from 'src/components/connects/ConnectCollections.vue';
import { useConnectsStore } from 'src/stores/Connects';
const connects = useConnectsStore();
connects.init();
</script>
