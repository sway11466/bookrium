<template>
  <q-toolbar>
    <div class="q-mr-md no-wrap">
      <q-btn @click="$router.go(-1)" icon="arrow_back" dense flat round />
    </div>

    <q-separator vertical inset color="white" />
    <q-toolbar-title class="q-ml-md no-wrap">
      {{ shelf.name }}
    </q-toolbar-title>

    <q-separator vertical inset color="white" />
    <div class="q-ml-md no-wrap">
      <q-input v-model="search" placeholder="Search" class="bg-white col" dense outlined square />
    </div>
    <div class="q-mr-md no-wrap">
      <q-btn class="q-ml-sm" icon="search" square dense />
    </div>

    <q-separator vertical inset color="white" />
    <div class="q-mx-md no-wrap">
      <q-btn label="sort" icon="sort" square dense no-caps />
    </div>

    <q-separator vertical inset color="white" />
    <div class="q-mx-md no-wrap">
      <q-btn label="filter" icon="filter_alt" square dense no-caps />
    </div>

    <q-separator vertical inset color="white" />
    <div class="q-ml-md no-wrap">
      <q-btn-group>
        <q-btn label="grid" icon="grid_view" square dense no-caps />
        <q-btn label="list" icon="list" square dense no-caps />
      </q-btn-group>
    </div>
  </q-toolbar>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useShelvesStore } from 'src/stores/Shelves';
const shelves = useShelvesStore();
const route = useRoute();
const shelf = ref(shelves.get(route.params.shelfid as string));
const search = ref('')
</script>
