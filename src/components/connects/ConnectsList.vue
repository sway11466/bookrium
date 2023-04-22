<template>
  <q-list>
    <template v-for="connect in connects.all" :key="connect.id">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <template v-if="connect.type == 'kindle'">
            <q-img src="icons/icons8-amazon-kindle-48.svg" width="48px" />
          </template>
          <template v-else-if="connect.type == 'localstrage'">
            <q-icon name="mdi-sd" size="48px" color="primary" />
          </template>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <template v-if="connect.type == 'kindle'">
              Amazon Kindle
            </template>
            <template v-else-if="connect.type == 'localstrage'">
              Local Strage
            </template>
          </q-item-label>
          <q-item-label caption>{{ connect.description }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-badge label="100" />
        </q-item-section>
      </q-item>
      <q-separator />
    </template>
  </q-list>
</template>

<script setup lang="ts">
import { useConnectsStore } from 'src/stores/Connects';
const connects = useConnectsStore();
connects.fillSample();
</script>
